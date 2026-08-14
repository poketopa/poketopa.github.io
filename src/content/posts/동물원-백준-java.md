---
title: "동물원 (백준, Java)"
description: "큰 조건은 2가지이다. 가로, 세로에 사자를 연속하여 배치할 수 없다. 사자를 배치하지 않는 경우도 포함한다. 🥲 틀린 풀이 점화식에 대한 아이디어가 떠오르지 않아서 경우의 수를 모두 생각하려고 했다. 사자가 0마리인 경우, 1마리인 경우 n마리인 경우를 구하려 했지만 배열의..."
publishedAt: 2025-07-02
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: 3734ff27-90c3-45b2-acbc-b62a4bb47bf6
  url: https://velog.io/@lhs5427ll/%EB%8F%99%EB%AC%BC%EC%9B%90-%EB%B0%B1%EC%A4%80-Java
draft: false
---
![](/images/velog/동물원-백준-java-01.webp)

https://www.acmicpc.net/problem/1309

#### 큰 조건은 2가지이다.
- 가로, 세로에 사자를 연속하여 배치할 수 없다.
- 사자를 배치하지 않는 경우도 포함한다.

---

## 🥲 틀린 풀이

**점화식에 대한 아이디어가 떠오르지 않아**서 경우의 수를 모두 생각하려고 했다.

사자가 0마리인 경우, 1마리인 경우 ~ n마리인 경우를 구하려 했지만 배열의 최대 길이가 100,000이기 때문에 **시간 초과가 발생할 확률이 높고 복잡**했다.

DP 점화식을 사용해야 시간초과 없이 풀 수 있다.

## ✅ 2차원 DP로 해결하기

결국 한 줄에 배치할 수 있는 사자의 경우의 수는 **3가지** 이므로, **이전 열의 배치 상태**를 보고 **현재 열의 배치 가능 여부**를 알 수 있다.

### 📝 상태 정의

**사자 우리는 2×N 크기이고, 각 열마다 아래 3가지 상태가 존재할 수 있다.**

| 상태 | 왼쪽 | 오른쪽 | 의미 |
| --- | --- | --- | --- |
| 0 | X | X | 사자를 배치하지 않음 |
| 1 | O | X | 왼쪽에만 사자 배치 |
| 2 | X | O | 오른쪽에만 사자 배치 |

#### 여기서 X = 비어있음, O = 사자 있음

따라서 아래처럼 배열을 선언할 수 있다.
> 
dp[n][0] = n번째 열에 사자 없음
dp[n][1] = n번째 왼쪽 칸에만 사자
dp[n][2] = n번째 오른쪽 칸에만 사자



---


## ✅ 점화식


### 1. 사자를 배치하지 않는 경우 ( dp[n][0] )

n번째 열에 **사자를 배치하지 않는 경우**는

→ 직전 열이 어떤 배치든 상관 없다.

따라서

```
dp[n][0] = dp[n-1][0] + dp[n-1][1] + dp[n-1][2]

```

---

### 2. 왼쪽에 사자를 배치하는 경우 ( dp[n][1] )

n번째 열의 **왼쪽에 사자를 배치**할 경우

→ 바로 앞 열의 윗칸에는 사자를 놓으면 안 된다.

그러므로 직전 열이 아래 상태여야 한다:

- 직전 열이 [사자 없음] → dp[n-1][0]
- 직전 열이 [오른쪽만 사자] → dp[n-1][2]

따라서

```
dp[n][1] = dp[n-1][0] + dp[n-1][2]

```

---

### 3. 오른쪽에 사자를 배치하는 경우 ( dp[n][2] )

n번째 열의 **아랫칸에만 사자를 배치**할 경우도 마찬가지로

- 직전 열이 [사자 없음] → dp[n-1][0]
- 직전 열이 [왼쪽만 사자] → dp[n-1][1]

따라서

```
dp[n][2] = dp[n-1][0] + dp[n-1][1]

```

---

## ✅ 초기값

**점화식은 크기가 2 이상일 때부터 작동하므로, N = 1인 경우에 대해 초기값을 작성해주어야 한다.**

따라서

```
dp[1][0] = 1
dp[1][1] = 1
dp[1][2] = 1

```


---

## 💻 소스코드

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
