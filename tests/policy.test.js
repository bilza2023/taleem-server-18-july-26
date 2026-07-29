// tests/kernel/policy.test.js

import { describe, it, expect, beforeAll } from "vitest";
import kernel from "../src/serverKernel/ServerKernel.js";
import Permission from "../src/serverKernel/enums/Permission.js";

let openAdmin;
let membersAdmin;
let subscriptionAdmin;

let openCourseId;
let membersCourseId;
let subscriptionCourseId;

beforeAll(async () => {

	openAdmin = await kernel.db.admin.findUnique({
		where: { email: "open@taleem.help" }
	});

	membersAdmin = await kernel.db.admin.findUnique({
		where: { email: "members@taleem.help" }
	});

	subscriptionAdmin = await kernel.db.admin.findUnique({
		where: { email: "subscription@taleem.help" }
	});

	openCourseId =
		await kernel.course.slugToId("course-open");

	membersCourseId =
		await kernel.course.slugToId("course-members");

	subscriptionCourseId =
		await kernel.course.slugToId("course-subscription");

});

describe("Policy", () => {

	it("open admin permissions", async () => {

		await expect(
			kernel.policy.require(
				openAdmin,
				openCourseId,
				Permission.LIBRARY
			)
		).resolves.toBeDefined();

		await expect(
			kernel.policy.require(
				openAdmin,
				openCourseId,
				Permission.COMMUNICATION
			)
		).resolves.toBeDefined();

		await expect(
			kernel.policy.require(
				openAdmin,
				openCourseId,
				Permission.SUBSCRIPTION
			)
		).rejects.toThrow();

	});

	it("members admin permissions", async () => {

		await expect(
			kernel.policy.require(
				membersAdmin,
				membersCourseId,
				Permission.LIBRARY
			)
		).resolves.toBeDefined();

		await expect(
			kernel.policy.require(
				membersAdmin,
				membersCourseId,
				Permission.COMMUNICATION
			)
		).resolves.toBeDefined();

		await expect(
			kernel.policy.require(
				membersAdmin,
				membersCourseId,
				Permission.SUBSCRIPTION
			)
		).rejects.toThrow();

	});

	it("subscription admin permissions", async () => {

		await expect(
			kernel.policy.require(
				subscriptionAdmin,
				subscriptionCourseId,
				Permission.LIBRARY
			)
		).resolves.toBeDefined();

		await expect(
			kernel.policy.require(
				subscriptionAdmin,
				subscriptionCourseId,
				Permission.COMMUNICATION
			)
		).resolves.toBeDefined();

		await expect(
			kernel.policy.require(
				subscriptionAdmin,
				subscriptionCourseId,
				Permission.SUBSCRIPTION
			)
		).resolves.toBeDefined();

	});

	it("cannot access another course", async () => {

		await expect(
			kernel.policy.require(
				openAdmin,
				membersCourseId,
				Permission.LIBRARY
			)
		).rejects.toThrow();

		await expect(
			kernel.policy.require(
				membersAdmin,
				subscriptionCourseId,
				Permission.LIBRARY
			)
		).rejects.toThrow();

		await expect(
			kernel.policy.require(
				subscriptionAdmin,
				openCourseId,
				Permission.LIBRARY
			)
		).rejects.toThrow();

	});

});