---
title: "LCS(Longest Common Subsequence) (백준, JAVA)"
description: "ACAYKP CAPCAK 두 문자열에서 일부를 추출하여 부분 수열을 만들 때 가능한 가장 긴 공통 수열은 ACAK이다. 2차원 배열 DP Dynamic Programming 을 사용하여 풀이할 수"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
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

두 문자열에서 일부를 추출하여 부분 수열을 만들 때 가능한 가장 긴 공통 수열은 ACAK이다.


**2차원 배열 DP(Dynamic Programming)**을 사용하여 풀이할 수 있다.


#### str1 = "ACAYKP"

#### str2 = "CAPCAK"

다음과 같이 각 문자열 길이에 1을 더한 2차원 배열을 선언한다.

![](/images/velog/lcs-longest-common-subsequence-백준-java-02.webp)

위 2차원 배열에서 시행되는 연산은 다음과 같다.

### 1. 열과 행의 값이 같을 경우 (str2.charAt(y) == str1.charAt(x))

dp[y][x] = dp[y-1][x-1] + 1;

(새로운 같은 문자 쌍이 추가되기 전까지의 최대 값에 1을 더함)


### 2. 열과 행의 값이 다를 경우  (str2.charAt(y) != str1.charAt(x))

dp[y][x] = Math.max(Math.max(dp[y-1][x], dp[y][x-1]), dp[y-1][x-1]);

(이전까지 가능했던 최대 값을 계승함)

​


## ✅ 풀이 예시

### 1. 열과 행의 값이 일치할 경우
![](/images/velog/lcs-longest-common-subsequence-백준-java-03.webp)
#### 1) 그림에서 1행 C와 2열 C가 같이 때문에 값을 업데이트 한다.

이 때, 시행 이후 처음으로 같은 값을 찾았기 때문에 값은 0 + 1 = 1

​

#### 2) 2행 A과 3열 A가 같기 때문에 값을 업데이트 한다. 

이 때, 이전까지 시행했던 경우의 수(새로운 A-A 쌍이 추가되기 전까지의 가장 긴 부분수열 = 이전 C-C 쌍)에 1을 더해야 하기 때문에 dp[2][3] 에서 대각선 위 값인 dp[1][2] 값에 1을 더한 값을 업데이트 한다.

![](/images/velog/lcs-longest-common-subsequence-백준-java-04.webp)

### 2. 열과 행의 값이 일치하지 않을 경우

행과 열이 일치하지 않을 땐, 이 전까지 시행했던 경우 중 가장 긴 부분 수열을 유지해야한다. 

![](/images/velog/lcs-longest-common-subsequence-백준-java-05.webp)

위와 같은 상황으로 예시를 들어보자.

3열(P), 3행(A)가 동일하지 않은 상황이다.

그리고 현재 여기서 이전 상황을 계승할 수 있는 경우의 수는 

[y-1][x-1] / [y-1][x] / [y][x-1] 3가지이다.

이 중 가장 큰 값을 가져와 dp[y][x]에 할당한다.

그림에서는 dp[y-1][x]의 값인 2가 최대값이므로 2를 가져온다.

![](/images/velog/lcs-longest-common-subsequence-백준-java-06.webp)

**연산을 끝까지 진행한 2차원 배열 결과**

​

최대값인 4가 부분수열의 최대 길이가 된다.

​

그렇다면 여기서 한번 더 생각하여

## 🤔 수열의 "길이"가 아니라 "수열" 자체를 출력해야하는 경우 어떻게 해야할까?

​

부분 수열에 새로운 값을 추가한 경우에는 dp[y-1][x-1]값에 1을 더하였다. 

이를 통해 왼쪽 대각선 위와 현재 값이 다르면 현재 위치의 문자가 부분수열에 추가되었다는 뜻이기에

해당 경우를 찾아 문자를 역순으로 추출해내는 방법을 생각할 수 있다.

​

그러나, 대각선과 값이 다르다고 항상 추가할 수는 없기에 조건을 추가해야 한다.

​

#### 1. 위, 왼쪽 값이 현 위치 값과 같은 경우, 왼쪽, 혹은 위로 이동하여 위, 왼쪽 값이 모두 현재 값보다 작은 위치를 찾는다.

​

#### 2. 해당 위치의 문자를 부분수열에 추가하고 왼쪽 위 대각선으로 이동한다.

![](/images/velog/lcs-longest-common-subsequence-백준-java-07.webp)

위와 같은 경로로 이동할 때, 대각선으로 이동하는 경우(주황색 동그라미) 문자열을 부분 수열에 추가하고 이를 역순으로 배치하면 "ACAK"가 출력된다.


## 💻 소스코드 1 (공통 부분 수열의 길이)
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

## 💻 소스코드 2 (공통 부분 수열의 문자열)
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
