import { describe, it, expect } from "vitest";

describe("Image Route", () => {

	it("should serve image.png", async () => {

		const res = await fetch(
			"http://localhost:3000/content/images/image.png"
		);

		expect(res.status).toBe(200);

		expect(
			res.headers.get("content-type")
		).toContain("image/png");

		expect(
			Number(res.headers.get("content-length"))
		).toBeGreaterThan(0);

	});

});