import { describe, it, expect } from "vitest";

describe("Deck Route", () => {

	it("should serve test.json", async () => {

		const res = await fetch(
			"http://localhost:3000/content/decks/test.json"
		);

		expect(res.status).toBe(200);

		expect(
			res.headers.get("content-type")
		).toContain("application/json");

		const deck = await res.json();

		expect(deck).toBeDefined();

	});

});