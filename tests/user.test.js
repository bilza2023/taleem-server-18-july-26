import { describe, it, expect } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User Authentication", () => {

	it("should register, login, verify and cleanup", async () => {

		const email =
			`test-${Date.now()}@example.com`;

		const password = "12345678";

		try {

			// ---------------------------------
			// Register
			// ---------------------------------

			const registerRes = await fetch(

				"http://localhost:3000/user/register",

				{

					method: "POST",

					headers: {

						"Content-Type": "application/json"

					},

					body: JSON.stringify({

						email,
						password

					})

				}

			);

			expect(registerRes.status).toBe(201);

			// ---------------------------------
			// Login
			// ---------------------------------

			const loginRes = await fetch(

				"http://localhost:3000/user/login",

				{

					method: "POST",

					headers: {

						"Content-Type": "application/json"

					},

					body: JSON.stringify({

						email,
						password

					})

				}

			);

			expect(loginRes.status).toBe(200);

			const loginData =
				await loginRes.json();

			expect(loginData.token).toBeDefined();

			// ---------------------------------
			// Verify
			// ---------------------------------

			const verifyRes = await fetch(

				"http://localhost:3000/user/verify",

				{

					headers: {

						Authorization:
							`Bearer ${loginData.token}`

					}

				}

			);

			expect(verifyRes.status).toBe(200);

			const verifyData =
				await verifyRes.json();

			expect(
				verifyData.user.email
			).toBe(email);

		}

		finally {

			await prisma.user.deleteMany({

				where: {

					email

				}

			});

		}

	});

});