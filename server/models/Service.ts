
import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    eligibility: [String],

    requiredDocuments: [String],

    steps: [String],

    fees: [
      {
        name: { type: String, required: true },
        amount: Number,
        currency: String,
        notes: String,
      },
    ],

    locations: [String],

    officialUrl: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    lastVerified: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", ServiceSchema);
