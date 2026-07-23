import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.js";
import libraryRouter from "./routes/library.js";
import communicationRouter from "./routes/communication.js";
import courseRouter from "./routes/course.js";
//////////--admin Routes---
import libraryAdminRouter from "./routes/admin/library.js";
import courseAdminRouter from "./routes/admin/course.js";
import subscriptionAdminRouter from "./routes/admin/subscription.js";
import communicationAdminRouter from "./routes/admin/communication.js";
import adminRouter from "./routes/admin/admin.js";



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
// --------------------------------------------------
// Utility Pages
// --------------------------------------------------
const SERVER_PAGES_DIR = path.join(__dirname, "server-pages");

app.get("/login", (req, res) => {
  res.sendFile(path.join(SERVER_PAGES_DIR, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(SERVER_PAGES_DIR, "register.html"));
});
// --------------------------------------------------
// Routes
// --------------------------------------------------
app.use("/api/user", userRouter);

app.use("/api/library", libraryRouter);

app.use("/api/course", courseRouter);

app.use("/api/communication", communicationRouter);


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
// ADMIN API
// --------------------------------------------------
app.use("/api/admin/library", libraryAdminRouter);

app.use("/api/admin/course", courseAdminRouter);

app.use("/api/admin/subscription", subscriptionAdminRouter);

app.use("/api/admin/communication", communicationAdminRouter);

app.use("/api/admin/admins", adminRouter);
// --------------------------------------------------

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