# Pages System Design

## Purpose

The **Pages** system is intended for a small collection of permanent website pages that describe the platform itself rather than its educational content.

Examples include:

* About
* Mission
* Contact
* Privacy Policy
* Terms of Service
* Teaching Philosophy

These pages are considered part of the application's source rather than user-managed content.

---

# Design Principles

## 1. Pages are file-based

Pages are stored as files under:

```
content/pages/
```

The content is version-controlled with the application's source code.

This makes changes easy to review, track, and deploy through Git.

---

## 2. Pages are rendered using a common template

Individual page files contain only their content.

A shared template provides:

* HTML document structure
* Header
* Footer
* Navigation
* Branding
* Metadata
* Shared CSS
* Shared JavaScript

This keeps every page visually consistent while avoiding duplicated HTML.

---

## 3. Shared assets

Pages use common assets stored under:

```
content/css/
content/js/
content/images/
```

These assets exist only to support the Pages system.

Examples include:

* pages.css
* pages.js
* logo
* favicon

---

## 4. No database

Pages are intentionally **not** stored in the database.

Reasons:

* They rarely change.
* They do not require an admin interface.
* They are part of the application rather than educational content.
* Version control is preferable to database editing.
* They should remain available independently of the database.

---

## 5. No page index

The project intentionally does **not** maintain a page index table or JSON manifest.

Reasons:

* There are very few pages.
* Pages are mostly permanent.
* Navigation can be maintained manually.
* If multiple related pages exist, a manually written index page is sufficient.

The simplicity outweighs the benefits of automatic indexing.

---

## 6. No course association

Pages are never associated with courses.

If content belongs to a course, it belongs in the **Library**, not the Pages system.

This rule keeps responsibilities clear.

---

# Relationship to the Library

The Pages system and the Library solve different problems.

## Pages

* Static
* Platform information
* File-based
* Version controlled
* Rarely updated
* Public
* No subscriptions
* No discussions
* No search/indexing requirements

Examples:

* About
* Contact
* Mission
* Privacy

---

## Library

* Educational content
* Database-backed
* Admin managed
* Searchable
* Can belong to courses
* May require authentication or subscriptions
* Can support discussions and future features

Examples:

* Articles
* Lessons
* Decks
* Quizzes
* Course introductions
* Study guides

---

# Guiding Rule

A simple question determines where new content belongs:

> **Is this describing the platform, or is this educational content?**

If it describes the platform, it belongs in **Pages**.

If it teaches something or belongs to a course, it belongs in the **Library**.

This distinction keeps both systems simple and avoids unnecessary overlap.
