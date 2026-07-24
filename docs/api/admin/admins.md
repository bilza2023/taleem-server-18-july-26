# Administrative Accounts

Version: 1.0

---

# Overview

The current version of Taleem Server does not expose a REST API for managing administrative accounts.

Administrative users are created and maintained through database seed scripts.

---

# Administrative Resources

Administrative permissions are assigned to user accounts through the database.

Permissions determine access to protected administrative resources such as:

- library
- communication
- course
- subscription

These permissions are enforced by the server before any administrative endpoint executes.

---

# Current Management

Administrative accounts are created by project seed scripts.

Typical workflow:

1. Register a user.
2. Run the appropriate seed script.
3. Grant the required administrative resources.
4. Log in using the assigned account.

---

# Authentication

Administrative users authenticate using the standard user endpoints.

```
POST /api/user/login
```

The server issues a JWT.

The JWT is used to access administrative endpoints.

---

# Authorization

Administrative APIs use resource-based authorization.

Each administrative route declares the resource it requires.

Examples:

```
requireResource("library")

requireResource("course")

requireResource("communication")

requireResource("subscription")
```

The authenticated user's permissions are verified before the request reaches the controller.

---

# Future API

A future version of Taleem Server may expose endpoints for:

- listing administrators
- assigning resources
- revoking resources
- creating administrative accounts

At present, these operations are intentionally performed through database scripts.

---

# Notes

- There is currently no REST API for administrative account management.
- Administrative users are managed outside the public API.
- Seed scripts remain the authoritative mechanism for creating and configuring administrator accounts.