---
title: "LCS (Longest Common Subsequence) (Baekjoon, JAVA)"
description: "ACAYKP / CAPCAK. When extracting parts of these two strings to form subsequences, the longest possible common subsequence is ACAK. It can be solved using DP (Dynamic Programming) with a two-dimensional array."
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: 685edad9-8e7c-4c63-b367-6d0504787d93
  url: https://velog.io/@lhs5427ll/LCSLongest-Common-Subsequence-%EB%B0%B1%EC%A4%80-JAVA
draft: false
---

https://www.acmicpc.net/problem/9251
![](/images/velog/lcs-longest-common-subsequence-백준-java-01.webp)

ACAYKP

CAPCAK

When extracting parts of these two strings to form subsequences, the longest possible common subsequence is ACAK.

It can be solved using **DP (Dynamic Programming) with a two-dimensional array**.

#### str1 = "ACAYKP"

#### str2 = "CAPCAK"

Declare a two-dimensional array with dimensions one greater than each string's length, as follows.

![](/images/velog/lcs-longest-common-subsequence-백준-java-02.webp)

The operations performed in this two-dimensional array are as follows.

### 1. When the column and row values match (str2.charAt(y) == str1.charAt(x))

dp[y][x] = dp[y-1][x-1] + 1;

(Add 1 to the maximum value before the new matching character pair was added)

### 2. When the column and row values differ (str2.charAt(y) != str1.charAt(x))

dp[y][x] = Math.max(Math.max(dp[y-1][x], dp[y][x-1]), dp[y-1][x-1]);

(Inherit the maximum value possible so far)

## ✅ Worked example

### 1. When the column and row values match
![](/images/velog/lcs-longest-common-subsequence-백준-java-03.webp)
#### 1) In the diagram, C in row 1 and C in column 2 match, so update the value.

This is the first match found since starting, so the value is 0 + 1 = 1

#### 2) A in row 2 and A in column 3 match, so update the value.

We need to add 1 to the result so far (the longest subsequence before adding the new A-A pair = the previous C-C pair), so update dp[2][3] to the value diagonally above it, dp[1][2], plus 1.

![](/images/velog/lcs-longest-common-subsequence-백준-java-04.webp)

### 2. When the column and row values do not match

When the row and column do not match, keep the longest subsequence found so far.

![](/images/velog/lcs-longest-common-subsequence-백준-java-05.webp)

Consider the situation above as an example.

Column 3 (P) and row 3 (A) do not match.

There are three positions from which we can inherit a previous result here:

[y-1][x-1] / [y-1][x] / [y][x-1].

Take the largest of these values and assign it to dp[y][x].

In the diagram, dp[y-1][x] is the largest at 2, so take 2.

![](/images/velog/lcs-longest-common-subsequence-백준-java-06.webp)

**The two-dimensional array after completing all operations**

The maximum value, 4, is the maximum subsequence length.

Now, taking this one step further,

## 🤔 What if we need to output the "subsequence" itself rather than its "length"?

When adding a new value to the subsequence, we added 1 to dp[y-1][x-1].

This suggests that if the current value differs from the upper-left diagonal value, the character at the current position was added to the subsequence,

So we could find such cases and extract the characters in reverse order.

However, a difference from the diagonal does not always mean we can add the character, so we need additional conditions.

#### 1. If the value above or to the left equals the current value, move left or up to find a position where both the upper and left values are smaller than the current value.

#### 2. Add the character at that position to the subsequence, and move diagonally up and left.

![](/images/velog/lcs-longest-common-subsequence-백준-java-07.webp)

Following the path above, add the character to the subsequence whenever moving diagonally (orange circles), then reverse the order to output "ACAK."

## 💻 Source code 1 (length of the common subsequence)
```
import java.io.*;
import java.util.*;

public class Main {
    static int answer = -1;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //StringTokenizer st = new StringTokenizer(br.readLine());
        String str1 = br.readLine();
        String str2 = br.readLine();

        int[][] array = new int[str1.length()+1][str2.length()+1];

        for(int i=1;i<array.length;i++){
            for(int j=1;j<array[0].length;j++){
                if(str1.charAt(i-1) == str2.charAt(j-1)){
                    array[i][j] = array[i-1][j-1] + 1;
                }
                else array[i][j] = Math.max(Math.max(array[i][j-1], array[i-1][j]), array[i-1][j-1]);
                answer = Math.max(array[i][j], answer);
            }
        }
        System.out.println(answer);
    }
}
```

## 💻 Source code 2 (the common subsequence string)
```
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str1 = br.readLine();
        String str2 = br.readLine();

        int len1 = str1.length();
        int len2 = str2.length();
        int[][] dp = new int[len1 + 1][len2 + 1];

        // 1️⃣ LCS 길이 계산 (기본 DP 점화식 적용)
        for (int i = 1; i <= len1; i++) {
            for (int j = 1; j <= len2; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // 2️⃣ LCS 길이 출력
        System.out.println(dp[len1][len2]);

        // 3️⃣ LCS 문자열 역추적 (Traceback)
        int i = len1, j = len2;
        StringBuilder lcs = new StringBuilder();

        while (i > 0 && j > 0) {
            if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                // LCS 문자 추가 (문자가 같다면 포함)
                lcs.append(str1.charAt(i - 1));
                i--;
                j--;
            } else if (dp[i - 1][j] >= dp[i][j - 1]) {
                // 위쪽(i-1)으로 이동
                i--;
            } else {
                // 왼쪽(j-1)으로 이동
                j--;
            }
        }

        // 4️⃣ LCS는 뒤에서부터 채워졌으므로 뒤집어서 출력
        System.out.println(lcs.reverse().toString());
    }
}

```
