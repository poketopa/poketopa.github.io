---
title: "[Java] Reflection"
description: "Surely a carefully built private cannot fall?"
publishedAt: 2025-07-13
updatedAt: 2026-08-14
category: Development
tags: ["Java"]
cover: /covers/velog/java-리플렉션-reflection-cover.webp
source:
  platform: Velog
  id: 54e80053-d4d9-4b73-8742-f38c2573c445
  url: https://velog.io/@lhs5427ll/Java-%EB%A6%AC%ED%94%8C%EB%A0%89%EC%85%98-Reflection
draft: false
---
# Reflection

## What is reflection?

Let's start with the definition.

> A feature that allows information (metadata) about objects or classes to be inspected and manipulated dynamically while a program is running.

Reflection lets us examine class information and work with objects at **runtime**, rather than compile time.

In other words, even if we do not know which class will be used when writing the code, it lets us find and load a class while the program runs, access its fields, and invoke its methods.

Information about classes written in code is loaded into JVM memory. **It may be easier to understand reflection as reading or modifying this information in memory.**

---

## We can inspect and modify fields in ordinary code, so why use reflection?

Because reflection can access and modify even **private** or **final** fields or methods.

Since reflection accesses them through JVM memory, it can access private fields from outside the class. **There are technically ways to modify final fields, too, but they are restricted depending on the Java version and are not recommended.**

These characteristics make reflection **a very powerful but dangerous feature.**

---

## Where is reflection used?

Reflection is mainly used in **frameworks** and **libraries**. Some representative examples follow.

### 1. Spring

When managing beans and injecting dependencies, Spring sometimes needs to access private fields and constructors.
It uses reflection to inspect the class structure and inject values into fields.

```java
Field field = clazz.getDeclaredField("myService");
field.setAccessible(true);
field.set(beanInstance, serviceInstance);
```

### 2. ORM tools such as JPA and Hibernate

They use reflection to read entity field names and map them to SQL.

Also, because the framework needs to create Entity instances through reflection, Entity classes often have **protected constructors** to prevent outside code from creating objects directly.

This is **a design for giving the framework control over object creation.**

---

## Should ordinary application developers avoid reflection?

> There is nothing stopping you, but avoiding it whenever possible is recommended.
>

It has the following drawbacks.

### 1. Reduced performance

- Slower than calling a method directly.

### 2. Loss of type safety

- An incorrect field or method name causes a runtime error.

### 3. Broken encapsulation

- Since private fields and methods intended for encapsulation can be accessed by bypassing their restrictions, encapsulation loses its meaning.

---

## Closing thoughts

#### I thought private, final, and the like existed to make programs safe. Seeing reflection made me realize they exist for “safe development by imperfect developers,” rather than for “safe programs.”

This is a brief reflection overview I wrote while studying the difference between constructor access restrictions in Entities and DTOs, so it may be incomplete.

I should study it in more depth.
