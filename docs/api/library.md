# Library API

Version: 1.0

---

# Overview

The Library API provides authenticated access to library content.

Library items may represent:

- HTML documents
- JSON documents
- Markdown documents
- Text documents

The server determines whether the authenticated user is authorized to access a requested library item.

Base URL

```
/api/library
```

---

# Authentication

All Library API endpoints require authentication.

```
Authorization: Bearer <token>
```

---

# Authorization

After authentication, the server determines whether the user is permitted to access the requested library item.

Authorization is based on the course associated with the library item.

Depending on the course configuration, access may be:

- PUBLIC
- MEMBERS
- SUBSCRIPTION

Clients do not perform authorization checks.

---

# Library Object

```json
{
    "id": 1,
    "slug": "9math-ch1",
    "title": "Prime Numbers",
    "description": "Introduction to prime numbers.",
    "thumbnail": "/images/prime.jpg",
    "type": "HTML",
    "body": "<h1>Prime Numbers</h1>",
    "courseId": "course-public"
}
```

---

# Library Fields

| Field | Type | Description |
|--------|------|-------------|
| id | integer | Library identifier. |
| slug | string | Unique library slug. |
| title | string | Library title. |
| description | string \| null | Short description. |
| thumbnail | string \| null | Thumbnail image or URL. |
| type | string | Content type (HTML, JSON, TEXT or MARKDOWN). |
| body | string \| null | Document content. |
| courseId | string | Associated course identifier. |

---

# GET /index

Returns the library index.

The response contains metadata for all library items available to the authenticated user.

The library body is **not** included in the index response. :contentReference[oaicite:1]{index=1}

## Request

```
GET /api/library/index
```

## Response

```json
{
    "items": [
        {
            "slug": "9math-ch1",
            "title": "Prime Numbers",
            "description": "Introduction to prime numbers.",
            "thumbnail": "/images/prime.jpg",
            "type": "HTML",
            "courseId": "course-public"
        }
    ]
}
```

Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|401|Authentication required|
|403|Access denied|
|500|Internal server error|

---

# GET /:slug

Returns a single library item.

## Request

```
GET /api/library/9math-ch1
```

## Response

```json
{
    "id": 1,
    "slug": "9math-ch1",
    "title": "Prime Numbers",
    "description": "Introduction to prime numbers.",
    "thumbnail": "/images/prime.jpg",
    "type": "HTML",
    "body": "<h1>Prime Numbers</h1>",
    "courseId": "course-public"
}
```

Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|401|Authentication required|
|403|Access denied|
|404|Library item not found|
|500|Internal server error|

---

# Notes

- All endpoints return JSON.
- Requests and responses use UTF-8 encoded JSON.
- Authentication must be be supplied using the Authorization header.
- Authorization is performed by the server using the course associated with the library item.
- The library index returns metadata only.
- The document body is returned only when requesting an individual library item.
- Library content is read-only through the public API.
- Administrative management of library items is available through the Administrative API.