# Taleem Server Design Principles

Version: 1.0

---

# Introduction

Taleem Server is the central platform of the Taleem ecosystem.

Its primary responsibility is to provide identity, authorization, data access, and communication services for all Taleem clients.

The server is designed to remain stable while user interfaces, utilities, websites, and applications evolve independently.

---

# 1. The Server is the Platform

The server is the authoritative source of truth.

It owns:

- Authentication
- Authorization
- User accounts
- Library
- Courses
- Subscriptions
- Communication
- Administrative resources

Clients never duplicate server logic.

---

# 2. Clients are Replaceable

Every client is considered disposable.

Examples include:

- Website
- Mobile application
- Desktop application
- Library Utility
- Future administrative tools

Any client should be replaceable without requiring changes to the server.

---

# 3. Business Logic Lives on the Server

Business rules belong on the server.

Clients should never implement rules such as:

- access permissions
- subscription validation
- role checking
- ownership validation

Clients display information.

The server decides what users may access.

---

# 4. Authentication is Centralized

The server is the only authority for user identity.

Authentication uses JSON Web Tokens (JWT).

Every authenticated request carries:

Authorization: Bearer <token>

No client stores business rules regarding authentication.

---

# 5. Authorization is Resource Based

Authorization is determined by resources.

Examples include:

- Library
- Admin
- Communication

Each protected route explicitly declares the resource it requires.

This keeps authorization predictable and easy to audit.

---

# 6. Controllers Own Resources

Each resource has its own controller.

Examples:

- User Controller
- Library Controller
- Communication Controller
- Course Controller

Controllers expose HTTP endpoints only.

They do not contain business logic.

---

# 7. Services Own Business Logic

Services implement application rules.

Typical responsibilities include:

- validation
- authorization decisions
- workflow
- database coordination

Controllers remain thin.

---

# 8. Repositories Own Persistence

Repositories are responsible for reading and writing data.

The rest of the application should not know how data is stored.

Changing the persistence layer should require minimal changes outside repositories.

---

# 9. Utilities are Independent Applications

Administrative utilities are separate applications.

They communicate only through the public API.

They are deployed as static files.

Utilities have no privileged access to the server.

---

# 10. SDKs Encapsulate HTTP

Applications should communicate through SDKs rather than raw HTTP requests.

For example:

- taleem-client
- taleem-admin-client

SDKs provide a stable programming interface while the underlying API evolves.

---

# 11. APIs are Contracts

HTTP endpoints are public contracts.

Changes should preserve backward compatibility whenever possible.

Breaking API changes should be intentional and documented.

---

# 12. Testing Protects the Platform

Tests define expected behavior.

The test suite provides confidence when:

- refactoring
- fixing bugs
- adding features

A feature is not considered complete until it is covered by tests.

---

# 13. Prefer Explicit Design

The project favors explicit structure over clever abstractions.

Resources are represented by dedicated:

- routes
- controllers
- services
- repositories
- tests
- documentation

This makes the system easier to understand and maintain over time.

---

# 14. Long-Term Stability

The server is intended to remain stable over many years.

New features should be added by extending the platform rather than redesigning it.

A stable foundation allows clients and utilities to evolve independently while preserving compatibility.