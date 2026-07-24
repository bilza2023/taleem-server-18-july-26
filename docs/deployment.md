# Deployment

Version: 1.0

---

# Overview

Taleem Server is a standard Node.js application.

The server is designed to run behind a reverse proxy and expose a REST API over HTTP or HTTPS.

Typical deployment consists of:

```
Internet

↓

Reverse Proxy (Nginx)

↓

Node.js Application

↓

SQLite / PostgreSQL
```

---

# Requirements

- Node.js 18 or later
- npm
- SQLite (default)
- Linux, macOS or Windows

---

# Installation

Clone the repository.

```bash
git clone <repository>
cd taleem-server
```

Install dependencies.

```bash
npm install
```

---

# Environment Configuration

Create an environment file.

```
.env
```

Example

```text
PORT=9000

JWT_SECRET=your-secret

DATABASE_URL="file:./dev.db"
```

---

# Database

Create the database schema.

```bash
npx prisma migrate deploy
```

or during development

```bash
npx prisma migrate dev
```

Populate the database.

```bash
node prisma/seed.js
```

---

# Starting the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

The server will listen on

```
http://localhost:9000
```

unless configured otherwise.

---

# Reverse Proxy

A reverse proxy is recommended for production deployments.

Typical responsibilities include:

- HTTPS termination
- Compression
- Static file caching
- Request forwarding

---

# Example Production Architecture

```
Browser

↓

HTTPS

↓

Nginx

↓

Node.js (Taleem Server)

↓

SQLite / PostgreSQL
```

---

# Static Content

Static content may be served by:

- Taleem Server
- A reverse proxy
- A CDN

depending on deployment requirements.

---

# Administrative Applications

Administrative applications communicate with the server through the REST API.

They are deployed independently and never access the database directly.

```
Admin Utility

↓

REST API

↓

Taleem Server

↓

Database
```

---

# Client Applications

Client applications also communicate exclusively through the REST API.

Examples include:

- Taleem Browser
- Taleem Slides
- Taleem Library Utility
- Mobile applications

---

# Updating

Typical deployment procedure:

1. Pull the latest source.
2. Install updated dependencies.
3. Apply database migrations.
4. Restart the server.

---

# Logging

Production deployments should capture:

- application logs
- request logs
- error logs

using the preferred hosting platform or process manager.

---

# Process Management

In production, the server should be managed by a process manager such as:

- PM2
- systemd
- Docker
- Kubernetes

The deployment method does not affect the REST API.

---

# Notes

- The server is stateless.
- Authentication uses JWT.
- Business logic resides entirely on the server.
- Clients and administrative utilities communicate exclusively through HTTP.
- The deployment platform is independent of the application architecture.