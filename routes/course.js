import express from "express";
import {
	index,
	getCourse
} from "../controllers/course.js";

const router = express.Router();

router.get("/", index);

router.get("/:slug", getCourse);

export default router;