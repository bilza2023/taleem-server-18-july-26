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
app.get("/article/:slug", (req, res) => {

	const file = path.join(
		CONTENT_DIR,
		"articles",
		`${req.params.slug}.html`
	);

	res.sendFile(file);

});
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


app.get("/home-links", (req, res) => {

	res.sendFile(
		path.join(
			CONTENT_DIR,
			"data",
			"home-links.json"
		)
	);

});
// --------------------------------------------------
app.get("/syllabus/:course", (req, res) => {

	res.sendFile(
		path.join(
			CONTENT_DIR,
			"syllabus",
			`${req.params.course}.json`
		)
	);

});
// --------------------------------------------------
// Start Server
// --------------------------------------------------
app.listen(PORT, () => {
	console.log(`🚀 Taleem API running on http://localhost:${PORT}`);
	console.log(`📁 Serving content from: ${CONTENT_DIR}`);
});