import express from "express";

import authenticate from "../middleware/authenticate.js";

import {
	createCommunication,
	getMyCommunications,
	getLibraryCommunications
} from "../controllers/communication.js";

const router = express.Router();

// Create a new communication
router.post(
	"/",
	authenticate,
	createCommunication
);

// Get all communications for the logged-in user
router.get(
	"/my",
	authenticate,
	getMyCommunications
);

// Get all public communications for a library item
router.get(
	"/library/:librarySlug",
	authenticate,
	getLibraryCommunications
);

export default router;