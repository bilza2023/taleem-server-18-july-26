import { describe, it, expect } from "vitest";

const API = "http://127.0.0.1:9000/api";

async function loginAlice() {
  const response = await fetch(`${API}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "alice@example.com",
      password: "12345678",
    }),
  });

  expect(response.status).toBe(200);

  const data = await response.json();

  expect(data.token).toBeDefined();

  return data.token;
}

describe("Library Authorization", () => {
  it("should return 404 for unknown library item", async () => {
    const token = await loginAlice();

    const response = await fetch(`${API}/library/does-not-exist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(404);
  });

  it("should reject missing token", async () => {
    const response = await fetch(
      `${API}/library/9math-ch1-quickref-real-numbers`
    );

    expect(response.status).toBe(401);
  });

  it("should reject invalid token", async () => {
    const response = await fetch(
      `${API}/library/9math-ch1-quickref-real-numbers`,
      {
        headers: {
          Authorization: "Bearer invalid-token",
        },
      }
    );

    expect(response.status).toBe(401);
  });

  it("should reject empty bearer token", async () => {
    const response = await fetch(
      `${API}/library/9math-ch1-quickref-real-numbers`,
      {
        headers: {
          Authorization: "Bearer ",
        },
      }
    );

    expect(response.status).toBe(401);
  });

  it("should allow public quick reference", async () => {
    const token = await loginAlice();

    const response = await fetch(
      `${API}/library/9math-ch1-quickref-real-numbers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(200);
  });

  it("should allow public Quran article", async () => {
    const token = await loginAlice();

    const response = await fetch(
      `${API}/library/why-quran-is-a-miracle-001`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(200);
  });

  it("should allow subscribed Math 9 content", async () => {
    const token = await loginAlice();

    const response = await fetch(
      `${API}/library/9math-ch1-lesson-001`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(200);
  });

  it("should reject unsubscribed Math 10 content", async () => {
    const token = await loginAlice();

    const response = await fetch(
      `${API}/library/10math-ch1-lesson-001`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(403);
  });
});