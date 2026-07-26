import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Subscription", () => {

	it("should list subscriptions", async () => {

		const subscriptions = await kernel.subscription.list();

		expect(Array.isArray(subscriptions)).toBe(true);
		expect(subscriptions.length).toBeGreaterThan(0);

	});

	it("should get subscription by id", async () => {

		const subscription = (await kernel.subscription.list())[0];

		const found = await kernel.subscription.get(
			subscription.id
		);

		expect(found).toBeDefined();
		expect(found.id).toBe(subscription.id);

	});

	it("should list subscriptions by user", async () => {

		const user = await kernel.user.findByEmail(
			"test@example.com"
		);

		const subscriptions =
			await kernel.subscription.listByUser(
				user.id
			);

		expect(Array.isArray(subscriptions)).toBe(true);
		expect(subscriptions.length).toBeGreaterThan(0);

	});

	it("should list subscriptions by course", async () => {

		const course = await kernel.course.getBySlug(
			"course-members"
		);

		const subscriptions =
			await kernel.subscription.listByCourse(
				course.id
			);

		expect(Array.isArray(subscriptions)).toBe(true);
		expect(subscriptions.length).toBeGreaterThan(0);

	});

	it("should return null for unknown id", async () => {

		const subscription = await kernel.subscription.get(
			999999
		);

		expect(subscription).toBeNull();

	});

});