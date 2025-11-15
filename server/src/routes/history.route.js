import express from "express";
import { getImportHistory } from "../controllers/history.controller.js";

const router = express.Router();

router.get("/", getImportHistory);

export default router;
