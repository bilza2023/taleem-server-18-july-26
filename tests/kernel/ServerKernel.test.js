import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("ServerKernel", () => {

	it("should create the kernel", () => {
		expect(kernel).toBeDefined();
	});

	// --------------------------------------------------
	// Public Services
	// --------------------------------------------------

	it("should expose the authentication service", () => {
		expect(kernel.auth).toBeDefined();
	});

	it("should expose the authorization policy", () => {
		expect(kernel.policy).toBeDefined();
	});

	// --------------------------------------------------
	// Resources
	// --------------------------------------------------

	it("should expose the user resource", () => {
		expect(kernel.user).toBeDefined();
	});

	it("should expose the admin resource", () => {
		expect(kernel.admin).toBeDefined();
	});

	it("should expose the course resource", () => {
		expect(kernel.course).toBeDefined();
	});

	it("should expose the library resource", () => {
		expect(kernel.library).toBeDefined();
	});

	it("should expose the communication resource", () => {
		expect(kernel.communication).toBeDefined();
	});

	it("should expose the subscription resource", () => {
		expect(kernel.subscription).toBeDefined();
	});

});