import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("Config", () => {

	it("should have a port", () => {

		expect(kernel.config.port).toBeDefined();

	});

	it("should have a jwt secret", () => {

		expect(kernel.config.jwtSecret).toBeDefined();

	});

	it("should have a database url", () => {

		expect(kernel.config.databaseUrl).toBeDefined();

	});

	it("should have a node environment", () => {

		expect(kernel.config.nodeEnv).toBeDefined();

	});

});