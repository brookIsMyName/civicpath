
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database";
import Service from "./models/Service";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Get all civic services
app.get("/api/services", async (_req, res) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});


app.get("/api/services/search", async (req, res) => {
  try {
    const query = String(req.query.q ?? "").trim();

    if (!query) {
      res.status(400).json({
        error: "Please provide a search query using ?q="
      });
      return;
    }

    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const services = await Service.find({
      $or: [
        { name: { $regex: safeQuery, $options: "i" } },
        { description: { $regex: safeQuery, $options: "i" } },
        { category: { $regex: safeQuery, $options: "i" } }
      ]
    }).limit(20);

    res.json(services);
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

// Get one service by its MongoDB ID
app.get("/api/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    res.json(service);
  } catch (error) {
    console.error("Failed to fetch service:", error);
    res.status(400).json({ error: "Invalid service ID" });
  }
});

// Create a civic service
app.post("/api/services", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    console.error("Failed to create service:", error);
    res.status(400).json({ error: "Failed to create service" });
  }
});

async function startServer() {
  try {
    await connectDatabase();

    app.listen(3000, () => {
      console.log("CivicPath server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Could not start CivicPath:", error);
    process.exit(1);
  }
}

startServer();
