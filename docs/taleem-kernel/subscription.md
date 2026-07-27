# Subscription

Subscription management.

---

## list()

Returns all subscriptions.

```js
const subscriptions = await kernel.subscription.list();
```

**Returns**

```ts
Subscription[]
```

---

## getById(id)

Returns a subscription by id.

```js
const subscription = await kernel.subscription.getById(id);
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |

**Returns**

```ts
Subscription | null
```

---

## create(data)

Creates a new subscription.

```js
const subscription = await kernel.subscription.create({
	userId: 1,
	courseId: 2
});
```

**Parameters**

| Name | Type |
|------|------|
| data | Object |

**Returns**

```ts
Subscription
```

---

## update(id, data)

Updates a subscription.

```js
const subscription = await kernel.subscription.update(id, {
	endsAt: new Date()
});
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |
| data | Object |

**Returns**

```ts
Subscription
```

---

## delete(id)

Deletes a subscription.

```js
await kernel.subscription.delete(id);
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |

**Returns**

```ts
Subscription
```

---

## listByUser(userId)

Returns all subscriptions for a user.

```js
const subscriptions =
	await kernel.subscription.listByUser(userId);
```

**Parameters**

| Name | Type |
|------|------|
| userId | Int |

**Returns**

```ts
Subscription[]
```

---

## listByCourse(courseId)

Returns all subscriptions for a course.

```js
const subscriptions =
	await kernel.subscription.listByCourse(courseId);
```

**Parameters**

| Name | Type |
|------|------|
| courseId | Int |

**Returns**

```ts
Subscription[]
```