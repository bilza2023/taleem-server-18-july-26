import { describe, it, expect } from "vitest";

describe("Home Links Route", () => {

	it("should serve home-links", async () => {

		const res = await fetch(
			"http://localhost:3000/home-links"
		);

		expect(res.status).toBe(200);

		expect(
			res.headers.get("content-type")
		).toContain("application/json");

		const data = await res.json();

		expect(data).toBeDefined();

	});

});