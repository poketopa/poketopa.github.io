---
title: "Longest Increasing Subsequence 2 (Baekjoon, Java)"
description: "The problem is simple. We need to find the length (the number of elements) of the longest increasing subsequence in a sequence. A simple recurrence can be written using DP. 💡 Idea: check each index…"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: c8e2071f-fc50-4d39-a444-fa7ee4ed445b
  url: https://velog.io/@lhs5427ll/Temp-Title
draft: false
---

https://www.acmicpc.net/problem/12015

![](/images/velog/가장-긴-증가하는-부분-수열-2-백준-java-01.webp)

The problem is simple.

We need to find the length (the number of elements) of the longest increasing subsequence in a sequence.

A simple recurrence can be written using DP.

## 💡 Idea

**Check each index, and if its value is greater than a previous index's value, add 1 to the dp value at that previous index**

```
dp[i] = Math.max(dp[i], dp[j] + 1);

for(int i=0;i<dp.length;i++){
            for(int j=0;j<i;j++){
                if(arr[j]<arr[i]){
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
```
However, the array can contain up to 1,000,000 elements, so a nested for loop **exceeds the time limit**.

- (In coding tests, over a billion operations usually exceeds the time limit. For sizes of 100,000 or more, nested for loops take 100,000 x 100,000 = one billion operations and exceed the time limit)

So we need a more efficient approach

For example

Imagine an array **{10, 20, 30, 15, 20, 30, 50, 40, 45 ,60}**.

The longest subsequence here is

**{10, 15, 20, 30, 40, 45, 60} **.

After first checking 10, 20, and 30, we have the sequence {10, 20, 30}. But when we check the next value, 15, we get both {10, 20, 30} and {10, 15}. We need an idea for exploring the next index while keeping both sequences as candidates.

If we first think of exploring the next indices in parallel

**{10, 20, 30, 50, 60}**

**{10, 15, 20, 30, 50} **

**{10, 15, 20, 30, 40, 45, 60} **

We can get multiple candidates like these.

​

The idea is to combine these parallel candidates into a single array.

The first index is 10 in all of them. At the next index, we have 20 and 15. Overwrite that index with the smaller element. Continuing in the same way gives

​

{10}

{10, 20} // Append because the new value (20) is greater than the last element (10)

{10, 20, 30} // Append because the new value (30) is greater than the last element (20)

{10, 15, 30}

Here, the new value (15) is smaller than the last element (30), so replace the appropriate position in the array (20 -> 15)

This leaves the current sequence holding both {10, 20, 30} and {10, 15} in parallel.

If a larger value arrives afterward, it is treated as being appended to {10, 20, 30}; if a smaller one arrives, a new sequence is created in parallel.

(When a new element is smaller than the last element, use Binary Search to find the index where it belongs.)

## 💻 Source code

```
import java.io.*;
import java.util.*;

public class Main{
    public static void main(String[] args)throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //StringTokenizer st = new StringTokenizer(br.readLine());

        int input = Integer.valueOf(br.readLine());
        int[] arr = new int[input];
        int[] dp = new int[input];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for(int i=0;i<arr.length;i++){
            arr[i] = Integer.valueOf(st.nextToken());
        }

        List<Integer> list = new ArrayList<>();
        list.add(arr[0]);

        for(int i=1;i<arr.length;i++){
            binarySearch(list, arr, arr[i]);
            // 끝보다 크면 추가
        }
        System.out.println(list.size());
    }

    private static void binarySearch(List<Integer> list, int[] arr, int target){
        if(target > list.get(list.size()-1)){
            list.add(target);
        }
        else{
            int start = 0;
            int end = list.size()-1;
            int mid = 0;
            // 이분탐색
            while(start<=end){
                mid = (start + end) / 2;
                if(target == list.get(mid)){
                    list.set(mid, target);
                    return;
                }
                else if(list.get(mid)<target){
                    start = mid + 1;
                }
                else if(list.get(mid)>target){
                    end = mid - 1;
                }
            }
            list.set(start, target);
        }
    }
}
```
