# Static Content API

Version: 1.0

---

# Overview

The Static Content API provides public access to static resources served by Taleem Server.

These resources do not require authentication.

Examples include:

- HTML pages
- JSON datasets
- Images
- Static assets

Base URL

```
/api
```

---

# Authentication

No authentication is required.

---

# GET /page/:slug

Returns an HTML page.

Pages are intended for static informational content.

Examples include:

- About
- Privacy Policy
- Terms of Service
- Help

## Request

```
GET /api/page/about
```

## Response

```
Content-Type: text/html
```

The response body contains HTML.

Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|404|Page not found|
|500|Internal server error|

---

# GET /data/:name

Returns a JSON data file.

This endpoint is intended for application configuration and other static datasets.

## Request

```
GET /api/data/home-links
```

## Response

```json
{
    "tabs": [
        ...
    ],
    "items": [
        ...
    ]
}
```

Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|404|Data file not found|
|500|Internal server error|

---

# GET /content/*

Returns static content files.

This endpoint serves files directly from the server's content directory.

Examples include:

```
/api/content/images/logo.png

/api/content/uploads/example.pdf

/api/content/articles/image.jpg
```

The returned Content-Type depends on the requested file.

Status Codes

| Code | Description |
|------|-------------|
|200|Success|
|404|File not found|
|500|Internal server error|

---

# Typical Usage

| Endpoint | Purpose |
|----------|---------|
| /page/:slug | Static HTML pages |
| /data/:name | Static JSON data |
| /content/* | Static files and assets |

---

# Notes

- All Static Content endpoints are public.
- Authentication is not required.
- HTML pages are returned as `text/html`.
- JSON data is returned as `application/json`.
- Static files are returned using their appropriate MIME type.
- These endpoints are read-only.
- Administrative utilities may update the underlying content, but content is never modified through the Static Content API.