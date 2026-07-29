// /scripts/bulk-seed/createUser.js

import bcrypt from "bcrypt";

/**
 * Creates a user.
 *
 * @param {PrismaClient} prisma
 * @param {Object} options
 * @param {string} options.name
 * @param {string} options.email
 * @param {string} [options.password="12345678"]
 * @returns {Promise<Object>}
 */
export default async function createUser(
	prisma,
	{
		name,
		email,
		password = "12345678"
	}
) {
	const hashedPassword = await bcrypt.hash(password, 10);

	return prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		}
	});
}