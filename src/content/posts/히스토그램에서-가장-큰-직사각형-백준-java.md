---
title: "히스토그램에서 가장 큰 직사각형 (백준, Java)"
description: "히스토그램 그래프에서 찾을 수 있는 가장 큰 직사각형의 넓이를 구하는 문제이다. 해당 문제는 여러 방법으로 생각할 수 있지만, 나는 분할 정복 방식을 선택했다. 💡 아이디어 아..........."
publishedAt: 2025-03-17
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: e101f137-6bd2-46a9-87e4-04b8cc32b390
  url: https://velog.io/@lhs5427ll/%ED%9E%88%EC%8A%A4%ED%86%A0%EA%B7%B8%EB%9E%A8%EC%97%90%EC%84%9C-%EA%B0%80%EC%9E%A5-%ED%81%B0-%EC%A7%81%EC%82%AC%EA%B0%81%ED%98%95-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/6549
![](/images/velog/히스토그램에서-가장-큰-직사각형-백준-java-01.webp)

히스토그램 그래프에서 찾을 수 있는 가장 큰 직사각형의 넓이를 구하는 문제이다.

해당 문제는 여러 방법으로 생각할 수 있지만, 나는 **분할 정복 방식**을 선택했다.

## 💡 아이디어
아...............................

포스팅 적다가 더 좋은 방법이 생각났다. 일단 둘다 기록해본다.

### ❌ 이전에 사용한 로직
#### 범위를 절반으로 쪼개며 분할 정복한다.

1. 현재 범위의 최소 히스토그램 높이를 찾아 직사각형의 최대 넓이를 구한다.

2. 범위 인덱스를 절반으로 나눈 인덱스를 사용해 왼쪽, 오른쪽을 각각 분할 정복 한다.
```
int mid = (start + end) / 2;
```

### ✅ 쓰면서 생각난 더 좋은 로직
분할 정복을 진행할 때 가장 중요한 것은 분할하는 기준이다.

위에 적은 것처럼 나는 범위를 절반으로 나누어 간단하게 생각했다.

그러나 **현재 범위에서 어떤 기준을 통해 최댓값을 구할 수 있을까 생각해야 한다.**

특정 범위에서 얻을 수 있는 최대 직사각형의 넓이는 **(최소 높이의 그래프 * 범위의 길이)**가 될 것이다.
(현재 범위를 모두 사용해야 한다고 가정할 때)

그렇기 때문에, 이 문제에서는 현재 범위에서 존재하는 가장 작은 히스토그램 그래프 높이를 기준으로 설정하고 왼쪽, 오른쪽으로 쪼개어 분할 탐색할 수 있다.

물론 이 로직을 위해서는 범위 내에서 가장 작은 그래프를 가진 배열 인덱스 위치를 찾는 세그먼트 트리를 구현해야 한다.

## 📌 로직 차이점
### 첫 번째 로직
은 단지 크기의 절반으로 쪼개며 분할한다. 이 때문에, 최적의 연산이 불가능할 수 있다.


### 두 번째 로직
크기의 절반이 아니라 현재 범위의 최소 높이 그래프를 기준으로 분할하는 것이다.

현재 범위에서 구할 수 있는 가장 큰 넓이는 최소 높이 그래프를 기준으로 하기 때문에 더 최적화된 로직이 될 수 있다.


## 🛠️ 분할 정복 과정
![](/images/velog/히스토그램에서-가장-큰-직사각형-백준-java-02.webp)
그래프를 전 범위부터 작은 범위까지 단계적으로 쪼개어 탐색한다.

초기값은 start = 1, end = 7로 설정한다.

구간에서 가장 작은 그래프는 2, 5번째 인덱스로 높이가 1이다.

현재의 최대 직사각형 넓이는 1 * 7 = 7이다.

같은  높이를 가진 인덱스가 여러 개 존재할 때는 작은 인덱스를 기준으로 분할한다고 가정한다.

![](/images/velog/히스토그램에서-가장-큰-직사각형-백준-java-03.webp)

![](/images/velog/히스토그램에서-가장-큰-직사각형-백준-java-04.webp)

위와 같이 2번 인덱스를 기준으로 왼쪽, 오른쪽으로 분할하여 탐색한다.

## 🤔 인덱스로 생각하기

문제의 각 인덱스 별 그래프 길이는 다음와 같다

### 초기값
#### (2, 1, 4, 5, 1, 3, 3) / 현재 최대 넓이 1 * 7 = 7 
가장 작은 크기인 1을 가진 2번째 인덱스를 기준으로 분할한다.
<br>

### 1번 째 분할 
#### (2), (4, 5, 1, 3, 3) / 최대 넓이 각각 2, 5
왼쪽 탐색은 크기가 1이므로 소멸, 오른쪽은 값이 1인 3번째 인덱스를 기준으로 분할한다.
<br>

### 2번 째 분할
#### (4, 5), (3, 3) / 최대 넓이 각각 8, 6
각각 최소값을 기준으로 분할하지만 크기가 2이므로 반으로 나눠진다.
<br>

### 3번 째 분할
#### (4), (5), (3), (3) / 최대 넓이 각각 4, 5, 3, 3
크기가 1이므로 모두 소멸
<br>

### 여기서 도출된 넓이는 (7, 2, 5, 8, 6, 4, 5, 3, 3) 등이 있고, 최대는 8이다.

## 💻 소스 코드
### 가운데 인덱스 기준 탐색, 트리 사용 X
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

### 최소값 인덱스 기준, 최소값 인덱스 트리 사용 O

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
