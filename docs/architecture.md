# Taleem Server Architecture

Version: 1.0

---

# Overview

Taleem Server is the central platform for the Taleem ecosystem.

The server exposes a REST API that provides identity, authorization, library access, communication services, administrative operations, and static content.

All Taleem applications communicate with the server through its public API.

---

# High-Level Architecture

```
                +----------------------+
                |    Taleem Clients    |
                +----------------------+
                   |        |        |
                   |        |        |
        Website  Mobile  Admin Utility
                   |
                   |
            HTTP / REST API
                   |
        +----------------------+
        |    Taleem Server     |
        +----------------------+
                   |
      ------------------------------
      |            |              |
 Controllers    Services    Middleware
      |            |
      |       Repositories
      |            |
      +------------+
             |
          Prisma ORM
             |
         SQLite / Future DB
```

---

# Layer Responsibilities

## Routes

Routes define HTTP endpoints.

Responsibilities:

- URL mapping
- HTTP verbs
- middleware registration

Routes should contain no business logic.

---

## Middleware

Middleware performs request processing before controllers.

Examples:

- Authentication
- Authorization
- Resource validation
- Request parsing

Middleware should remain reusable.

---

## Controllers

Controllers receive HTTP requests.

Responsibilities:

- Validate request shape
- Call services
- Return HTTP responses

Controllers should remain thin.

---

## Services

Services implement business logic.

Responsibilities include:

- application rules
- workflows
- validation
- authorization decisions
- coordination between repositories

Most application logic belongs here.

---

## Repositories

Repositories isolate persistence.

Responsibilities include:

- reading data
- writing data
- database queries

Repositories hide database implementation details from the rest of the application.

---

## Database

The server currently uses Prisma ORM.

The persistence layer can be replaced without affecting controllers or services.

---

# Request Flow

Typical request lifecycle:

```
Client

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

↓

Repository

↓

Service

↓

Controller

↓

HTTP Response
```

---

# Project Structure

```
src/

controllers/

middleware/

repositories/

routes/

services/

utils/

prisma/

tests/
```

Each folder has a single responsibility.

---

# Resources

The server is organized around resources.

Current resources include:

- User
- Library
- Course
- Subscription
- Communication
- Static Content
- Administration

Each resource owns:

- routes
- controller
- service
- repository
- tests
- documentation

---

# Authentication

Authentication is performed using JWT.

Authenticated requests include:

Authorization: Bearer <token>

User identity is established once by middleware and made available to downstream handlers.

---

# Authorization

Authorization is resource based.

Protected routes explicitly declare the resource they require.

Authorization decisions are performed before business logic executes.

---

# Static Content

The server also hosts static resources.

Examples include:

- HTML pages
- JSON data
- uploaded content
- administrative utilities

Static resources are served independently from API endpoints.

---

# Administrative Utilities

Administrative tools are independent applications.

They communicate exclusively through the public API.

Utilities contain no direct database access.

Deployment consists of uploading static build files.

---

# SDKs

Applications are encouraged to use SDKs instead of raw HTTP requests.

Examples:

- taleem-client
- taleem-admin-client

SDKs encapsulate request construction and authentication.

---

# Testing Strategy

The server is protected by automated tests.

Testing covers:

- middleware
- authorization
- API endpoints
- communication
- library
- administration
- static content

Tests verify public behavior rather than implementation details.

---

# Extending the Architecture

New resources should follow the existing architecture.

A typical resource introduces:

- route
- controller
- service
- repository
- tests
- API documentation

Maintaining this structure keeps the codebase consistent and predictable.