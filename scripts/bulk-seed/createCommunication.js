// /scripts/bulk-seed/createCommunication.js

/**
 * Creates a communication.
 *
 * @param {PrismaClient} prisma
 * @param {Object} options
 * @param {number} options.userId
 * @param {string} options.referenceId
 * @param {string} [options.type="comment"]
 * @param {string|null} [options.meta=null]
 * @param {string} options.message
 * @param {string|null} [options.authorResponse=null]
 * @param {boolean} [options.isPublic=false]
 * @param {Date|null} [options.readAt=null]
 *
 * @returns {Promise<Object>}
 */
export default async function createCommunication(
	prisma,
	{
		userId,
		referenceId,
		type = "comment",
		meta = null,
		message,
		authorResponse = null,
		isPublic = false,
		readAt = null
	}
) {
	return prisma.communication.create({
		data: {
			userId,
			referenceId,
			type,
			meta,
			message,
			authorResponse,
			isPublic,
			readAt
		}
	});
}