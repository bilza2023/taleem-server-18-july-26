import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Communication", () => {

	it("should list communications", async () => {

		const communications =
			await kernel.communication.list();

		expect(Array.isArray(communications)).toBe(true);
		expect(communications.length).toBeGreaterThan(0);

	});

	it("should get communication by id", async () => {

		const communication =
			(await kernel.communication.list())[0];

		const found =
			await kernel.communication.get(
				communication.id
			);

		expect(found).toBeDefined();
		expect(found.id).toBe(communication.id);

	});

	it("should list communications by reference", async () => {

		const communications =
			await kernel.communication.listByReference(
				"members-page"
			);

		expect(Array.isArray(communications)).toBe(true);
		expect(communications.length).toBe(2);

	});

	it("should return an empty array for unknown reference", async () => {

		const communications =
			await kernel.communication.listByReference(
				"does-not-exist"
			);

		expect(Array.isArray(communications)).toBe(true);
		expect(communications.length).toBe(0);

	});

	it("should return null for unknown id", async () => {

		const communication =
			await kernel.communication.get(
				999999
			);

		expect(communication).toBeNull();

	});

});