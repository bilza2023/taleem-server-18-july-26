// /scripts/bulk-seed/createSubscription.js

/**
 * Creates a subscription for a user.
 *
 * @param {PrismaClient} prisma
 * @param {Object} options
 * @param {number} options.userId
 * @param {number} options.courseId
 * @param {Date} [options.startsAt]
 * @param {Date} [options.endsAt]
 * @returns {Promise<Object>}
 */
export default async function createSubscription(
	prisma,
	{
		userId,
		courseId,
		startsAt = new Date(),
		endsAt
	}
) {
	const subscriptionEndsAt =
		endsAt ??
		new Date(
			new Date(startsAt).setFullYear(
				new Date(startsAt).getFullYear() + 1
			)
		);

	return prisma.subscription.create({
		data: {
			userId,
			courseId,
			startsAt,
			endsAt: subscriptionEndsAt
		}
	});
}