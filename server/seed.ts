
import mongoose from "mongoose";
import { connectDatabase } from "./config/database";
import Service from "./models/Service";

async function seedDatabase() {
  try {
    await connectDatabase();

    await Service.findOneAndUpdate(
      { name: "Ethiopian Passport — New Application" },
      {
        name: "Ethiopian Passport — New Application",
        category: "Identity and Travel",

        description:
          "Guidance for people applying for a new Ethiopian passport. " +
          "Requirements and procedures can change, so confirm the latest " +
          "instructions on the official Immigration and Citizenship Service portal.",

        eligibility: [
          "Confirm your eligibility and applicable requirements with the official service."
        ],

        requiredDocuments: [
          "Renewed kebele identification card",
          "Birth card",
          "National ID or Fayda"
        ],

        steps: [
          "Read the official Immigration and Citizenship Service guidance.",
          "Visit https://www.immigration.gov.et and follow the current application instructions.",
          "Confirm the required documents and payment deadline for your application.",
          "Follow the appointment and collection instructions provided by the official service."
        ],

        fees: [],

        locations: [],

        officialUrl:
          "https://ics.gov.et/information/documents-that-must-be-fulfilled-to-issue-a-new-passport/",

        source:
          "Ethiopian Immigration and Citizenship Service — " +
          "Documents required for a new passport, published November 27, 2025.",

        lastVerified: new Date("2026-10-20")
      },
      { upsert: true, returnDocument: "after", runValidators: true }
    );

    console.log("Passport service seeded successfully!");
  } catch (error) {
    console.error("Failed to seed CivicPath:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
