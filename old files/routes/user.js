import express from "express";

import {
	register,
	login,
	verify
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/verify", verify);

export default router;