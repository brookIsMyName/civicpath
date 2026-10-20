
import "dotenv/config";
import mongoose from "mongoose";
import Service from "./models/Service";

async function auditUrls() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(uri);

  const services = await Service.find()
    .select("name officialUrl")
    .lean();

  // Group service records by their official URL.
  const groupedUrls = new Map<string, string[]>();

  for (const service of services) {
    const url = service.officialUrl?.trim();

    if (!url) {
      console.log(`MISSING URL: ${service.name}`);
      continue;
    }

    const names = groupedUrls.get(url) ?? [];
    names.push(service.name);
    groupedUrls.set(url, names);
  }

  console.log(`\nDatabase records: ${services.length}`);
  console.log(`Unique URLs: ${groupedUrls.size}\n`);

  for (const [url, names] of groupedUrls) {
    console.log(`\nChecking: ${url}`);
    console.log(`Used by ${names.length} record(s):`);

    for (const name of names) {
      console.log(`  - ${name}`);
    }

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      12000
    );

    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": "CivicPath-Link-Audit/1.0",
        },
      });

      console.log(`  HTTP status: ${response.status}`);
      console.log(`  Final URL: ${response.url}`);

      if (response.redirected) {
        console.log("  NOTE: URL redirected.");
      }

      if (!response.ok) {
        console.log("  CHECK: Response was not successful.");
      }

      await response.body?.cancel();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error);

      console.log(`  CHECK: Request failed — ${message}`);
    } finally {
      clearTimeout(timeout);
    }
  }

  await mongoose.disconnect();
}

auditUrls().catch(async (error) => {
  console.error("URL audit failed:", error);

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  process.exitCode = 1;
});
