# Taleem Administrative API

Version: 1.0

---

# Overview

The Administrative API provides authenticated access to the management functions of the Taleem platform.

These endpoints are intended for administrative applications and utilities such as:

- Library Utility
- Future Course Manager
- Subscription Manager
- Communication Manager
- Other internal administrative tools

All administrative operations are performed through the same REST API used by the Taleem ecosystem.

---

# Base URL

```
/api/admin
```

---

# Authentication

All administrative endpoints require authentication.

```
Authorization: Bearer <token>
```

A valid JWT must be obtained through the standard authentication API.

```
POST /api/user/login
```

---

# Authorization

Authentication alone does not grant administrative access.

Each administrative route requires permission for a specific resource.

Examples include:

- library
- communication
- course
- subscription

Permissions are enforced before controller logic executes.

---

# Administrative Resources

Current administrative resources include:

| Resource | Description |
|----------|-------------|
| Library | Manage library content |
| Communication | Manage user communications |
| Course | Manage course definitions |
| Subscription | Manage course subscriptions |

---

# API Structure

```
/api/admin

    /library

    /communication

    /course

    /subscription
```

Each resource supports standard CRUD operations.

| Method | Purpose |
|--------|---------|
| GET | Read |
| POST | Create |
| PUT | Update |
| DELETE | Delete |

---

# Response Format

Successful requests return JSON.

Example:

```json
{
    "id": 1,
    "title": "Example"
}
```

Errors also return JSON.

Example:

```json
{
    "message": "Not found."
}
```

---

# Common Status Codes

| Code | Meaning |
|------|---------|
|200|Success|
|201|Resource created|
|401|Authentication required|
|403|Access denied|
|404|Resource not found|
|500|Internal server error|

---

# Resource Documentation

Detailed documentation for each administrative resource is available separately.

- library.md
- communication.md
- course.md
- subscription.md
- admins.md

Each document describes:

- endpoints
- request format
- response format
- object fields
- status codes
- implementation notes

---

# Administrative Utilities

The Administrative API is intended to be consumed by dedicated administrative applications.

These applications:

- authenticate using JWT
- communicate exclusively through the REST API
- do not access the database directly
- are deployed independently from the server

---

# Versioning

The Administrative API follows the server release.

Breaking API changes are avoided whenever possible and will be documented when introduced.