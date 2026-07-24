# Admin Course API

Version: 1.0

---

# Overview

Administrative endpoints for managing Course resources.

All endpoints require:

- Authentication
- Course administrative permission

Base URL

```
/api/admin/course
```

Authentication

```
Authorization: Bearer <token>
```

---

# Authorization

Every endpoint requires the authenticated user to have access to the **course** administrative resource.

Requests without permission return:

```
403 Forbidden
```

---

# Course Object

```json
{
    "id": "course-public",
    "slug": "public-course",
    "title": "Public Course",
    "description": "Introduction to Mathematics",
    "thumbnail": "/images/course-public.jpg",
    "access": "PUBLIC",
    "price": 0
}
```

---

# Course Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | Yes | Unique course identifier. Primary key. |
| slug | string | Yes | Unique URL-friendly identifier. |
| title | string | Yes | Course title. |
| description | string \| null | No | Course description. |
| thumbnail | string \| null | No | Thumbnail image path or URL. |
| access | string | Yes | PUBLIC, MEMBERS or SUBSCRIPTION. |
| price | integer | Yes | Course price. Defaults to 0. |

---

# GET /

Returns all courses.

## Request

```
GET /api/admin/course
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

Returns a single course.

## Request

```
GET /api/admin/course/course-public
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
|404|Course not found|
|500|Internal server error|

---

# POST /

Creates a new course.

## Request

```json
{
    "id": "course-public",
    "slug": "public-course",
    "title": "Public Course",
    "description": "Introduction to Mathematics",
    "thumbnail": "/images/course-public.jpg",
    "access": "PUBLIC",
    "price": 0
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

Updates an existing course.

## Request

```
PUT /api/admin/course/course-public
```

Request Body

```json
{
    "title": "Updated Course Title",
    "description": "Updated description",
    "access": "SUBSCRIPTION",
    "price": 2500
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
|404|Course not found|
|500|Internal server error|

---

# DELETE /:id

Deletes a course.

## Request

```
DELETE /api/admin/course/course-public
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
|404|Course not found|
|500|Internal server error|

---

# Notes

- All endpoints return JSON.
- Requests and responses use UTF-8 encoded JSON.
- Authentication must be supplied using the Authorization header.
- Administrative authorization is enforced before any controller logic executes.
- Courses are identified by their **id**, not their slug.
- The `slug` field must remain unique.
- Valid values for `access` are:
  - `PUBLIC`
  - `MEMBERS`
  - `SUBSCRIPTION`