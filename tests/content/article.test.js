import { describe, it, expect } from "vitest";

describe("Article Route", () => {

	it("should serve the test article", async () => {

		const res = await fetch(
			"http://localhost:3000/article/test"
		);

		expect(res.status).toBe(200);

		expect(
			res.headers.get("content-type")
		).toContain("text/html");

		const html = await res.text();

		expect(html).toContain(
			"Taleem Article Server"
		);

		expect(html).toContain(
			"Congratulations!"
		);

	});

});