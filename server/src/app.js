import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { startImportCron } from "./cron/import.cron.js";
import importRoutes from "./routes/import.route.js";
import historyRoutes from "./routes/history.route.js";
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Connect MongoDB
connectDB();
startImportCron();
// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy 🚀" });
});


app.use("/api/import-history", historyRoutes);


app.use("/api/import", importRoutes);

export default app;
