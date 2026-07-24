// tests/admin-crud/library-admin-crud.test.js

import { describe, it, expect } from "vitest";

const API = "http://127.0.0.1:9000/api";

let token;
let librarySlug;

async function login() {

	const response = await fetch(`${API}/user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: "library-admin@example.com",
			password: "12345678"
		})
	});

	expect(response.status).toBe(200);

	const data = await response.json();

	return data.token;

}

describe("Library Admin CRUD", () => {

	it("should login", async () => {

		token = await login();

		expect(token).toBeDefined();

	});

	it("should create library item", async () => {

		librarySlug = `test-${Date.now()}`;

		const response = await fetch(`${API}/admin/library`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				slug: librarySlug,
				title: "Test Library Item",
				description: "Created by test",
				type: "HTML",
				body: "<h1>Hello</h1>",
				thumbnail: null,
				courseId: "course-public"
			})
		});

		expect(response.status).toBe(201);

		const data = await response.json();

		expect(data.slug).toBe(librarySlug);

	});

	it("should list library items", async () => {

		const response = await fetch(`${API}/admin/library`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(Array.isArray(data)).toBe(true);

		expect(data.some(item => item.slug === librarySlug)).toBe(true);

	});

	it("should read library item", async () => {

		const response = await fetch(`${API}/admin/library/${librarySlug}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data.slug).toBe(librarySlug);

	});

	it("should update library item", async () => {

		const response = await fetch(`${API}/admin/library/${librarySlug}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: "Updated Library Title"
			})
		});

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data.title).toBe("Updated Library Title");
		expect(data.slug).toBe(librarySlug);

	});

	it("should delete library item", async () => {

		const response = await fetch(`${API}/admin/library/${librarySlug}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(response.status).toBe(200);

	});

	it("should confirm library item was deleted", async () => {

		const response = await fetch(`${API}/admin/library/${librarySlug}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(response.status).toBe(404);

	});

});