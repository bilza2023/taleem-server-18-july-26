// /scripts/bulk-seed/createAdmin.js

import bcrypt from "bcrypt";

/**
 * Creates an admin.
 *
 * @param {PrismaClient} prisma
 * @param {Object} options
 * @param {string} options.name
 * @param {string} options.email
 * @param {string} options.resource
 * @param {string} [options.password="12345678"]
 *
 * @returns {Promise<Object>}
 */
export default async function createAdmin(
	prisma,
	{
		name,
		email,
		resource,
		password = "12345678"
	}
) {
	const hashedPassword = await bcrypt.hash(password, 10);

	return prisma.admin.create({
		data: {
			name,
			email,
			password: hashedPassword,
			resource
		}
	});
}