// tests/admin-crud/library-admin-crud.test.js

import { describe, it, expect } from "vitest";

const API = "http://127.0.0.1:9000/api";

let token;
let libraryId;

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

		const response = await fetch(`${API}/admin/library`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				slug: `test-${Date.now()}`,
				title: "Test Library Item",
				description: "Created by CRUD test",
				type: "HTML",
				body: "<h1>Hello</h1>",
				thumbnail: null,
				courseId: "course-public"
			})
		});

		expect(response.status).toBe(201);

		const data = await response.json();

		libraryId = data.id;

		expect(libraryId).toBeDefined();

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
		expect(data.some(item => item.id === libraryId)).toBe(true);

	});

	it("should read library item", async () => {

		const response = await fetch(`${API}/admin/library/${libraryId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(response.status).toBe(200);

		const data = await response.json();

		expect(data.id).toBe(libraryId);

	});

	it("should update library item", async () => {

		const response = await fetch(`${API}/admin/library/${libraryId}`, {
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

	});

	it("should delete library item", async () => {

		const response = await fetch(`${API}/admin/library/${libraryId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(response.status).toBe(200);

	});

	it("should confirm library item was deleted", async () => {

		const response = await fetch(`${API}/admin/library/${libraryId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(response.status).toBe(404);

	});

});