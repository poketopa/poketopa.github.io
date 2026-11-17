---
title: "Sums of Distinct Positive Integers (Baekjoon, Java)"
description: "Wrong idea. It is easy to recognize this as a DP problem. But there is an important condition: distinct positive integers. In other words, we must count combinations without repetition. Without that condition, the DP recurrence code would look like this. This code is correct when expressing a number as a sum of positive integers..."
publishedAt: 2025-11-28
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: 0e8ddd44-73fb-4268-b580-67e504a7387c
  url: https://velog.io/@lhs5427ll/%EC%84%9C%EB%A1%9C-%EB%8B%A4%EB%A5%B8-%EC%9E%90%EC%97%B0%EC%88%98%EC%9D%98-%ED%95%A9-%EB%B0%B1%EC%A4%80-Java
draft: false
---

https://www.acmicpc.net/problem/9764

![](/images/velog/서로-다른-자연수의-합-백준-java-01.webp)

## Wrong idea
It is easy to recognize this as a DP problem. But there is an important condition.
> **Distinct positive integers**
In other words, we must count combinations without repetition.

Without the condition that the positive integers must be distinct, the DP recurrence code would look like this.
```java
for (int i = 1; i <= N; i++) {      
    for (int j = i; j <= N; j++) {  
        dp[j] += dp[j - i];
    }
}
```
This code is correct when expressing a number as a sum of positive integers, but it cannot satisfy the problem's condition that the sum consist only of distinct positive integers.

### Why it is wrong

When the number currently being used is 3, the code behaves as follows

`dp[3] += dp[0];`
`dp[4] += dp[1];`
`dp[5] += dp[2];`
`dp[6] += dp[3];`  **<<< Disaster!!!!!**

`dp[3] += dp[0];` represents making 3 using 3. There is one way to make 3 using 3, so the count is 1.

But later, `dp[6] += dp[3];` uses that 3, representing a way of making 6 using 3.

This includes `"3 + 3"` among the ways to make 6

Which violates the condition that the sum must use distinct positive integers.

## Correct idea
The inner for loop must check from larger numbers downward.

```java
for (int i = 1; i <= N; i++) {    
    for (int j = N; j >= i; j--) {   
        dp[j] = dp[j] + dp[j - i];
    }
}
```
Working backward from N means that, when calculating the current value, the previous value needed (j-i) is still untouched by the addition of i.

### Example

A situation similar to the incorrect example.

`dp[6] += dp[3];` **<<< The dp[3] referenced here does not yet include the case of "3" itself!**
`dp[5] += dp[2];`
`dp[4] += dp[1];`
`dp[3] += dp[0];` **<<< This is where the case of "3" itself is added**

## Code
```java
public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //StringTokenizer st = new StringTokenizer(br.readLine());

        int[] dp = new int[2001];
        dp[0] = 1;
        for(int i=1;i<=2000;i++){
            for(int j=2000;j>=i;j--){
                dp[j] += dp[j-i];
                dp[j] %= 100999;
            }
        }

        int input = Integer.parseInt(br.readLine());
        for(int i=0;i<input;i++){
            int temp = Integer.parseInt(br.readLine());
            System.out.println(dp[temp]);
        }
    }
}
```
