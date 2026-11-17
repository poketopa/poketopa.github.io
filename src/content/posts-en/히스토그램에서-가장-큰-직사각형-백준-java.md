---
title: "Largest Rectangle in a Histogram (Baekjoon, Java)"
description: "Find the area of the largest rectangle in a histogram. There are several approaches, but I chose divide and conquer. 💡 Idea: Ah..........."
publishedAt: 2025-03-17
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: e101f137-6bd2-46a9-87e4-04b8cc32b390
  url: https://velog.io/@lhs5427ll/%ED%9E%88%EC%8A%A4%ED%86%A0%EA%B7%B8%EB%9E%A8%EC%97%90%EC%84%9C-%EA%B0%80%EC%9E%A5-%ED%81%B0-%EC%A7%81%EC%82%AC%EA%B0%81%ED%98%95-%EB%B0%B1%EC%A4%80-Java
draft: false
---

https://www.acmicpc.net/problem/6549
![](/images/velog/히스토그램에서-가장-큰-직사각형-백준-java-01.webp)

Find the area of the largest rectangle in a histogram.

There are several approaches, but I chose **divide and conquer**.

## 💡 Idea
Ah...............................

I thought of a better approach while writing this post. I'll record both for now.

### ❌ My previous logic
#### Divide and conquer by splitting the range in half.

1. Find the minimum histogram height in the current range and calculate the maximum rectangle area.

2. Divide and conquer the left and right sides using the index halfway through the range.
```
int mid = (start + end) / 2;
```

### ✅ Better logic I thought of while writing
The most important thing in divide and conquer is the criterion for splitting.

As written above, I simply split the range in half.

But **we need to think about what criterion will let us find the maximum in the current range.**

The maximum rectangle area in a particular range will be **(minimum bar height * length of the range)**.
(Assuming we must use the entire current range)

So in this problem, we can use the shortest histogram bar in the current range as the criterion, splitting left and right for the search.

Of course, this requires a segment tree that finds the array index of the shortest bar in a range.

## 📌 Differences in the logic
### The first approach
Simply splits the size in half. This can prevent optimal computation.

### The second approach
Splits at the minimum-height bar in the current range instead of halfway through its size.

Because the largest area obtainable from the current range is based on the minimum-height bar, this can be a more optimized approach.

## 🛠️ Divide-and-conquer process
![](/images/velog/히스토그램에서-가장-큰-직사각형-백준-java-02.webp)
Search by progressively splitting the histogram from its full range into smaller ranges.

Set the initial values to start = 1, end = 7.

The shortest bars in the range are at indices 2 and 5, with height 1.

The current maximum rectangle area is 1 * 7 = 7.

If several indices have the same height, assume we split at the smaller index.

![](/images/velog/히스토그램에서-가장-큰-직사각형-백준-java-03.webp)

![](/images/velog/히스토그램에서-가장-큰-직사각형-백준-java-04.webp)

As above, split and search left and right around index 2.

## 🤔 Thinking in indices

The bar heights at each index in the problem are as follows

### Initial values
#### (2, 1, 4, 5, 1, 3, 3) / Current maximum area 1 * 7 = 7
Split at the second index, which has the minimum height of 1.
<br>

### First split
#### (2), (4, 5, 1, 3, 3) / Maximum areas 2 and 5, respectively
The left search ends because its size is 1; split the right side at its third index, whose value is 1.
<br>

### Second split
#### (4, 5), (3, 3) / Maximum areas 8 and 6, respectively
Split each around its minimum, but because their sizes are 2, they are divided in half.
<br>

### Third split
#### (4), (5), (3), (3) / Maximum areas 4, 5, 3, and 3, respectively
All searches end because their sizes are 1
<br>

### The areas obtained here include (7, 2, 5, 8, 6, 4, 5, 3, 3), with a maximum of 8.

## 💻 Source code
### Search around the middle index, without a tree
```
import java.io.*;
import java.util.*;

public class Main {
    static int[] heights;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        while (true) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int n = Integer.parseInt(st.nextToken());

            if (n == 0) break; // 종료 조건

            heights = new int[n + 1];
            for (int i = 1; i <= n; i++) {
                heights[i] = Integer.parseInt(st.nextToken());
            }

            // 최대 넓이 계산 후 BufferedWriter 사용하여 출력
            bw.write(getMaxArea(1, n) + "\n");
        }

        // 출력 버퍼 비우고 닫기
        bw.flush();
        bw.close();
    }

    private static long getMaxArea(int start, int end) {
        if (start == end) {
            return heights[start];
        }
        int mid = (start + end) / 2;
        long maxArea = Math.max(getMaxArea(start, mid), getMaxArea(mid + 1, end));
        long midArea = getMidArea(start, end, mid);

        maxArea = Math.max(maxArea, midArea);
        return maxArea;
    }

    private static long getMidArea(int left, int right, int mid) {
        // left : 왼쪽 끝
        // right : 오른쪽 끝
        int low = mid;
        int high = mid;
        long minHeight = heights[mid];
        long maxArea = heights[mid];

        while (left < low || high < right) {
            if (left < low && (high == right || heights[low - 1] > heights[high + 1])) {
                low--;
                minHeight = Math.min(minHeight, heights[low]);
            } else {
                high++;
                minHeight = Math.min(minHeight, heights[high]);
            }
            maxArea = Math.max(maxArea, minHeight * (high - low + 1));
        }

        return maxArea;
    }
}
```

### Search around the minimum-value index, with a minimum-index tree

```
import java.io.*;
import java.util.*;

public class Main {
    static int[] heights;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        while (true) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int n = Integer.parseInt(st.nextToken());

            if (n == 0) break; // 종료 조건

            heights = new int[n + 1];
            for (int i = 1; i <= n; i++) {
                heights[i] = Integer.parseInt(st.nextToken());
            }

            // 최대 넓이 계산 후 BufferedWriter 사용하여 출력
            bw.write(getMaxArea(1, n) + "\n");
        }

        // 출력 버퍼 비우고 닫기
        bw.flush();
        bw.close();
    }

    private static long getMaxArea(int start, int end) {
        if (start == end) {
            return heights[start];
        }
        int mid = (start + end) / 2;
        long maxArea = Math.max(getMaxArea(start, mid), getMaxArea(mid + 1, end));
        long midArea = getMidArea(start, end, mid);

        maxArea = Math.max(maxArea, midArea);
        return maxArea;
    }

    private static long getMidArea(int left, int right, int mid) {
        // left : 왼쪽 끝
        // right : 오른쪽 끝
        int low = mid;
        int high = mid;
        long minHeight = heights[mid];
        long maxArea = heights[mid];

        while (left < low || high < right) {
            if (left < low && (high == right || heights[low - 1] > heights[high + 1])) {
                low--;
                minHeight = Math.min(minHeight, heights[low]);
            } else {
                high++;
                minHeight = Math.min(minHeight, heights[high]);
            }
            maxArea = Math.max(maxArea, minHeight * (high - low + 1));
        }

        return maxArea;
    }
}
```
