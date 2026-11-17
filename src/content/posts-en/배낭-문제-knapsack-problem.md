---
title: "Knapsack Problem"
description: "Are people who are good at DP also good at packing suitcases?"
publishedAt: 2025-04-26
updatedAt: 2026-08-14
category: Development
tags: ["Java","알고리즘"]
cover: /covers/velog/배낭-문제-knapsack-problem-cover.webp
source:
  platform: Velog
  id: c437cd36-9f0f-408e-a4e4-f306f7382715
  url: https://velog.io/@lhs5427ll/%EB%B0%B0%EB%82%AD-%EB%AC%B8%EC%A0%9C-Knapsack-Problem
draft: false
---

# 🎒 Knapsack Problem

> An algorithm for finding the most efficient way to pack items into a knapsack with a weight limit
> 

I had tried several times to understand the knapsack problem and given up. Now that I finally understand it, I am writing this post.

I wrote the code with reference to the following problem.

🔗 [Baekjoon 12865 - Ordinary Knapsack](https://www.acmicpc.net/problem/12865)

---

## 📌 Knapsack problem conditions

- Each item has a **weight** and a **value**.
- The knapsack has a **maximum weight limit**.
- **Choose items to maximize the sum of their values.**

> A classic dynamic programming (DP) problem, frequently encountered in algorithm problem solving.
> 

---

## 🛠 Approach

### ✔️ Building the DP table

- `dp[i][j]`
    
    → **The maximum value** at **weight j**, **considering items up to item i**
    

| **i (item) \ w (weight)** | **0** | **1** | **2** | **3** |
| --- | --- | --- | --- | --- |
| 0 (no items) |  |  |  |  |
| 1 (considering through item 1) |  |  |  |  |
| 2 (considering through item 2) |  |  |  |  |

The DP table is created as above.

**The vertical axis indicates the item index up to which we consider selecting items; the horizontal axis indicates the weight capacity set for the bag.**

> 🧐 The goal is to find the maximum value under a weight limit, so why build a table considering capacities starting from 0?
> 

Here is a simple example.

- Total weight the bag can hold: 10kg
- Weight of the item I am considering: 4kg

Under these conditions, putting the item (4kg) into the bag leaves capacity for another 6kg.

We can then use the DP table's "maximum item value at a capacity of 6kg."

That may not quite click yet, but the example below should make it clear naturally.

---

### ✔️ State definition

- `i`: index of the item currently being considered
- `j`: maximum knapsack weight currently being considered

### ✔️ Recurrence

```java
if (weight[i] <= j) {
    dp[i][j] = Math.max(dp[i-1][j], value[i] + dp[i-1][j - weight[i]]);
} else {
    dp[i][j] = dp[i-1][j];
}

```

- `weight[i] <= j`
    
    → When the current item **can be included**,
    
    👉 Choose **the greater value** between excluding and including it
    
    
- `weight[i] > j`
    
    → When the current item **cannot be included**,
    
    👉 Simply **keep the previous best value**
    

---

# ✅ Example problem

- Maximum bag weight: **5kg**
- Three items:

| Number | Weight | Value |
| --- | --- | --- |
| 1 | 2kg | 3 |
| 2 | 3kg | 4 |
| 3 | 4kg | 5 |

---

## 1. Creating the DP table

| i (number of items) \ w (weight) | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 (0 items) |  |  |  |  |  |  |
| 1 (1 item) |  |  |  |  |  |  |
| 2 (2 items) |  |  |  |  |  |  |
| 3 (3 items) |  |  |  |  |  |  |

> The DP table's dimensions are one greater than the number of items and the maximum weight.
> 

Because we must consider zero items and a maximum bag weight of zero.

In other words, the case where the bag is completely empty.

Since the DP table updates the current index by referring to previous indices, it needs the case where nothing can be included.

---

## 2. Filling the DP table

Increase the indices to find the maximum value when considering through item i with capacity up to weight w.

There are two cases, depending on "whether a new item can fit within the current capacity."

- If the new item cannot fit, copy dp[i-1][w] unchanged.
- If the new item can fit, choose the greater value between including and excluding it.

| i\w | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 3 | 3 | 3 | 3 |

First, the row where i == 0 receives zeros because no items can be included.

Likewise, in the column where w == 0, no items fit because the bag's capacity is zero.

The first value appears at [1,2].

Item 1 weighs 2kg, so it first becomes possible to put it in the bag when the w index is 2 (capacity 2kg).

---

### "When the new item i can fit"

| i\w | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 3 | 3 | 3 | 3 |
| 2 | 0 | 0 | 3 |  |  |  |

At [2,3], we can consider item 2. Since it weighs 3kg, it fits starting at w=3.

- Excluding item 2: dp[1][3] → **3**
- Including item 2: value[2] → **4**

👉 Including item 2 gives a greater value, so we include it.

---

### Considering the remaining space

| i\w | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 3 | 3 | 3 | 3 |
| 2 | 0 | 0 | 3 | 4 | 4 |  |

We need to fill dp[2][5].

Putting in item 2 (3kg, value 4) leaves 2kg of capacity.

For that remaining 2kg, we must refer to dp[1][2]. (Considering through i-1)

- Excluding item 2: dp[1][5] → **3**
- Including item 2: value[2] + dp[1][2] → 4 + 3 = **7**

👉 Since 7 is greater, include it.

---

**The final table is as follows:**

| i\w | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 3 | 3 | 3 | 3 |
| 2 | 0 | 0 | 3 | 4 | 4 | 7 |
| 3 | 0 | 0 | 3 | 4 | 5 | 7 |

---

## 🖥️ Solution code (Java)

```java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int input = Integer.parseInt(st.nextToken());  // 물건 개수
        int limit = Integer.parseInt(st.nextToken());  // 배낭 최대 무게

        int[] weight = new int[input + 1];  // 물건 무게
        int[] value = new int[input + 1];   // 물건 가치

        for(int i = 1; i <= input; i++){
            StringTokenizer st2 = new StringTokenizer(br.readLine());
            weight[i] = Integer.parseInt(st2.nextToken());
            value[i] = Integer.parseInt(st2.nextToken());
        }

        int[][] dp = new int[input + 1][limit + 1];
        // dp[i][j] = i번째 물건까지 고려했을 때, 무게 j를 채웠을 때의 최대 가치

        for(int i = 0; i < dp.length; i++){
            for(int j = 0; j < dp[0].length; j++){
                if(i == 0 || j == 0) continue;

                if(weight[i] <= j){
                    dp[i][j] = Math.max(
                        dp[i-1][j],
                        value[i] + dp[i-1][j - weight[i]]
                    );
                } else {
                    dp[i][j] = dp[i-1][j];
                }
            }
        }

        System.out.println(dp[input][limit]);
    }
}

```

---

## ⏰ Time complexity

- Nested for loops → **O(N * K)**
    
    (N: number of items, K: maximum weight limit)
    
- Also requires memory for `dp[N+1][K+1]`

> ⚠️ Watch for memory limits when N and K become large!
>
