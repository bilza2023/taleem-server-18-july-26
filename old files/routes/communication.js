import express from "express";

import authenticate from "../middleware/authenticate.js";

import {
	createCommunication,
	getMyCommunications,
	getCommunication
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
	"/me",
	authenticate,
	getMyCommunications
);

// Get a single communication
router.get(
	"/:id",
	authenticate,
	getCommunication
);

export default router;