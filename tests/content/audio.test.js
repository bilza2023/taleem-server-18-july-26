import { describe, it, expect } from "vitest";

describe("Audio Route", () => {

	it("should serve music.mp3", async () => {

		const res = await fetch(
			"http://localhost:3000/content/audio/music.mp3"
		);

		expect(res.status).toBe(200);

		expect(
			res.headers.get("content-type")
		).toContain("audio");

		expect(
			Number(res.headers.get("content-length"))
		).toBeGreaterThan(0);

	});

});