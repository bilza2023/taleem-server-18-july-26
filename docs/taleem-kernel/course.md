# Course

Course management.

---

## list()

Returns all courses.

```js
const courses = await kernel.course.list();
```

**Returns**

```ts
Course[]
```

---

## getById(id)

Returns a course by its id.

```js
const course = await kernel.course.getById(id);
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |

**Returns**

```ts
Course | null
```

---

## getBySlug(slug)

Returns a course by its slug.

```js
const course = await kernel.course.getBySlug(slug);
```

**Parameters**

| Name | Type |
|------|------|
| slug | String |

**Returns**

```ts
Course | null
```

---

## create(data)

Creates a new course.

```js
const course = await kernel.course.create({
    slug: "course-public",
    title: "Public Course"
});
```

**Parameters**

| Name | Type |
|------|------|
| data | Object |

**Returns**

```ts
Course
```

---

## update(id, data)

Updates a course.

```js
const course = await kernel.course.update(id, {
    title: "Updated Course"
});
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |
| data | Object |

**Returns**

```ts
Course
```

---

## delete(id)

Deletes a course.

```js
await kernel.course.delete(id);
```

**Parameters**

| Name | Type |
|------|------|
| id | Int |

**Returns**

```ts
Course
```