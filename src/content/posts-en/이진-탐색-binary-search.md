---
title: "Binary Search"
description: "🚀 Binary Search. An algorithm for quickly finding a particular value in a sorted array by repeatedly halving the search range. 📌 Binary search concepts: usable only on sorted arrays; quickly finds values by halving the search range; time complexity: O"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: 9c90f428-fee4-4ad8-9112-fb6f9efb9fc5
  url: https://velog.io/@lhs5427ll/%EC%9D%B4%EC%A7%84-%ED%83%90%EC%83%89-Binary-Search
draft: false
cover: /covers/binary-search.jpg
---

# 🚀 Binary Search

> An algorithm for quickly finding a particular value in a sorted array by repeatedly halving the search range.

## 📌 Binary search concepts
- Usable only on sorted arrays

- Quickly finds values by halving the search range

- Time complexity: O(log N) → very efficient!

#### Requirement: the data must be sorted

## 🛠 Search process

1. Set the left index (left) / initially the start of the array (index 0)

2. Set the right index (right) / initially the last index of the array

3. Set the middle index (min) / update it to (left + right) / 2

#### Check the middle value of the range, and if it is greater or smaller than the target, set right or left to mid.

## 🖥️ Example: searching for 34

![](/images/velog/이진-탐색-binary-search-01.webp)

**1. Check the middle value of the entire range. **

Here, the value we want is 34 and the value at mid is 27, so the current middle value is smaller than the target.

We therefore need to narrow the range to the right.

Update left = mid + 1 and mid = (left + right) / 2.

**2. The next middle value is 38. The target is 34, which is smaller than the middle value, so narrow the range to the left. Update right = mid - 1 and mid = (left + right) / 2.**

**3. The middle value is 30, so narrow the range to the right.**

**4. Now left, mid, and right are set to the same index. The current middle value matches the target, so we have found the index where the target is located.**

In this way, binary search can quickly find a target index in a sorted array with few calculations.

Because it sets the new range one index above or below the previous mid, as in right = mid - 1 or left = mid + 1, it can also be used when the target value is absent from the array.
(For example, when checking the target's rank in the array and changing a value)

With the loop condition set to left <= right, we can determine the target's rank even if no equal value exists in the array.

![](/images/velog/이진-탐색-binary-search-02.webp)
#### For example, suppose the target is 36 in the situation above.

The middle value is 34, but the target is 36, so we need to narrow the search range to the right.

With left, mid, and right currently at the same index, updating left = mid + 1 places left to the right of right.

The loop condition left <= right now returns false, meaning we have reached the closest index to the target that can be found in the array.

We can therefore assign 36 at the current left index (current value: 38).

## ⏰ Time complexity

Let us compare binary search with the time needed to compare array elements using a for loop.

Consider the worst case, with the target at the last index of the array.

![](/images/velog/이진-탐색-binary-search-03.webp)

Linear search requires as many operations as the array's length, while binary search has O(log N) time complexity.

Because it repeatedly splits the array in half,

it keeps dividing the array's length N by 2 until it reaches 1, giving it log N time complexity.

## Code (Java)
```
for(int i=0;i<dp.length;i++){
            for(int j=0;j<i;j++){
                if(arr[j]<arr[i]){
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
```
