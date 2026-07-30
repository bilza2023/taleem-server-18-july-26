import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Communication", () => {

	it("should list all communications", async () => {

		const communications =
			await kernel.communication.list();

		expect(Array.isArray(communications)).toBe(true);
		expect(communications.length).toBe(3);

	});

	it("should filter communications by user", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		const communications =
			await kernel.communication.list({
				userId: user.id
			});

		expect(communications.length).toBe(3);

	});

	it("should filter communications by library", async () => {

		const libraryId =
			await kernel.library.slugToId(
				"members-page"
			);

		const communications =
			await kernel.communication.list({
				libraryId
			});

		expect(communications.length).toBe(2);

	});

	it("should get a communication", async () => {

		const communication =
			(await kernel.communication.list())[0];

		const found =
			await kernel.communication.get(
				communication.id
			);

		expect(found).toBeDefined();
		expect(found.id).toBe(communication.id);

	});

	it("should return null for an unknown communication", async () => {

		const communication =
			await kernel.communication.get(
				999999
			);

		expect(communication).toBeNull();

	});

	it("should create a communication", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		const libraryId =
			await kernel.library.slugToId(
				"open-page"
			);

		const communication =
			await kernel.communication.create({

				userId: user.id,
				libraryId,

				type: "comment",

				message: "New communication.",

				authorResponse: null,

				isPublic: false,

				meta: null

			});

		expect(communication.id).toBeDefined();
		expect(communication.message).toBe(
			"New communication."
		);

	});

	it("should update a communication", async () => {

		const communication =
			(await kernel.communication.list())[0];

		const updated =
			await kernel.communication.update(

				communication.id,

				{
					authorResponse: "Updated response."
				}

			);

		expect(updated.authorResponse).toBe(
			"Updated response."
		);

	});

	it("should delete a communication", async () => {

		const user = await kernel.user.getByEmail(
			"test@example.com"
		);

		const libraryId =
			await kernel.library.slugToId(
				"open-page"
			);

		const communication =
			await kernel.communication.create({

				userId: user.id,
				libraryId,

				type: "comment",

				message: "Delete me.",

				authorResponse: null,

				isPublic: false,

				meta: null

			});

		await kernel.communication.delete(
			communication.id
		);

		const deleted =
			await kernel.communication.get(
				communication.id
			);

		expect(deleted).toBeNull();

	});

	it("should list unanswered communications for an admin", async () => {

		const admin =
			(await kernel.admin.list())
				.find(a => a.email === "members@taleem.help");

		const communications =
			await kernel.communication.listUnanswered(
				admin
			);

		expect(communications.length).toBe(1);
		expect(communications[0].authorResponse).toBeNull();

	});

});