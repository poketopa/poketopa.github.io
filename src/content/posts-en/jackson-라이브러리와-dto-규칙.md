---
title: "The Jackson Library and DTO Rules"
description: "What is the Jackson library? A library for converting between Java and JSON. It is the converter chosen by Spring and is used as the standard. Converting Java to JSON is called serialization; the reverse is deserialization. The problem: while working on a project, in Request DTO code, the @AllArgsConstructor annotation…"
publishedAt: 2025-12-21
updatedAt: 2026-08-14
category: Development
tags: ["Java","Spring"]
cover: /covers/velog/jackson-라이브러리와-dto-규칙-cover.webp
source:
  platform: Velog
  id: f544c67c-ff91-4830-a617-1a3cb1d55cdf
  url: https://velog.io/@lhs5427ll/Jackson-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EC%99%80-DTO-%EA%B7%9C%EC%B9%99
draft: false
---

### What is the Jackson library?
A library for converting between Java and JSON.

It is the converter chosen by Spring and is used as the standard.

Converting Java to JSON is called serialization; the reverse is deserialization.

### The problem
While working on a project, I learned that when using @AllArgsConstructor in a Request DTO, it is customary to include @NoArgsConstructor too, creating an empty constructor.

This condition did not apply to Response DTOs, only to Response DTOs.

![](/images/velog/jackson-라이브러리와-dto-규칙-01.webp)

### Why
This is because of how Jackson converts JSON to Java: when transferring JSON data into Java, Jackson creates an empty object and then parses the data one field at a time. (It injects values into fields through reflection.)

So Request DTOs, which need to store JSON as Java objects, need an empty constructor for Jackson's parsing behavior.

Conversely, when parsing Java into JSON, Jackson only needs to read the Java object, so it works with just @Getter.

### Are there alternatives?
#### 1. No constructor-related annotations
Not every Request DTO needs @NoArgsConstructor.

If there are no constructor-related annotations such as @AllArgsConstructor, Java automatically creates a default constructor.
![](/images/velog/jackson-라이브러리와-dto-규칙-02.webp)

Therefore, if there is a constructor-related annotation, @NoArgsConstructor must also be added; otherwise, it can be omitted.

#### 2. Using immutable record objects
A record is an immutable object whose data does not change, so it cannot have a default constructor.

Therefore, Jackson handles records differently from ordinary classes: rather than injecting field values through reflection into an object created by an empty constructor, it reads the data from JSON and calls the all-arguments constructor (AllArgsConstructor), creating the object in one go.

For DTOs that only exchange data without modifying it, I think it is good to make active use of records.
