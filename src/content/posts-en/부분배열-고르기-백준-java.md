---
title: "Choosing a Subarray (Baekjoon, Java)"
description: "Find the maximum of a range sum multiplied by the minimum value in that range. 💡 Original idea: I thought I could find the maximum using two segment trees. 1. A segment tree storing range sums. 2.…"
publishedAt: 2025-03-17
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: d0318ac6-66a4-454a-a240-be05fa178338
  url: https://velog.io/@lhs5427ll/%EB%B6%80%EB%B6%84%EB%B0%B0%EC%97%B4-%EA%B3%A0%EB%A5%B4%EA%B8%B0-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/2104
![](/images/velog/부분배열-고르기-백준-java-01.webp)

We need to maximize **the sum of a range * the minimum value in that range**.

## 💡 Original idea
### I thought I could find the maximum by building two segment trees.

**1. A segment tree storing range sums**
<br>
**2. A segment tree storing range minimums**
<br>

Then I thought I could check every possible range with nested loops.

But the length given in the problem is 100,000, so nested for loops have O(N^2) time complexity and **exceed the time limit**.

We therefore need to use divide and conquer to work with appropriate values.

## 🤔 Divide-and-conquer idea
#### The most important consideration in divide and conquer is deciding what criterion to split on.
<br>
What criterion should we use for this problem?

We need to split on the **minimum value**.

### Example

In the example array (3, 1, 6, 4, 5, 2), the minimum is 1, in the second position.

When 1 is included, multiplying it by the sum of as many values as possible gives the maximum.

So the first search covers the entire range, 1–6.

Then, for the next ranges, search to the left and right of the minimum, 1.

### Process

Step 1 / Check all of (3, 1, 6, 4, 5, 2), minimum 1.

Step 2 / Check (3) and (6, 4, 5, 2), minimums 3 and 2 respectively.

Step 3 / Check (6, 4, 5), minimum 4.

Step 4 / Check (6) and (5), minimums 6 and 5 respectively.

The answer is the maximum among the results produced in this process.

### Time complexity
O(N log N)

## 💻 Solution code
```
import java.io.*;
import java.util.*;

public class Main {
    static int n;
    static int[] arr, minTree;
    static long[] sumTree;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        n = Integer.parseInt(br.readLine());

        arr = new int[n + 1];
        arr[0] = Integer.MAX_VALUE; // 최소값 비교를 위해 0번 인덱스 사용
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 1; i <= n; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        sumTree = new long[n * 4];
        minTree = new int[n * 4];

        // 세그먼트 트리 초기화
        buildSumTree(1, 1, n);
        buildMinTree(1, 1, n);

        // 최대 점수 계산 및 출력
        System.out.println(findMaxScore(1, n));
    }

    // 분할 정복
    private static long findMaxScore(int start, int end){
        // 탐색 범위를 벗어나면 최댓값을 구해야하므로 return 0
        if(start > end) return 0;

        // 현재 범위의 최소값 인덱스
        int minIndex = queryMin(1, 1, n, start, end);
        // 현재 범위의 합
        long sumNum = querySum(1, 1, n, start, end);
        // 직사각형의 넓이
        long area = arr[minIndex] * sumNum;

        // 반으로 쪼갤 수 있으면 왼쪽 탐색
        if(start < minIndex){
            area = Math.max(area, findMaxScore(start, minIndex - 1));
        }
        // 반으로 쪼갤 수 있으면 오른 쪽 탐색
        if(minIndex < end){
            area = Math.max(area, findMaxScore(minIndex + 1, end));
        }

        // 최대 넓이 리턴
        return area;
    }

    // 특정 범위 최소값 찾기
    private static int queryMin(int node, int start, int end, int left, int right){
        if(start > right || end < left) return -1;
        if(left <= start && end <= right) return minTree[node];

        int mid = (start + end) / 2;
        int leftMin = queryMin(node * 2, start, mid, left, right);
        int rightMin = queryMin(node * 2 + 1, mid + 1, end, left, right);

        return getMinIndex(leftMin, rightMin);
    }

    // 특정 범위 합 찾기
    private static long querySum(int node, int start, int end, int left, int right){
        if(start > right || end < left) return 0;
        if(left <= start && end <= right) return sumTree[node];

        int mid = (start + end) / 2;
        return querySum(node * 2, start, mid, left, right)
                + querySum(node * 2 + 1, mid + 1, end, left, right);
    }

    // 합 트리 구축
    private static long buildSumTree(int node, int start, int end){
        if(start == end){
            return sumTree[node] = arr[start];
        }
        int mid = (start + end) / 2;
        return sumTree[node] = buildSumTree(node * 2, start, mid)
                + buildSumTree(node * 2 + 1, mid + 1, end);
    }

    // 최소값 트리 구축
    private static int buildMinTree(int node, int start, int end){
        if(start == end) return minTree[node] = start; 

        int mid = (start + end) / 2;
        int leftMin = buildMinTree(node * 2, start, mid);
        int rightMin = buildMinTree(node * 2 + 1, mid + 1, end);
        return minTree[node] = getMinIndex(leftMin, rightMin);
    }

    // 더 작은 인덱스 확인 함수
    private static int getMinIndex(int leftMin, int rightMin){
        if(leftMin == -1) return rightMin; 
        if(rightMin == -1) return leftMin;

        if(arr[leftMin] < arr[rightMin]) return leftMin;
        else if(arr[leftMin] > arr[rightMin]) return rightMin;
        else return Math.min(leftMin, rightMin);
    }
}
```
