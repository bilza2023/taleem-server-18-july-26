# Communication

Communication management.

---

## list()

Returns all communications.

```js
const communications =
	await kernel.communication.list();
```

**Returns**

```ts
Communication[]
```

---

## get(id)

Returns a communication by id.

```js
const communication =
	await kernel.communication.get(id);
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |

**Returns**

```ts
Communication | null
```

---

## listByReference(referenceId)

Returns all communications for a reference.

```js
const communications =
	await kernel.communication.listByReference(referenceId);
```

**Parameters**

| Name | Type |
|------|------|
| referenceId | String |

**Returns**

```ts
Communication[]
```

---

## create(data)

Creates a new communication.

```js
const communication =
	await kernel.communication.create({
	authorId: 1,
	referenceId: "library-item",
	message: "Hello!"
});
```

**Parameters**

| Name | Type |
|------|------|
| data | Object |

**Returns**

```ts
Communication
```

---

## update(id, data)

Updates a communication.

```js
const communication =
	await kernel.communication.update(id, {
	message: "Updated message"
});
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |
| data | Object |

**Returns**

```ts
Communication
```

---

## delete(id)

Deletes a communication.

```js
await kernel.communication.delete(id);
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |

**Returns**

```ts
Communication
```