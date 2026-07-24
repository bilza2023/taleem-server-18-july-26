# Communication API

Version: 1.0

---

# Overview

The Communication API allows authenticated users to interact with the Taleem platform by creating and viewing communication records.

Typical uses include:

- Asking questions
- Reporting problems
- Sending feedback
- Viewing personal communications
- Reading public discussions attached to a reference

Base URL

```
/api/communication
```

---

# Authentication

All Communication API endpoints require authentication.

```
Authorization: Bearer <token>
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

# Communication Fields

| Field | Type | Description |
|--------|------|-------------|
| id | integer | Communication identifier. |
| referenceId | string | Resource the communication belongs to. |
| type | string | Communication type. |
| message | string | User message. |
| meta | object \| null | Optional metadata. |
| authorResponse | string \| null | Response from an administrator. |
| isPublic | boolean | Indicates whether the communication is publicly visible. |
| userId | integer | Author of the communication. |
| createdAt | datetime | Creation timestamp. |
| updatedAt | datetime | Last modification timestamp. |

---

# POST /

Creates a new communication.

The authenticated user is automatically assigned as the author.

## Request

```json
{
    "referenceId": "9math-ch1",
    "type": "COMMENT",
    "message": "I don't understand question 4."
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
|500|Internal server error|

---

# GET /me

Returns all communication records created by the authenticated user.

## Request

```
GET /api/communication/me
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
|500|Internal server error|

---

# GET /reference/:referenceId

Returns all public communication associated with a reference.

## Request

```
GET /api/communication/reference/9math-ch1
```

## Response

```json
[
    {
        ...
    }
]
```

Only communication marked as public is returned.

Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|401|Authentication required|
|500|Internal server error|

---

# Notes

- All endpoints return JSON.
- Requests and responses use UTF-8 encoded JSON.
- Authentication must be supplied using the Authorization header.
- The server automatically assigns the authenticated user's `userId`.
- Clients should never submit a `userId`.
- Communication records are linked to resources using `referenceId`.
- The Communication API does not expose update or delete operations. Administrative management is available through the Administrative API.