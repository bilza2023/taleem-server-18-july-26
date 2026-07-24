# Admin Library API

Version: 1.0

---

# Overview

Administrative endpoints for managing Library resources.

All endpoints require:

- Authentication
- Library administrative permission

Base URL

```
/api/admin/library
```

Authentication

```
Authorization: Bearer <token>
```

---

# Authorization

Every endpoint requires the authenticated user to have access to the **library** administrative resource.

Requests without permission return:

```
403 Forbidden
```

---

# Library Object

```json
{
    "id": "...",
    "slug": "9math-ch1",
    "title": "Prime Numbers",
    "body": "...",
    "type": "HTML",
    "courseId": "course-public"
}
```

---

# GET /

Returns all library items.

## Request

```
GET /api/admin/library
```

## Response

```json
[
    {
        ...
    }
]
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
GET /api/admin/library/9math-ch1
```

## Response

```json
{
    ...
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

# POST /

Creates a new library item.

## Request

```json
{
    "slug": "9math-ch1",
    "title": "Prime Numbers",
    "type": "HTML",
    "body": "<h1>Hello</h1>",
    "courseId": "course-public"
}
```

## Response

```json
{
    ...
}
```

Status Codes

| Code | Description |
|------|-------------|
|201|Created|
|401|Authentication required|
|403|Access denied|
|500|Internal server error|

---

# PUT /:slug

Updates an existing library item.

## Request

```
PUT /api/admin/library/9math-ch1
```

Request Body

```json
{
    "title": "Updated Title",
    "body": "<p>Updated content</p>"
}
```

## Response

```json
{
    ...
}
```

Status Codes

| Code | Description |
|------|-------------|
|200|Updated|
|401|Authentication required|
|403|Access denied|
|404|Library item not found|
|500|Internal server error|

---

# DELETE /:slug

Deletes a library item.

## Request

```
DELETE /api/admin/library/9math-ch1
```

## Response

```json
{
    "message": "Deleted."
}
```

Status Codes

| Code | Description |
|------|-------------|
|200|Deleted|
|401|Authentication required|
|403|Access denied|
|404|Library item not found|
|500|Internal server error|

---

# Notes

- All endpoints return JSON.
- Requests and responses use UTF-8 encoded JSON.
- Authentication must be supplied using the Authorization header.
- Administrative authorization is enforced before any controller logic executes.
- The server is responsible for validating permissions.