---
title: "Using Static Nested Classes"
description: "This is DTO code I wrote in an earlier project. I declared the nested UserInfo and ImageInfo classes as non-static, then received a comment asking me to make them static. Since an object can be created through the outer class without static, I looked into why static was needed…"
publishedAt: 2025-12-26
updatedAt: 2026-08-14
category: Development
tags: ["Java"]
cover: /covers/velog/static-내부-클래스의-사용-cover.webp
source:
  platform: Velog
  id: b01ca86f-04b8-4d7b-a9be-a71e883087d2
  url: https://velog.io/@lhs5427ll/static-%EB%82%B4%EB%B6%80-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%82%AC%EC%9A%A9
draft: false
---

![](/images/velog/static-내부-클래스의-사용-01.webp)
This is DTO code I wrote in an earlier project.

I declared the nested `UserInfo` and `ImageInfo` classes as `non-static`, then received a comment asking me to change them to `static`.

Since I could create objects through the outer class without `static`, I was curious why the classes needed `static` and looked into the reasons.

### 1. Creation without an outer-class instance
The first reason is convenience and clarity.

With `static`, we can create an instance directly without creating an outer-class object first.

```java
// Non-static
new OuterClass().new InnerClass() <- 가독성 떨어짐!!

// static
new OuterClass.InnerClass()
```

The more I study, the more I realize how important clarity and readability are.

### 2. Preventing memory leaks (important)
#### This is the most important reason.

When a nested class without `static` is instantiated, it holds a reference to the outer-class instance.
> 
**While the inner class is in use, the garbage collector does not reclaim the outer class, leaving its memory allocated.**

**In large projects, these problems can accumulate and cause out-of-memory errors, so managing `static` is essential for classes that do not depend on outer-class values.**

### 3. Logical grouping and encapsulation
This is also about readability and structure.

**Question: If `static` makes it an independent class, how is that different from creating a new class?**

#### Answer
**1. Expressing strong coupling**
- Express in code that a structure is used specifically within a particular API
- Limit the scope of data

**2. Managing the number of class files**
- The more small DTOs there are, the harder file management becomes.
- Group related things to make the code easier to understand

**3. Preventing naming collisions**
- `UserProfile.ImageInfo` and `Post.ImageInfo` have the same name but different outer classes, so they are treated as different objects, preventing collisions.
