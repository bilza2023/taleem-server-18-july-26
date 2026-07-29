These complete the website.

### Login page (`+page(41).svelte`)

```text
POST /user/login
```

---

### Register page (`+page(42).svelte`)

```text
POST /user/register
```

---

# Final Website API Surface

### Public

```text
GET  /public/library
GET  /public/course
GET  /public/course/:slug
GET  /public/course/:slug/list
GET  /library/:slug
```

### Authentication

```text
POST /user/login
POST /user/register
```

### Authenticated

```text
GET  /communication/me
```

This is impressively small—your public website is essentially powered by **8 endpoints**. Everything else (admin, subscriptions, communications, etc.) belongs to the admin/back-office or reusable components rather than the website itself.
