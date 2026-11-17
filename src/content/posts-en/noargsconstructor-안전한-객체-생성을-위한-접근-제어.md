---
title: "@NoArgsConstructor: Access Control for Safe Object Creation"
description: "JPA needs a space of its own."
publishedAt: 2025-07-11
updatedAt: 2026-08-14
category: Development
tags: ["JPA","Spring"]
cover: /covers/velog/noargsconstructor-안전한-객체-생성을-위한-접근-제어-cover.webp
source:
  platform: Velog
  id: 5f1698cd-1cef-4e0a-9cdb-94a4756d5331
  url: https://velog.io/@lhs5427ll/NoArgsConstructor-%EC%97%90%EC%84%9C%EC%9D%98-PROTECTED-%EC%82%AC%EC%9A%A9
draft: false
---

## JPA entity creation

**`JPA` retrieves entities from the `DB`.**

**More precisely, it creates or reuses entity objects based on data retrieved from the DB.**

> **Does that mean JPA creates an instance every time it retrieves values from the DB?**

### The answer is **"no."**

Within a transaction, JPA stores the same entity in the `Persistence Context`. If it is already managing that entity, it **reuses it instead of creating a new one**.

---

### How JPA retrieves data from the DB

#### 1. Since it does not know the entity class at compile time, it creates an object through reflection
_Reflection: a feature that allows class information to be inspected and manipulated at runtime_
#### 2. JPA calls an empty constructor

<br>

#### 3. It injects DB values into each field

<br>

In other words, JPA **needs an empty (no-argument) constructor** that it can use after retrieving values from the DB.

``` java
protected Member() {
        ...
}
```

#### You can write an empty constructor yourself, as above,

`@NoArgsConstructor`

#### Or conveniently use an annotation.

> **However, the annotation's default access modifier can cause problems.**

---

## The access modifier of @NoArgsConstructor

The **default access modifier** of the `@NoArgsConstructor` annotation is **public**.

What **problem** could this cause?

An **empty constructor** is created to **allocate space** for JPA to use.

> **But what if the constructor is made public?**

#### External code can call `new Member()` with no values at all!
- An invalid entity could be created with missing required values or null values.

---

## How can we solve this?

Use `@NoArgsConstructor(access = AccessLevel.PROTECTED)`.

Setting the access modifier to `protected` prevents **invalid constructor calls** from outside and allows JPA to **safely inject** values retrieved from the DB through the empty constructor.

### ❌ @NoArgsConstructor

### ✅ @NoArgsConstructor(access = AccessLevel.PROTECTED)
