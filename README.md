# Taleem Server

Backend server for **Taleem.help**.

---

# Base URL

```
http://localhost:3000
```

---

# Health

## GET /

Returns basic server information.

Example:

```
GET /
```

---

## GET /api/health

Health check endpoint.

Example:

```
GET /api/health
```

---

# User API

## POST /user/register

Register a new user.

Request

```json
{
    "email": "admin@example.com",
    "password": "12345678"
}
```

Response

```json
{
    "message": "User registered.",
    "token": "..."
}
```

---

## POST /user/login

Login.

Request

```json
{
    "email": "admin@example.com",
    "password": "12345678"
}
```

Response

```json
{
    "message": "Login successful.",
    "token": "..."
}
```

---

## GET /user/verify

Verify JWT token.

Headers

```
Authorization: Bearer <token>
```

Response

```json
{
    "user": {
        "id": 1,
        "email": "admin@example.com",
        "name": null,
        "role": "ADMIN"
    }
}
```

---

# Article API

## GET /article/:slug

Serve an HTML article.

Example

```
GET /article/test
```

Serves

```
content/articles/test.html
```

---

# Home Links API

## GET /home-links

Returns home page navigation JSON.

Serves

```
content/data/home-links.json
```

---

# Syllabus API

## GET /syllabus/:course

Returns syllabus JSON.

Example

```
GET /syllabus/fbise8math
```

Serves

```
content/syllabus/fbise8math.json
```

---

# Static Content

## Audio

```
GET /content/audio/<file>
```

Example

```
/content/audio/music.mp3
```

---

## Images

```
GET /content/images/<file>
```

Example

```
/content/images/image.png
```

---

## Decks

```
GET /content/decks/<file>
```

Example

```
/content/decks/test.json
```

---

# Content Directory

```
content/

    articles/
    audio/
    data/
    decks/
    images/
    syllabus/
```

---

# Tests

Run all tests

```
npm test
```

Current integration tests

- Article
- Audio
- Images
- Decks
- Home Links
- Syllabus
- User Authentication

All tests use the real server, real database and real HTTP requests.

No mocking is used.

---

# Status

Current Version

```
Taleem Server v1
```

Implemented

- Express Server
- Prisma
- SQLite
- JWT Authentication
- Content Server
- Article Server
- Home Links
- Syllabus
- Integration Tests

Pending

- Content Authentication
- Admin API
- Course API
- Lesson API
- Deployment