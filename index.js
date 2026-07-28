import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import publicRouter from "./routes/public.js";
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
const SERVER_PAGES_DIR = path.join(__dirname, "server-pages");

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --------------------------------------------------
// Content
// --------------------------------------------------

app.use("/api/content", express.static(CONTENT_DIR));

// --------------------------------------------------
// Public Content
// --------------------------------------------------

app.get("/api/data/:name", (req, res) => {

	res.sendFile(
		path.join(
			CONTENT_DIR,
			"data",
			`${req.params.name}.json`
		)
	);

});

app.get("/api/js/:name", (req, res) => {

    res.sendFile(
        path.join(
            CONTENT_DIR,
            "js",
            `${req.params.name}.js`
        )
    );

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

// --------------------------------------------------
// Routes
// --------------------------------------------------
app.use("/api/public", publicRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/library", libraryRouter);
app.use("/api/communication", communicationRouter);

// --------------------------------------------------
// Start Server
// --------------------------------------------------

app.listen(PORT, "127.0.0.1", () => {

	console.log(`🚀 Taleem API running on http://127.0.0.1:${PORT}`);
	console.log(`📁 Content:   ${CONTENT_DIR}`);

});