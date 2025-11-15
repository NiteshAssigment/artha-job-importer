import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, unique: true },
    title: String,
    description: String,
    company: String,
    location: String,
    category: String,
    link: String,
    pubDate: Date,
    sourceUrl: String,
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
