import express from "express";
import authenticate from "../middleware/authenticate.js";
import { getLibraryItem } from "../controllers/library.js";

const router = express.Router();

// GET /api/library/:slug
router.get("/:slug", authenticate, getLibraryItem);

export default router;