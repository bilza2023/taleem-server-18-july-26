# Authentication

Authentication is responsible for identifying **who** is making a request.

Within the Taleem Server Kernel, authentication is implemented entirely inside the kernel. The HTTP layer is responsible only for transporting tokens between the client and the kernel.

The guiding principle is simple:

> **Tokens enter the kernel. Authenticated User or Admin objects leave the kernel.**

---

# Design Philosophy

The Taleem Server Kernel is the application.

Express is only an HTTP transport layer.

Authentication therefore belongs to the kernel rather than individual routes.

This keeps authentication logic in one place and prevents every route from repeating the same JWT and database logic.

---

# Responsibilities

## HTTP Layer

The HTTP layer is responsible only for request transport.

Its responsibilities are:

* Read the `Authorization` header.
* Extract the Bearer token.
* Pass the token to the kernel.

It must never:

* Verify JWTs.
* Query users or admins.
* Check authentication state.
* Decide whether a request is authenticated.

Example:

```text
Authorization Header
        │
        ▼
Extract Bearer Token
        │
        ▼
kernel.auth.authenticate(token)
```

---

## JWT Module

The JWT module performs only cryptographic operations.

Responsibilities:

* Create signed JWTs.
* Verify signed JWTs.

The JWT module has no knowledge of:

* Users
* Admins
* Permissions
* Prisma
* Database tables

It only determines whether a token is cryptographically valid.

---

## Auth Module

The Auth module connects JWT authentication to the rest of the kernel.

Its responsibilities are:

* Verify JWT tokens.
* Determine the identity type.
* Load the corresponding User or Admin.
* Confirm the identity still exists.
* Return the authenticated object.

The Auth module is the only component that understands both JWTs and application identities.

---

# Authentication Flow

## User Login

```text
Email + Password
        │
        ▼
User.login()
        │
        ▼
Auth.createUserToken()
        │
        ▼
JWT
```

A token is created only after a successful login.

---

## Admin Login

```text
Email + Password
        │
        ▼
Admin.login()
        │
        ▼
Auth.createAdminToken()
        │
        ▼
JWT
```

Users and admins receive different identity types inside the token.

---

## Protected Request

```text
Bearer Token
        │
        ▼
HTTP Layer
Extract Token
        │
        ▼
Auth.authenticate()
        │
        ▼
JWT.verify()
        │
        ▼
authenticateUser()
        or
authenticateAdmin()
        │
        ▼
Authenticated User/Admin
        │
        ▼
Kernel Modules
```

No module outside `Auth` needs to know how JWT authentication works.

---

# Token Payload

Authentication tokens contain only the minimum information required to identify an identity.

Example:

```json
{
  "id": 17,
  "type": "user"
}
```

or

```json
{
  "id": 3,
  "type": "admin"
}
```

The payload is intentionally small.

The kernel immediately converts this payload into a complete authenticated object.

---

# Why Return Objects Instead of Token Payloads?

A JWT payload only identifies an account.

It does not confirm that the account still exists.

If every module worked directly with JWT payloads, each request would have to:

* Query the database.
* Check whether the account still exists.
* Handle deleted users.
* Repeat identical code.

Instead, authentication performs those checks once.

```text
Token
   │
   ▼
Auth.authenticate()
   │
   ▼
Authenticated User/Admin Object
```

Every module after authentication receives a complete object rather than raw token data.

---

# Developer Errors

Authentication failures are written for developers.

Errors include:

* The method that failed.
* The reason for failure.
* The identity involved.

Example:

```text
========================================
AUTHENTICATION FAILED
----------------------------------------
Method : Auth.authenticateUser()
Reason : User '17' does not exist.
========================================
```

The HTTP layer may convert these errors into a simple:

```text
401 Unauthorized
```

for API clients.

---

# Advantages

This design provides several benefits:

* Single authentication implementation.
* No duplicated JWT logic.
* HTTP routes remain simple.
* Authentication is independent of Express.
* Easy to extend with suspended accounts, email verification, MFA, auditing, or refresh tokens.

Future authentication features can be added by modifying the Auth module without changing application routes.

---

# Public API

## JWT

```js
kernel.jwt.sign(payload)

kernel.jwt.verify(token)
```

---

## Auth

```js
kernel.auth.createUserToken(user)

kernel.auth.createAdminToken(admin)

await kernel.auth.authenticate(token)
```

`authenticate()` returns either a `User` or `Admin` object depending on the authenticated identity.

---

# Summary

Authentication in the Taleem Server Kernel follows one architectural rule:

> **Authentication converts JWT tokens into authenticated User or Admin objects.**

Every module inside the kernel operates on authenticated identities rather than JWT payloads, making the rest of the system simpler, more consistent, and easier to maintain.
