I think this is worth marking because it's a genuine architectural pattern, not just an implementation detail.

# Taleem Utility Platform Architecture v1

## Philosophy

A utility is **not an application**.

* No framework
* No router
* No SPA
* No build step
* Just independent HTML pages sharing the same SDK.

---

## 1. Connection Helper

Every page begins with:

```javascript
const taleem =
    await getTaleemConnection();
```

Responsibilities:

* Read connection information from `localStorage`
* Create `TaleemAdminClient`
* Perform login/verification
* Return a connected client
* Return `null` if connection cannot be established

The helper owns **connection restoration**.

---

## 2. Login Toolbar

If

```javascript
getTaleemConnection()
```

returns `null`

the page simply does

```javascript
showLoginToolbar();
```

Responsibilities:

* Ask for

```
Server
Email
Password
```

* Store them in `localStorage`
* Refresh the page

Nothing more.

---

## 3. Independent Pages

Every HTML page is independent.

```
index.html
new.html
edit.html
```

Each page does

```javascript
const taleem =
    await getTaleemConnection();
```

and immediately performs its own work.

Examples:

```javascript
index.html
```

```javascript
taleem.library.list();
```

```javascript
new.html
```

```javascript
taleem.library.create(...);
```

```javascript
edit.html
```

```javascript
taleem.library.read(...);

taleem.library.update(...);
```

No page depends on another page.

No shared runtime.

No SPA.

---

## 4. SDK Responsibilities

The SDK owns

* authentication
* token handling
* verification
* HTTP
* API objects

Utilities never touch tokens directly.

---

## 5. Utility Responsibilities

Utilities own only

* HTML
* Forms
* Navigation
* Calling SDK methods

Nothing else.

---

## Result

```
HTML Page
      │
      ▼
getTaleemConnection()
      │
      ▼
TaleemAdminClient
      │
      ▼
Taleem Server
```

Every page creates **its own client instance**, establishes **its own authenticated connection**, and then works independently. The only shared state is the connection information stored in `localStorage`.

I think this is an excellent foundation for the entire Taleem utility platform. Every future utility—Library, Course, Subscription, Communication, Admin—can follow exactly the same pattern with almost no additional infrastructure.
