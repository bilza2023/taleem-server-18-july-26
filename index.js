
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------------------------------------
// Paths
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, "content");

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// Static Content
// --------------------------------------------------

app.use("/content", express.static(CONTENT_DIR));

// --------------------------------------------------
// Routes
// --------------------------------------------------
app.use("/user", userRouter);

// --------------------------------------------------
// API
// --------------------------------------------------
app.get("/", (req, res) => {
	res.json({
		name: "Taleem API",
		version: "1.0.0",
		status: "running",
		message: "Welcome to Taleem Server 🚀"
	});
});

app.get("/api/health", (req, res) => {
	res.json({
		status: "ok",
		time: new Date().toISOString()
	});
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------

app.listen(PORT, () => {
	console.log(`🚀 Taleem API running on http://localhost:${PORT}`);
	console.log(`📁 Serving content from: ${CONTENT_DIR}`);
});