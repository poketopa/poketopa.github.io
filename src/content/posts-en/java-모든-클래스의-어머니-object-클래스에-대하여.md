---
title: "[Java] 🌳 About Object, the Mother of All Classes"
description: "Do Java classes form a tree? Questions and answers about Object and Java's class structure"
publishedAt: 2025-04-16
updatedAt: 2026-08-14
category: Development
tags: ["Java"]
cover: /covers/velog/java-모든-클래스의-어머니-object-클래스에-대하여-cover.webp
source:
  platform: Velog
  id: b613d280-2c3b-44bd-8172-122042d0653c
  url: https://velog.io/@lhs5427ll/Java-%EB%AA%A8%EB%93%A0-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%96%B4%EB%A8%B8%EB%8B%88-Object-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC
draft: false
---

### 🐣 It began with a simple question

While working on a Spring project, I used a class called `SimpleJdbcInsert`,

And seeing it stored in Object made me wonder:

> **What is Object, that it can hold all kinds of things..?**

That curiosity led me to study Object. I am writing this to record the questions and answers that arose along the way.

---

## 🧱 `Object` is the parent of every class

First, I learned that Object is the parent of every class, so it can hold basic data types such as Integer, Double, and String.

### 🧐 Then isn't it just like Python?

> Python is a dynamically typed language.

So a variable can hold any type, and the type is determined automatically.

> But Java is a statically typed language.

So an Object variable can hold any object, but you must cast it back to its original type when retrieving it.

```
String name = (String) o; // ✅ 형변환
System.out.println(name.length()); // OK
```

---

## 💁‍♂️ I get that, but how can a Spring class fit into Object too?

I thought libraries imported from outside contained classes managed separately from existing Java classes.

So I could not understand how a Spring class could be put in Object.

It felt like putting "ABC" into an int variable, I guess?

### ✅ External classes are children of `Object` too

> **Every class written in Java inherits from Object.**
>

Whether it is Spring or a class I wrote, if it is a Java class, it sits on the `Object` tree.

Object is the topmost Java class, and other classes **inherit** as its subclasses.
![](/images/velog/java-모든-클래스의-어머니-object-클래스에-대하여-01.webp)

---

```
public final class Integer extends Number {
    ...
}
```
In other words, every class has a class it inherits from, as in the code above, but that declaration is omitted.

So the moment you create a class in Java, it is already a child of `Object`.

---

### 📌 My realization:

> “Importing an external library does not bring in a new tree,
> 
> 
> It attaches a new **branch** to Java's existing class tree.”
> 
---

---

### ✅ Wrapping up

- Java classes form a **tree structure**.
- The root (topmost class) of that tree is **`Object`**
- `extends` indicates inheritance between classes; when omitted, the class automatically inherits from `Object`
- External library classes are Java classes too, so naturally they are children of `Object`
- The `Object` type can hold any object (but a cast is needed when using it)

---

### 🔥 What I learned in one sentence

> "Creating a class in Java ultimately means adding one more branch to the huge tree called Object."
>
