# Taleem Public API

Version: 1.0

---

# Overview

The Taleem Public API provides authenticated access to the core services of the Taleem platform.

It is intended for applications used by students, teachers, and other end users.

Typical clients include:

- Taleem Browser
- Taleem Slides
- Taleem Utilities
- Mobile applications
- Third-party integrations

The Public API is read-oriented and exposes only the operations required by end users.

Administrative functionality is provided separately through the Administrative API.

---

# Base URL

```
/api
```

---

# Authentication

Most API endpoints require authentication using a JSON Web Token (JWT).

```
Authorization: Bearer <token>
```

Authentication is performed using the Authentication API.

```
POST /api/user/login
```

Some endpoints, such as static content, are intentionally public and do not require authentication.

---

# Authorization

After authentication, the server determines whether the authenticated user may access the requested resource.

Authorization decisions are performed entirely by the server.

Clients should never attempt to duplicate authorization logic.

---

# Public APIs

The current Public API consists of the following services.

| API | Purpose |
|-----|---------|
| Authentication | User registration, login and identity verification |
| Library | Access library content |
| Communication | Create and read user communications |
| Static Content | Public HTML pages, JSON data and static assets |

---

# API Structure

```
/api

    /user

    /library

    /communication

    /page

    /data

    /content
```

---

# Response Format

Unless otherwise noted, all endpoints return JSON.

Example

```json
{
    "message": "Success"
}
```

Some endpoints return HTML or static files instead of JSON.

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

# API Documentation

Detailed documentation is available for each service.

- authentication.md
- library.md
- communication.md
- static-content.md

---

# Design Principles

The Public API follows several architectural principles.

- Authentication is centralized.
- Authorization is performed by the server.
- Clients communicate exclusively through HTTP.
- Business logic remains on the server.
- Public APIs expose only end-user functionality.
- Administrative operations are provided by the Administrative API.

---

# Administrative API

Management operations such as creating, updating and deleting platform resources are not part of the Public API.

These operations are available through the Administrative API.

---

# Versioning

The Public API follows the Taleem Server release.

Breaking API changes are avoided whenever possible and will be documented when introduced.