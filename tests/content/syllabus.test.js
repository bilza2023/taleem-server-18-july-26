import { describe, it, expect } from "vitest";

describe("Syllabus Route", () => {

	it("should serve fbise8math syllabus", async () => {

		const res = await fetch(
			"http://localhost:3000/syllabus/fbise8math"
		);

		expect(res.status).toBe(200);

		expect(
			res.headers.get("content-type")
		).toContain("application/json");

		const syllabus = await res.json();

		expect(syllabus).toBeDefined();

	});

});