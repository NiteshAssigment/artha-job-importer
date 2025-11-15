import express from "express";
import { importJobsManually } from "../controllers/import.controller.js";

const router = express.Router();

router.get("/run", importJobsManually);

export default router;
