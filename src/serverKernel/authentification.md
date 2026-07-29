# Authentication in Taleem Server Kernel

## Purpose

A large percentage of bugs were caused by authentication logic being mixed with HTTP routing.

The purpose of this design is to completely isolate authentication inside the **Server Kernel** so that the HTTP layer becomes simple and predictable.

---

# Design Principle

The kernel is the product.

HTTP is only a transport layer.

Authentication therefore belongs to the kernel, **not** to Express routes.

---

# Responsibilities

## HTTP Layer

The HTTP layer is responsible only for transport-related work.

It may:

* Read the `Authorization` header.
* Read cookies.
* Extract the Bearer token.
* Pass the token to the kernel.

It must **never**:

* Verify JWTs.
* Load users.
* Check permissions.
* Query the database.

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

## JWT

The JWT module has only one responsibility:

* Create signed tokens.
* Verify signed tokens.

JWT does **not** know anything about users, admins, permissions or the database.

It only knows whether a token is cryptographically valid.

---

## Auth Module

The Auth module bridges JWT and the rest of the kernel.

It is responsible for:

* Verifying JWTs.
* Loading the corresponding user or admin.
* Confirming the identity still exists.
* Returning an authenticated object.

It is the only place that understands both JWTs and application identities.

---

# Why Auth Returns a User Object

A JWT only proves identity.

It is **not** the identity.

For example, after verifying a token we may obtain:

```json
{
    "id": 17,
    "type": "user"
}
```

This payload is not useful to the rest of the application.

Every route would still need to:

* Query the database.
* Check whether the user exists.
* Handle deleted accounts.
* Repeat the same code.

Instead, the kernel performs those steps once.

```text
Token
   │
   ▼
Auth.authenticate()
   │
   ▼
Authenticated User
```

The caller receives a real `User` or `Admin` object.

The rest of the kernel never works with JWT payloads.

---

# Authentication Flow

## Login

```text
Email + Password
        │
        ▼
User.login()
        │
        ▼
User Object
        │
        ▼
Auth.createUserToken()
        │
        ▼
JWT
```

A token is created only after a successful login.

---

## Protected Request

```text
Bearer Token
        │
        ▼
HTTP extracts token
        │
        ▼
Auth.authenticate()
        │
        ▼
Authenticated User
        │
        ▼
Library
Course
Communication
Subscription
```

No new token is created during normal requests.

---

# Why This Design

This design centralizes authentication.

If authentication rules change, only the Auth module changes.

Examples include:

* Suspended users.
* Deleted accounts.
* Email verification.
* Token refresh.
* Login auditing.
* Multi-factor authentication.

Routes remain unchanged.

---

# Error Philosophy

Authentication errors are written for developers, not end users.

Every authentication error should clearly state:

* Which method failed.
* Why it failed.
* Which identity was involved.
* What should be checked next.

Example:

```text
========================================
AUTHENTICATION FAILED
----------------------------------------
Method : Auth.authenticate()

Reason :
User '17' no longer exists.

Possible causes:
- User was deleted.
- Database was restored.
- Invalid JWT.
========================================
```

The HTTP layer may convert this into a simple `401 Unauthorized` response for clients, but the kernel should always explain the real cause.

---

# Architectural Rule

The rest of the kernel should never ask:

> "Is this token valid?"

Instead it should ask:

> "Who is making this request?"

The answer is always an authenticated `User` or `Admin` object.

---

# Summary

Authentication in the Taleem Server Kernel follows one simple rule:

> **Tokens enter the kernel. Authenticated User/Admin objects leave the kernel.**

Everything between those two points is the responsibility of the Auth module.
