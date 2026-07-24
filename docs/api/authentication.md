# Authentication API

Version: 1.0

---

# Overview

The Authentication API provides user registration, login, and identity verification.

Authentication is based on JSON Web Tokens (JWT).

A successful login returns a JWT which must be supplied with all protected API requests.

Base URL

```
/api/user
```

---

# Authentication Flow

```
Register

↓

Login

↓

Receive JWT

↓

Store JWT

↓

Send JWT with every protected request

↓

Access Protected Resources
```

---

# Authorization Header

Protected endpoints require:

```
Authorization: Bearer <token>
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

# User Object

```json
{
    "id": 1,
    "name": "Bilal Tariq",
    "email": "bilal@example.com"
}
```

---

# POST /register

Creates a new user account.

## Request

```json
{
    "name": "Bilal Tariq",
    "email": "bilal@example.com",
    "password": "secret123"
}
```

## Response

```json
{
    "token": "...",
    "user": {
        "id": 1,
        "name": "Bilal Tariq",
        "email": "bilal@example.com"
    }
}
```

Status Codes

| Code | Description |
|------|-------------|
|201|User created|
|400|Validation failed|
|500|Internal server error|

---

# POST /login

Authenticates an existing user.

## Request

```json
{
    "email": "bilal@example.com",
    "password": "secret123"
}
```

## Response

```json
{
    "token": "...",
    "user": {
        "id": 1,
        "name": "Bilal Tariq",
        "email": "bilal@example.com"
    }
}
```

Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|401|Invalid credentials|
|500|Internal server error|

---

# GET /verify

Verifies the supplied JWT and returns the authenticated user.

Authentication

```
Authorization: Bearer <token>
```

## Request

```
GET /api/user/verify
```

## Response

```json
{
    "id": 1,
    "name": "Bilal Tariq",
    "email": "bilal@example.com"
}
```

Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|401|Authentication required or invalid token|
|500|Internal server error|

---

# Token Lifecycle

1. User registers or logs in.
2. Server generates a JWT.
3. Client stores the JWT.
4. Client includes the JWT with every protected request.
5. Server validates the JWT before processing the request.

---

# Client Responsibilities

Clients are responsible for:

- Registering users.
- Logging users in.
- Storing the JWT securely.
- Sending the Authorization header.
- Removing the JWT after logout.

Clients are **not** responsible for validating tokens or making authorization decisions.

---

# Server Responsibilities

The server is responsible for:

- Authenticating users.
- Generating JWTs.
- Validating JWTs.
- Determining the authenticated user.
- Enforcing authorization rules.

---

# Notes

- Authentication uses JSON Web Tokens (JWT).
- The JWT represents the authenticated user.
- All protected API endpoints require a valid JWT.
- Authentication establishes identity only. Authorization is handled separately for protected resources.