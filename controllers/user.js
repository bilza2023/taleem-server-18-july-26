import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function register(req, res) {

	try {

		const { email, password } = req.body;

		if (!email || !password) {

			return res.status(400).json({
				message: "Email and password are required."
			});
		}

		const existingUser = await prisma.user.findUnique({

			where: {
				email
			}

		});

		if (existingUser) {

			return res.status(409).json({
				message: "Email already exists."
			});
		}

		const hashedPassword =
			await bcrypt.hash(password, 10);

		const user =
			await prisma.user.create({

				data: {

					email,
					password: hashedPassword

				}

			});

		const token =
			jwt.sign(

				{
					id: user.id,
					email: user.email
				},

				process.env.JWT_SECRET,

				{
					expiresIn: "30d"
				}

			);

		return res.status(201).json({

			message: "User registered.",
			token

		});

	}

	catch (err) {

		console.error(err);

		return res.status(500).json({

			message: "Internal server error."

		});

	}

}

export async function login(req, res) {

	res.json({
		message: "login"
	});

}

export async function verify(req, res) {

	res.json({
		message: "verify"
	});

}