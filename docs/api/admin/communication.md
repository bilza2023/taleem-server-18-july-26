# Admin Communication API

Version: 1.0

---

# Overview

Administrative endpoints for managing Communication resources.

All endpoints require:

- Authentication
- Communication administrative permission

Base URL

```
/api/admin/communication
```

Authentication

```
Authorization: Bearer <token>
```

---

# Authorization

Every endpoint requires the authenticated user to have access to the **communication** administrative resource.

Requests without permission return:

```
403 Forbidden
```

---

# Communication Object

```json
{
    "id": 15,
    "referenceId": "9math-ch1",
    "type": "COMMENT",
    "message": "I don't understand question 4.",
    "meta": null,
    "authorResponse": null,
    "isPublic": true,
    "userId": 1,
    "createdAt": "2026-07-23T12:30:00.000Z",
    "updatedAt": "2026-07-23T12:30:00.000Z"
}
```

---

# GET /

Returns all communication records.

## Request

```
GET /api/admin/communication
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

# GET /:id

Returns a single communication record.

## Request

```
GET /api/admin/communication/15
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
|404|Communication not found|
|500|Internal server error|

---

# POST /

Creates a new communication record.

The authenticated user's ID is assigned automatically by the server.

## Request

```json
{
    "referenceId": "9math-ch1",
    "type": "COMMENT",
    "message": "I don't understand question 4.",
    "meta": null,
    "authorResponse": null,
    "isPublic": true
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

# PUT /:id

Updates an existing communication record.

## Request

```
PUT /api/admin/communication/15
```

Request Body

```json
{
    "message": "Updated message",
    "authorResponse": "Thank you. This has been clarified.",
    "isPublic": true
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
|404|Communication not found|
|500|Internal server error|

---

# DELETE /:id

Deletes a communication record.

## Request

```
DELETE /api/admin/communication/15
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
|404|Communication not found|
|500|Internal server error|

---

# Notes

- All endpoints return JSON.
- Requests and responses use UTF-8 encoded JSON.
- Authentication must be supplied using the Authorization header.
- Administrative authorization is enforced before any controller logic executes.
- When creating a communication record, the server automatically assigns `userId` from the authenticated user. Clients should not send a `userId` field.
- Communication records are identified by their numeric `id`.