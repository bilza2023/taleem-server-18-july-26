# Admin Subscription API

Version: 1.0

---

# Overview

Administrative endpoints for managing Subscription resources.

All endpoints require:

- Authentication
- Subscription administrative permission

Base URL

```
/api/admin/subscription
```

Authentication

```
Authorization: Bearer <token>
```

---

# Authorization

Every endpoint requires the authenticated user to have access to the **subscription** administrative resource.

Requests without permission return:

```
403 Forbidden
```

---

# Subscription Object

```json
{
    "id": 1,
    "userId": 5,
    "courseId": "course-public",
    "startsAt": "2026-07-23T00:00:00.000Z",
    "endsAt": "2027-07-23T00:00:00.000Z"
}
```

---

# Subscription Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| id | integer | Yes | Subscription identifier. Primary key. |
| userId | integer | Yes | User who owns the subscription. |
| courseId | string | Yes | Course identifier. |
| startsAt | datetime | Yes | Subscription start date. |
| endsAt | datetime | Yes | Subscription expiration date. |

---

# GET /

Returns all subscriptions.

## Request

```
GET /api/admin/subscription
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

Returns a single subscription.

## Request

```
GET /api/admin/subscription/1
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
|404|Subscription not found|
|500|Internal server error|

---

# POST /

Creates a new subscription.

The server automatically assigns the authenticated user's ID to the `userId` field.

Any `userId` supplied in the request body is ignored.

## Request

```json
{
    "courseId": "course-public",
    "startsAt": "2026-07-23T00:00:00.000Z",
    "endsAt": "2027-07-23T00:00:00.000Z"
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

Updates an existing subscription.

## Request

```
PUT /api/admin/subscription/1
```

Request Body

```json
{
    "courseId": "course-members",
    "startsAt": "2026-08-01T00:00:00.000Z",
    "endsAt": "2027-08-01T00:00:00.000Z"
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
|404|Subscription not found|
|500|Internal server error|

---

# DELETE /:id

Deletes a subscription.

## Request

```
DELETE /api/admin/subscription/1
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
|404|Subscription not found|
|500|Internal server error|

---

# Notes

- All endpoints return JSON.
- Requests and responses use UTF-8 encoded JSON.
- Authentication must be supplied using the Authorization header.
- Administrative authorization is enforced before any controller logic executes.
- Subscription records are identified by their numeric `id`.
- The authenticated user's ID is automatically assigned during creation.
- Client-supplied `userId` values are ignored when creating a subscription.