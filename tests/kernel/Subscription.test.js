import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Subscription", () => {

	it("should list all subscriptions", async () => {

		const subscriptions =
			await kernel.subscription.list();

		expect(Array.isArray(subscriptions)).toBe(true);
		expect(subscriptions.length).toBe(1);

	});

	it("should filter subscriptions by user", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		const subscriptions =
			await kernel.subscription.list({
				userId: user.id
			});

		expect(subscriptions.length).toBe(1);

	});

	it("should filter subscriptions by course", async () => {

		const courseId =
			await kernel.course.slugToId(
				"course-subscription"
			);

		const subscriptions =
			await kernel.subscription.list({
				courseId
			});

		expect(subscriptions.length).toBe(1);

	});

	it("should get a subscription", async () => {

		const subscription =
			(await kernel.subscription.list())[0];

		const found =
			await kernel.subscription.get(
				subscription.id
			);

		expect(found).toBeDefined();
		expect(found.id).toBe(subscription.id);

	});

	it("should return null for an unknown subscription", async () => {

		const subscription =
			await kernel.subscription.get(
				999999
			);

		expect(subscription).toBeNull();

	});

	it("should authorize an active subscription", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		const courseId =
			await kernel.course.slugToId(
				"course-subscription"
			);

		const subscription =
			await kernel.subscription.authorize(
				user.id,
				courseId
			);

		expect(subscription).toBeDefined();
		expect(subscription.userId).toBe(user.id);

	});

	it("should reject unauthorized access", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		const courseId =
			await kernel.course.slugToId(
				"course-members"
			);

		await expect(

			kernel.subscription.authorize(
				user.id,
				courseId
			)

		).rejects.toThrow(
			`User "${user.id}" does not have an active subscription for course "${courseId}".`
		);

	});

	it("should create a subscription", async () => {

		const user = await kernel.user.register({

			name: "Second User",
			email: "second@example.com",
			password: "12345678"

		});

		const courseId =
			await kernel.course.slugToId(
				"course-subscription"
			);

		const startsAt = new Date();

		const endsAt = new Date();
		endsAt.setFullYear(
			endsAt.getFullYear() + 1
		);

		const subscription =
			await kernel.subscription.create({

				userId: user.id,
				courseId,
				startsAt,
				endsAt

			});

		expect(subscription.id).toBeDefined();

	});

	it("should update a subscription", async () => {

		const user = await kernel.user.register({

			name: "Update User",
			email: "update@example.com",
			password: "12345678"

		});

		const courseId =
			await kernel.course.slugToId(
				"course-subscription"
			);

		const startsAt = new Date();

		const endsAt = new Date();
		endsAt.setFullYear(
			endsAt.getFullYear() + 1
		);

		const subscription =
			await kernel.subscription.create({

				userId: user.id,
				courseId,
				startsAt,
				endsAt

			});

		const newEnd = new Date();
		newEnd.setFullYear(
			newEnd.getFullYear() + 2
		);

		const updated =
			await kernel.subscription.update(

				subscription.id,

				{
					endsAt: newEnd
				}

			);

		expect(updated.endsAt.getFullYear()).toBe(
			newEnd.getFullYear()
		);

	});

	it("should delete a subscription", async () => {

		const user = await kernel.user.register({

			name: "Delete User",
			email: "delete-sub@example.com",
			password: "12345678"

		});

		const courseId =
			await kernel.course.slugToId(
				"course-subscription"
			);

		const startsAt = new Date();

		const endsAt = new Date();
		endsAt.setFullYear(
			endsAt.getFullYear() + 1
		);

		const subscription =
			await kernel.subscription.create({

				userId: user.id,
				courseId,
				startsAt,
				endsAt

			});

		await kernel.subscription.delete(
			subscription.id
		);

		const deleted =
			await kernel.subscription.get(
				subscription.id
			);

		expect(deleted).toBeNull();

	});

});