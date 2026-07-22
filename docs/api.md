# Taleem Core API Reference
Version: 1.0
Date: 2026-07-23

Base URL

```
http://127.0.0.1:9000/api
```

---

# POST /user/register

Register a new user.

### Request

```json
{
  "name": "Bilal Tariq",
  "email": "bilal@example.com",
  "password": "secret123"
}
```

### Response

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

---

# POST /user/login

### Request

```json
{
  "email": "bilal@example.com",
  "password": "secret123"
}
```

### Response

```json
{
  "token": "...",
  "user": { ... }
}
```

---

# GET /user/verify

Authentication

```
Authorization: Bearer <token>
```

### Response

```json
{
  "id": 1,
  "name": "Bilal Tariq",
  "email": "bilal@example.com"
}
```

---

# GET /library/:slug

Authentication

```
Authorization: Bearer <token>
```

### Example

```
GET /library/9math-ch1
```

### Response

```json
{
    ...
}
```

---

# POST /communication

Authentication

```
Authorization: Bearer <token>
```

### Request

```json
{
  "referenceId": "9math-ch1",
  "message": "I don't understand question 4."
}
```

### Response

```json
{
    ...
}
```

---

# GET /communication/me

Authentication

```
Authorization: Bearer <token>
```

### Response

```json
[
    ...
]
```

---

# GET /communication/:id

Authentication

```
Authorization: Bearer <token>
```

### Example

```
GET /communication/15
```

---

# GET /page/:slug

### Example

```
GET /page/about
```

Returns HTML.

---

# GET /data/:name

### Example

```
GET /data/home-links
```

Returns JSON.

---

# GET /

Returns API information.

---

# GET /health

Returns server health.