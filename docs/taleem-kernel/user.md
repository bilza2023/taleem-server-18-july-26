# User

User management and authentication.

---

## list()

Returns all users.

```js
const users = await kernel.user.list();
```

**Returns**

```ts
User[]
```

---

## getById(id)

Returns a user by id.

```js
const user = await kernel.user.getById(id);
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |

**Returns**

```ts
User | null
```

---

## getByEmail(email)

Returns a user by email.

```js
const user = await kernel.user.getByEmail(email);
```

**Parameters**

| Name | Type |
|------|------|
| email | String |

**Returns**

```ts
User | null
```

---

## register(data)

Creates a new user.

```js
const user = await kernel.user.register({
	email: "john@example.com",
	password: "12345678",
	name: "John"
});
```

**Parameters**

| Name | Type |
|------|------|
| data | Object |

**Returns**

```ts
User
```

---

## login(email, password)

Authenticates a user and returns a JWT.

```js
const token = await kernel.user.login(
	"john@example.com",
	"12345678"
);
```

**Parameters**

| Name | Type |
|------|------|
| email | String |
| password | String |

**Returns**

```ts
String
```

**Throws**

```text
User.login(): User '<email>' not found.
```

```text
User.login(): Invalid password.
```

---

## update(id, data)

Updates a user.

```js
const user = await kernel.user.update(id, {
	name: "John Smith"
});
```

If `password` is included, it is automatically hashed before being stored.

**Parameters**

| Name | Type |
|------|------|
| id | Int |
| data | Object |

**Returns**

```ts
User
```

---

## delete(id)

Deletes a user.

```js
await kernel.user.delete(id);
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |

**Returns**

```ts
User
```