import { describe, it, expect } from "vitest";

import kernel from "../../src/serverKernel/ServerKernel.js";

describe("ServerKernel", () => {

	it("should create the kernel", () => {

		expect(kernel).toBeDefined();

	});

	it("should create config", () => {

		expect(kernel.config).toBeDefined();

	});

	it("should create database", () => {

		expect(kernel.db).toBeDefined();

	});

	it("should create jwt", () => {

		expect(kernel.jwt).toBeDefined();

	});

	it("should create auth", () => {

		expect(kernel.auth).toBeDefined();

	});

	it("should create logger", () => {

		expect(kernel.logger).toBeDefined();

	});

	it("should create user module", () => {

		expect(kernel.user).toBeDefined();

	});

	it("should create admin module", () => {

		expect(kernel.admin).toBeDefined();

	});

	it("should create library module", () => {

		expect(kernel.library).toBeDefined();

	});

	it("should create course module", () => {

		expect(kernel.course).toBeDefined();

	});

	it("should create communication module", () => {

		expect(kernel.communication).toBeDefined();

	});

	it("should create subscription module", () => {

		expect(kernel.subscription).toBeDefined();

	});

});