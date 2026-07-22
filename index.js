import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.js";
import libraryRouter from "./routes/library.js";
import communicationRouter from "./routes/communication.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

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

app.use("/api/content", express.static(CONTENT_DIR));

// --------------------------------------------------
// Routes
// --------------------------------------------------
app.use("/api/user", userRouter);

app.use("/api/library", libraryRouter);

app.use("/api/communication", communicationRouter);

//depricated
app.get("/api/article/:slug", (req, res) => {

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
app.get("/api", (req, res) => {
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

//depricated
app.get("/api/home-links", (req, res) => {

	res.sendFile(
		path.join(
			CONTENT_DIR,
			"data",
			"home-links.json"
		)
	);

});
// --------------------------------------------------
//--new API
// --------------------------------------------------
// Public HTML Pages
// --------------------------------------------------

app.get("/api/page/:slug", (req, res) => {

	const file = path.join(
		CONTENT_DIR,
		"pages",
		`${req.params.slug}.html`
	);

	res.sendFile(file);

});

// --------------------------------------------------
// Public JSON Data
// --------------------------------------------------

app.get("/api/data/:name", (req, res) => {

	const file = path.join(
		CONTENT_DIR,
		"data",
		`${req.params.name}.json`
	);

	res.sendFile(file);

});
// --------------------------------------------------
// Start Server
// --------------------------------------------------
app.listen(PORT, "127.0.0.1", () => {
	console.log(`🚀 Taleem API running on http://127.0.0.1:${PORT}`);
	console.log(`📁 Serving content from: ${CONTENT_DIR}`);
});