# Taleem Server API

Base URL (development)

```
http://127.0.0.1:9000/api
```

This document describes the API consumed by the Taleem Svelte frontend.

---

# Authentication

The API uses JWT Bearer tokens.

After login, every protected request must include:

```http
Authorization: Bearer <token>
```

---

# Public Endpoints

## GET /api

Returns API information.

Response

```json
{
  "name": "Taleem API",
  "version": "1.0.0",
  "status": "running",
  "message": "Welcome to Taleem Server 🚀"
}
```

---

## GET /api/health

Health check.

Response

```json
{
  "status": "ok",
  "time": "2026-07-22T12:00:00.000Z"
}
```

---

## GET /api/home-links

Returns the homepage navigation JSON.

Used by:

- Home page
- Tabs
- Featured articles
- Course cards

Response

```json
[
  {
    "type": "article",
    "contentId": "9math-ch1-quickref-real-numbers",
    "title": "...",
    "description": "...",
    "image": "...",
    "url": "/articles?article=9math-ch1-quickref-real-numbers"
  }
]
```

---

## GET /api/article/:slug

Returns article HTML.

Example

```
GET /api/article/9math-ch1-quickref-real-numbers
```

Response

```
HTML
```

The frontend renders the returned HTML directly.

---

## Static Content

Everything inside

```
content/
```

is available through

```
/api/content/
```

Examples

```
/api/content/images/example.png

/api/content/audio/example.mp3

/api/content/decks/example.json

/api/content/files/example.pdf
```

---

# User API

---

## POST /api/user/register

Creates a user.

Request

```json
{
  "name": "Bilal",
  "email": "bilal@example.com",
  "password": "12345678"
}
```

Response

```json
{
  "token": "...",
  "user": {
    ...
  }
}
```

---

## POST /api/user/login

Logs in an existing user.

Request

```json
{
  "email": "bilal@example.com",
  "password": "12345678"
}
```

Response

```json
{
  "token": "...",
  "user": {
    ...
  }
}
```

Save the token locally.

---

## GET /api/user/verify

Verifies an existing JWT.

Headers

```
Authorization: Bearer <token>
```

Response

```json
{
    ...
}
```

---

# Library API

Library items are identified by **slug**.

The frontend never uses database IDs.

---

## GET /api/library/:slug

Returns one library item.

Example

```
GET /api/library/9math-ch1-quickref-real-numbers
```

Headers

```
Authorization: Bearer <token>
```

Response

```json
{
    ...
}
```

---

# Communication API

Communication allows logged-in users to ask questions about a library item.

The frontend always uses **librarySlug**.

Database IDs never leave the backend.

---

## POST /api/communication

Create a communication.

Headers

```
Authorization: Bearer <token>
```

Request

```json
{
    "librarySlug": "9math-ch1-quickref-real-numbers",
    "message": "I don't understand this lesson."
}
```

Response

```json
{
    ...
}
```

---

## GET /api/communication/my

Returns all communications created by the current user.

Headers

```
Authorization: Bearer <token>
```

Response

```json
[
    {
        ...
    }
]
```

---

## GET /api/communication/library/:librarySlug

Returns all **public** communications for one library item.

Example

```
GET /api/communication/library/9math-ch1-quickref-real-numbers
```

Headers

```
Authorization: Bearer <token>
```

Response

```json
[
    {
        ...
    }
]
```

---

# Error Responses

Unauthorized

```http
401 Unauthorized
```

Not Found

```http
404 Not Found
```

Internal Error

```http
500 Internal Server Error
```

---

# Frontend Flow

## App Startup

```
GET /api/home-links
```

↓

Display home page.

---

## Open Article

```
GET /api/article/:slug
```

↓

Render returned HTML.

---

## Register

```
POST /api/user/register
```

↓

Save JWT.

---

## Login

```
POST /api/user/login
```

↓

Save JWT.

---

## Verify Existing Login

```
GET /api/user/verify
```

↓

Keep user logged in.

---

## Open Library Item

```
GET /api/library/:slug
```

↓

Receive metadata.

↓

Render page.

---

## Load Public Discussion

```
GET /api/communication/library/:librarySlug
```

↓

Display public questions and answers.

---

## Ask Question

```
POST /api/communication
```

↓

Body contains

```json
{
    "librarySlug": "...",
    "message": "..."
}
```

↓

Refresh communication list.

---

# Design Rules

- The frontend never uses database IDs.
- Library items are always identified by `slug`.
- Communication APIs always use `librarySlug`.
- Static assets are served from `/api/content`.
- Articles are HTML.
- Images, audio, PDFs and decks are static files.
- All authenticated endpoints require a JWT Bearer token.