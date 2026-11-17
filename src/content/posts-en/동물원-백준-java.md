---
title: "Zoo (Baekjoon, Java)"
description: "There are two main conditions. Lions cannot be placed adjacent to each other horizontally or vertically. Arrangements with no lions are included. 🥲 Incorrect approach: unable to think of a recurrence, I tried considering every possibility. I tried counting arrangements with 0 lions, 1 lion, up to n lions, but the array's…"
publishedAt: 2025-07-02
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: 3734ff27-90c3-45b2-acbc-b62a4bb47bf6
  url: https://velog.io/@lhs5427ll/%EB%8F%99%EB%AC%BC%EC%9B%90-%EB%B0%B1%EC%A4%80-Java
draft: false
---

![](/images/velog/동물원-백준-java-01.webp)

https://www.acmicpc.net/problem/1309

#### There are two main conditions.
- Lions cannot be placed adjacent to each other horizontally or vertically.
- Arrangements with no lions are included.

---

## 🥲 Incorrect approach

**I could not think of a recurrence**, so I tried to consider every possible case.

I tried counting arrangements with 0 lions, 1 lion, and so on up to n lions, but with a maximum array length of 100,000, this was **complicated and likely to exceed the time limit**.

A DP recurrence is needed to solve it within the time limit.

## ✅ Solving it with two-dimensional DP

Ultimately, there are **three possible lion arrangements** in a single line, so we can determine **which arrangements are possible in the current column** by checking **the previous column's arrangement**.

### 📝 Defining the states

**The lion enclosure is 2×N, and each column can have the following three states.**

| State | Left | Right | Meaning |
| --- | --- | --- | --- |
| 0 | X | X | No lions placed |
| 1 | O | X | A lion only on the left |
| 2 | X | O | A lion only on the right |

#### Here, X = empty, O = lion present

So we can declare an array as follows.
> 
dp[n][0] = No lions in column n
dp[n][1] = A lion only in the left cell of column n
dp[n][2] = A lion only in the right cell of column n

---

## ✅ Recurrence

### 1. No lions placed ( dp[n][0] )

If **no lions are placed** in column n

→ The previous column can have any arrangement.

Therefore

```
dp[n][0] = dp[n-1][0] + dp[n-1][1] + dp[n-1][2]

```

---

### 2. A lion placed on the left ( dp[n][1] )

If **a lion is placed on the left** in column n

→ There must not be a lion in the upper cell of the previous column.

So the previous column must have one of these states:

- Previous column [no lions] → dp[n-1][0]
- Previous column [lion only on the right] → dp[n-1][2]

Therefore

```
dp[n][1] = dp[n-1][0] + dp[n-1][2]

```

---

### 3. A lion placed on the right ( dp[n][2] )

Likewise, if **a lion is placed only in the lower cell** of column n

- Previous column [no lions] → dp[n-1][0]
- Previous column [lion only on the left] → dp[n-1][1]

Therefore

```
dp[n][2] = dp[n-1][0] + dp[n-1][1]

```

---

## ✅ Initial values

**The recurrence works only for sizes of 2 or greater, so initial values must be set for N = 1.**

Therefore

```
dp[1][0] = 1
dp[1][1] = 1
dp[1][2] = 1

```

---

## 💻 Source code

```java
import java.io.*;
import java.util.*;

public class Main {
    static boolean flag = false;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //StringTokenizer st = new StringTokenizer(br.readLine());
        int input = Integer.parseInt(br.readLine());
        if(input == 1){
            System.out.println("3");
            return;
        }
        int[][] dp = new int[input][3];
        // 0: X X
        // 1: O X
        // 3: X O
        // 0은 이전 경우의 수 모두 가능
        // 1, 2는 이전 경우의 수 두가지 가능
        dp[0][0] = 1;
        dp[0][1] = 1;
        dp[0][2] = 1;
        
        for(int i=1;i<input;i++){
            dp[i][0] = dp[i-1][0] + dp[i-1][1] + dp[i-1][2];
            dp[i][1] = dp[i-1][0] + dp[i-1][2];
            dp[i][2] = dp[i-1][0] + dp[i-1][1];
            dp[i][0] %= 9901;
            dp[i][1] %= 9901;
            dp[i][2] %= 9901;
        }
        
        System.out.println((dp[input-1][0] + dp[input-1][1] + dp[input-1][2]) % 9901);
    }
}
```

---
