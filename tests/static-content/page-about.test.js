import { describe, it, expect } from "vitest";

const BASE_URL = "http://127.0.0.1:9000";

describe("Static Content - GET /api/page/about", () => {

	it("returns the about page", async () => {

		const response = await fetch(
			`${BASE_URL}/api/page/about`
		);

		expect(response.status).toBe(200);
		expect(response.headers.get("content-type"))
			.toContain("text/html");

		const html = await response.text();

		expect(html.length).toBeGreaterThan(0);

	});

});