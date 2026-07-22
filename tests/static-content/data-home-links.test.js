import { describe, it, expect } from "vitest";

const BASE_URL = "http://127.0.0.1:9000";

describe("Static Content - GET /api/data/home-links", () => {

	it("returns the home-links JSON", async () => {

		const response = await fetch(
			`${BASE_URL}/api/data/home-links`
		);

		expect(response.status).toBe(200);
		expect(response.headers.get("content-type"))
			.toContain("application/json");

		const data = await response.json();

		expect(data).toBeDefined();
		expect(typeof data).toBe("object");

	});

});