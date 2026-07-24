# Taleem Server

Taleem Server is the backend platform for the Taleem ecosystem.

It provides:

- User authentication
- Authorization
- Library management
- Communication
- Course management
- Subscription management
- Static content delivery
- Administrative APIs

The server is designed around a layered architecture:

```
HTTP Request

↓

Route

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

Database
```

Administrative applications and client applications communicate exclusively through the REST API.

The server contains the platform's business logic. Clients remain lightweight and are responsible only for presentation and user interaction.

---

# Documentation

Project documentation is located in the `docs` directory.

## Architecture

- docs/architecture.md
- docs/design-principles.md
- docs/deployment.md

## Public API

- docs/api/overview.md
- docs/api/authentication.md
- docs/api/library.md
- docs/api/communication.md
- docs/api/static-content.md

## Administrative API

- docs/api/admin/overview.md
- docs/api/admin/library.md
- docs/api/admin/course.md
- docs/api/admin/subscription.md
- docs/api/admin/communication.md
- docs/api/admin/admins.md

---

# Development

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Run the test suite

```bash
npm test
```

---

# Architecture

The server follows several core principles.

- Business logic resides on the server.
- Authentication is centralized.
- Authorization is enforced by the server.
- Clients communicate exclusively through REST APIs.
- Administrative utilities are independent applications.
- APIs are treated as stable contracts.

---

# License

Copyright © Taleem.help