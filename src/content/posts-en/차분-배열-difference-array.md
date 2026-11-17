---
title: "Difference Array"
description: "Difference Array. An algorithmic technique for efficiently adding or subtracting values across a range of an array. I first learned about difference arrays while solving this problem. When the length is 100,000 and 100,000 assistants each cover the drill ground's length with soil…"
publishedAt: 2026-01-29
updatedAt: 2026-08-14
category: Development
cover: /covers/difference-array.jpg
tags: ["알고리즘"]
source:
  platform: Velog
  id: c4483991-5dc3-4934-a6bf-9545d672e084
  url: https://velog.io/@lhs5427ll/%EC%B0%A8%EB%B6%84-%EB%B0%B0%EC%97%B4-Difference-Array
draft: false
---

# Difference Array
> **An algorithmic technique for efficiently adding or subtracting values across a range of an array**

https://www.acmicpc.net/problem/19951
I first learned about difference arrays while solving this problem.

![](/images/velog/차분-배열-difference-array-01.webp)

In the problem, if the length is 100,000 and 100,000 assistants each cover the drill ground's length with soil, the time complexity grows and **the time limit is exceeded**.

## How it works

The difference array `difArr` applies each operation's value only at the **starting index** and **ending index** of the range to be updated.

This lets even operations covering a long range run in **O(1)** time.

```java
// i인덱스부터 j인덱스까지 +n 연산을 해야할 때

difArr[i] += n;
difArr[j + 1] -= n; 
```

Calculating the **prefix sum** of a difference array created this way produces an array reflecting the final result of all operations

## Example

Assume we have an array of length 5: `[0, 0, 0, 0, 0]`.

Perform these operations to build the difference array.

1. Add +5 to indices 1–3

2. Add -8 to indices 2–4

3. Add +3 to indices 0–2

## Process

### 1. Add +5 to indices 1–3
```java
difArr[1] += 5;
difArr[3 + 1] -= 5;
```
#### _Updated array: [0, 5, 0, 0, -5]_

### 2. Add -8 to indices 2–4
```java
difArr[2] += (-8);
difArr[4 + 1] -= (-8); // 이 경우는 인덱스를 넘어가므로 무시
```
#### _Updated array: [0, 5, -8, 0, -5]_

### 3. Add +3 to indices 0–2
```java
difArr[0] += 3;
difArr[2 + 1] -= 3;
```
#### _Updated array: [3, 5, -8, -3, -5]_

Calculating the prefix sum of the completed difference array produces the array after all operations.

## Prefix sum array: [3, 8, 0, -3, -8]

> **In conclusion, the difference array technique has an efficient time complexity of O(n + 2m) for an array of length n and m operations.**
