---
title: "[Java] Why Use int When Integer Exists? / About Wrapper Classes"
description: "Let's LEARN about wrapper classes."
publishedAt: 2025-04-18
updatedAt: 2026-08-14
category: Development
tags: ["Java"]
cover: /covers/velog/java-integer가-있는데-int를-왜-쓰나요-래퍼-클래스-wrapper-class-에-대하여-cover.webp
source:
  platform: Velog
  id: 7003bec0-8481-4c70-9184-48f8bf092358
  url: https://velog.io/@lhs5427ll/Java-Integer%EC%9D%B4-%EC%9E%88%EB%8A%94%EB%8D%B0-int%EB%A5%BC-%EC%99%9C-%EC%93%B0%EB%82%98%EC%9A%94-eku8ng03
draft: false
---

# **✍️ Introduction**

**One question always bothered me while studying algorithms.**

> Why does the `int` type exist?

`Integer` has all sorts of functionality, is easy to convert between types, and can even hold `null`

So why should we use `int`? Why are the two separate?

#### Let me put together the answer to that question.
<br>

# ✅ What are int and Integer, and how are they different?

Java has **two types** for representing integers:

`int` and `Integer`.

So while learning Java, I wondered:

> "Why do we need two types just to store numbers?"

At first I brushed it off, thinking, "`Integer` must just be the fancier type~"

But I learned that **their meaning, storage, and behavior are completely different**.

---

### 🔹 `int` is a primitive type

`int` is one of Java's **built-in data types**.

It is one of the eight primitive types,

And literally stores "the number itself."

```java
int a = 10;

```

- Here, `a` **stores the value itself**, the number 10.
- The number `10` goes directly into the stack area of memory
- **Cannot have a null value**

---

### 🔸 `Integer` is a reference type—in other words, an object

By contrast, `Integer` is a **class**.

It is a **wrapper class** named `java.lang.Integer`,

And internally has a field called `int value`.

```java
Integer b = 10;
```

- This creates **an Integer object**, rather than an `int`, and places 10 inside it
- In memory, the stack contains **the object's address**, while the heap contains **the actual Integer object**
- Can store `null` (`Integer b = null;`)

---

## ✨ Summary

| Aspect | int | Integer |
| --- | --- | --- |
| Type | Primitive | Reference |
| Storage | Value stored directly on the stack | Address on the stack, object on the heap |
| Allows null | ❌ No | ✅ Yes |
| Provides methods | ❌ None | ✅ `.compareTo()`, `.toString()`, etc. |
| Use in collections | ❌ No (List<int> is impossible) | ✅ Yes (List<Integer>) |

---

# ✨ When is int better than Integer?

### 1. 🔥 **Repeated operations where performance matters**

```java
int sum = 0;
for (int i = 0; i < 1_000_000; i++) {
    sum += i;
}
```

What if we change this code to use `Integer`?

```java
Integer sum = 0;
for (int i = 0; i < 1_000_000; i++) {
    sum += i;  // 오토언박싱 + 덧셈 + 오토박싱 반복
}
```

> 🚨 Because int → Integer and Integer → int conversions keep happening internally,
> 
> 
> The burden of **object creation + GC (Garbage Collector)** is large.
> 

---

### 2. 💡 **When null must never be allowed**

- Since `int` is primitive, **null itself cannot be assigned**
- Since `Integer` is a reference type, **a null reference can cause an NPE (Null Pointer Exception)**

> So it is safer to declare a field that "must never contain null" as int.
> 

---

### 3. ✏️ **When you only need simple math**

- The operators `+`, , , `/` apply directly to `int`
- `Integer` must be unboxed internally before calculation

```java
int result = (a + b) * c;
```

With `Integer`, the value is ultimately extracted internally through `intValue()` for calculation

And then wrapped in `Integer` again. → **Overhead**

---

### 4. 🧼 **When you need to reduce memory usage**

- `int` is 4 bytes (32 bits)
- Since `Integer` is an object, it has **additional internal memory structures** (object headers, etc.)

```java
int[] arr = new int[1000000];         // 4MB
Integer[] arr = new Integer[1000000]; // 최소 16MB 이상 (객체 100만 개)

```

---

# ✅ What are boxing, unboxing, and autoboxing?

We established above that `int` is a value and `Integer` is an object.

These two types may be converted automatically or manually

This is called **boxing** and **unboxing**.

When this **happens automatically**, it is called **autoboxing**.

---

## 🟦 Boxing

> Converting a primitive type → a reference type
> 

In other words, wrapping an `int` in an `Integer`.

```java
int a = 10;
Integer b = Integer.valueOf(a); // 박싱 (수동)

```

- Wrapped the `int` value 10 in an `Integer` object.
- Internally, **`Integer.valueOf(a)`* is used instead of `new Integer(a)`.

---

## 🟨 Unboxing

> Converting a reference type → a primitive type
> 

In other words, extracting an `int` from an `Integer` again.

```java
Integer a = Integer.valueOf(10);
int b = a.intValue(); // 언박싱 (수동)

```

- Extracts the int value inside the `Integer`.
- Uses a method such as `.intValue()`.

---

## 🟩 Autoboxing / autounboxing

> Java's feature for handling boxing/unboxing automatically
> 

```java
int a = 10;
Integer b = a;       // 오토박싱

Integer c = 20;
int d = c;           // 오토언박싱

```

- `a` is automatically wrapped through `Integer.valueOf(a)`
- `c` is automatically extracted through `c.intValue()`
- Used extremely often because **the Java compiler does it automatically**

---

## ⚠️ Autoboxing caveats

**Autoboxing is convenient, but it has a cost.**

```java
List<Integer> list = new ArrayList<>();
for (int i = 0; i < 1000000; i++) {
    list.add(i); // 오토박싱 100만 번 발생
}
```

- This code creates one million objects by converting `int` → `Integer`.
- In other words, **it can affect memory and performance**

So for loops and extensive calculations, **using primitive `int` is much more efficient**.

# ✅ Comparison operators and caching with objects

I learned that comparing Integers with the == comparison operator can produce incorrect results.

```java
Integer a = 100;
Integer b = 100;
System.out.println(a == b);       // true?

Integer c = 200;
Integer d = 200;
System.out.println(c == d);       // false?

```

Assigning `100` to `Integer` and comparing returns `true`, but assigning `200` may return `false`.

**Why?**

---

## 🧊 Java caches Integers from -128 to 127

This is Java's **performance optimization strategy**.

When `Integer.valueOf(int)` is called,

Java **reuses pre-created objects** for values from -128 to 127.

```java
Integer a = 100;
Integer b = 100;
// 같은 객체를 참조함 → a == b → true

```

```java
Integer c = 200;
Integer d = 200;
// 서로 다른 객체를 새로 생성 → c == d → false

```

This is called the **Integer cache**.

---

### 🔍 How it works internally

```java
public static Integer valueOf(int i) {
    if (i >= -128 && i <= 127)
        return IntegerCache.cache[i + 128];
    else
        return new Integer(i);
}

```

In other words, values within the cache range use the same object,

While values outside it create new objects.

---

## ❗ Should we use == or equals?

- `==` **compares whether the objects are the same** (address comparison)
- `.equals()` **compares whether the values are the same**.

```java
Integer a = 128;
Integer b = 128;

System.out.println(a == b);       // false ❌
System.out.println(a.equals(b));  // true ✅

```

- `a == b` → false because they are different objects
- `a.equals(b)` → true because their internal values are equal

---

# 🌟 Reflection
>I thought I knew Java well from studying algorithms, but it seems I really did not.
>I should study Java's principles, design philosophy, memory management, and more.
