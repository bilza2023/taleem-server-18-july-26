# Library

Library management.

---

## list()

Returns all library items.

```js
const items = await kernel.library.list();
```

Returns:

```js
Library[]
```

---

## getById(id)

Returns a library item by id.

```js
const item = await kernel.library.getById(id);
```

Parameters

| Name | Type |
|------|------|
| id | Int |

Returns

```js
Library | null
```

---

## getBySlug(slug)

Returns a library item by slug.

```js
const item = await kernel.library.getBySlug(slug);
```

Parameters

| Name | Type |
|------|------|
| slug | String |

Returns

```js
Library | null
```

---

## create(admin, data)

Creates a library item.

```js
const item = await kernel.library.create(admin, data);
```

Parameters

| Name | Type |
|------|------|
| admin | Admin |
| data | Object |

Returns

```js
Library
```

---

## update(admin, id, data)

Updates a library item.

```js
const item = await kernel.library.update(admin, id, data);
```

Parameters

| Name | Type |
|------|------|
| admin | Admin |
| id | Int |
| data | Object |

Returns

```js
Library
```

---

## delete(admin, id)

Deletes a library item.

```js
await kernel.library.delete(admin, id);
```

Parameters

| Name | Type |
|------|------|
| admin | Admin |
| id | Int |

Returns

```js
Library
```