---
title: "The Risks of Using @Setter at the Class Level"
description: "Everything happens for a reason."
publishedAt: 2025-07-11
updatedAt: 2026-08-14
category: Development
tags: ["JPA","Spring"]
cover: /covers/velog/클래스-레벨-setter-사용의-위험성-cover.webp
source:
  platform: Velog
  id: 41e59b27-fb86-4b88-941f-c6817f4a2b0a
  url: https://velog.io/@lhs5427ll/%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%A0%88%EB%B2%A8-Setter-%EC%82%AC%EC%9A%A9%EC%9D%98-%EC%9C%84%ED%97%98%EC%84%B1
draft: false
---

### The risks of using @Setter at the class level

Using the @Setter annotation at the class level in a project using JPA can cause problems when considering how the **Persistence Context ** and **Dirty Checking** mechanisms work.

---

## Understanding the persistence context and dirty checking

The persistence context is the central space where JPA **manages entity lifecycles**, **guarantees identity**, and provides **transactional write-behind and dirty checking**.

> **Put simply, it acts as a bridge between the DB and entity code.**

Of these, **Dirty Checking** is a core feature of the persistence context.

When an entity is in the **persistent state**, managed by JPA, changes to the entity object's state are detected, and at transaction commit the changes are collected and **SQL queries (update)** are sent together.

#### For example
``` java
member.setName("홍길동");
```

If an entity's value is changed with a setter as above, JPA behaves as follows.

> **The name field has changed, so I should send a query to the DB when the transaction ends!**

``` sql
update member
set name = '홍길동'
where id = 1
```

An update query is generated automatically as shown above.

---

## What is the problem?

Automatically generating queries through JPA's dirty checking can lead to the following problems.

#### - Difficulty tracing changes:
Queries triggered by @Setter do not reveal the intent behind **"who"** changed a value or **"why"**.

#### - Potential for unintended queries:
Queries **the developer did not intend** may be generated and sent to the database.

#### - Difficulty maintaining and extending the code:
Without clearly defined **points of change (methods) in the entity**, maintainability suffers and extending it for new requirements can become harder.

---

## What should we do, then?

> **Avoid class-level @Setter and write methods directly in the entity that express the intent of the change!**

``` java
public void changeName(String newName) {
        if (newName == null || newName.trim().isEmpty()) {
            throw new IllegalArgumentException("이름은 비어있을 수 없습니다.");
        }
        this.name = newName;
    }
```

Explicitly define **methods responsible for changing data**, as above.

### What are the benefits?

#### - Improved code readability
#### - Clear reasons for changes
#### - Easier maintenance by making entities domain objects that include behavior
