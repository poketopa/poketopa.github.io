---
title: "플로이드-워셜 알고리즘 Floyd-Warshall Algorithm"
description: "🚀 플로이드-워셜 알고리즘 Floyd-Warshall Algorithm 모든 노드 간 최단 거리를 구하는 알고리즘으로, 동적 계획법 DP 을 활용하여 최적의 경로를 찾는다. 🔎 플로이드 워셜 알고리즘이란? DP 동적 계획법 을 이용하여 모든 노드 간의 최소"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: 99ce8899-c626-4d6d-8cfc-a6f3b2d92354
  url: https://velog.io/@lhs5427ll/%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%9B%8C%EC%85%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Floyd-Warshall-Algorithm
draft: false
---
# 🚀 플로이드-워셜 알고리즘 Floyd-Warshall Algorithm

> 모든 노드 간 최단 거리를 구하는 알고리즘으로, 동적 계획법 (DP)을 활용하여 최적의 경로를 찾는다.

## 🔎 플로이드 워셜 알고리즘이란?
**DP(동적 계획법)**을 이용하여 모든 노드 간의 최소 거리를 구하는 알고리즘
2차원 배열을 사용하여 각 노드 간의 이동 거리를 저장
특정 노드를 경유할 때, 더 짧은 경로가 존재하는지 확인하여 거리 정보를 갱신

### ✅ 다익스트라 vs 플로이드 워셜 비교
![](/images/velog/플로이드-워셜-알고리즘-floyd-warshall-algorithm-01.webp)
#### - 플로이드 워셜은 그래프 전체의 최단 경로를 구할 때 사용
#### -  노드 수가 적고(100 이하), 모든 경로를 고려해야 할 때 적합


## 🧐 핵심 개념

- 모든 노드 간의 거리 정보를 저장할 2차원 배열 생성

- 자기 자신 → 자기 자신 거리 = 0

- 연결되지 않은 노드의 거리 = 무한대 (Integer.MAX_VALUE)

- 각 간선 정보를 입력받아 거리 초기화

- 모든 노드(i)를 "경유"하면서 최단 거리 갱신

- (출발 → 도착) vs (출발 → 경유 → 도착)

- 더 짧은 거리로 갱신할 수 있다면 값 업데이트


## 📌 구현 예시 :
![](/images/velog/플로이드-워셜-알고리즘-floyd-warshall-algorithm-02.webp)
위 그래프를 토대로 2차원 배열을 만들면 다음과 같다


스스로에 대한 거리는 0으로 취급하며, 이어지지 않은 노드에 대해서는 거리를 무한으로 설정한다.
![](/images/velog/플로이드-워셜-알고리즘-floyd-warshall-algorithm-03.webp)

**3중 반복문을 이용해서 2차원 배열을 갱신한다.**
![](/images/velog/플로이드-워셜-알고리즘-floyd-warshall-algorithm-04.webp)

핵심 코드는 다음과 같은데, **최상위 for문은 1번 부터 5번 노드를 경유할 때를 가정**한다.


다음으로 출발노드, 도착노드를 확인하여


**1. 출발노드 -> 도착노드**

**2. 출발노드 -> 경유노드 -> 도착노드**


2가지 경우를 비교하여 이동거리가 더 작은 것으로 해당 인덱스를 갱신한다.


#### 이 때, 출발노드, 도착노드, 경유 노드가 무한(Integer.MAX_VALUE)인 경우 이동할 수 없는 상태이므로 continue하여 다음 경우를 확인한다.

## 코드 구현 (Java)
```
import java.util.*;

class Solution {
    public void solution(int n, int[][] edges) {
        // 1. 2차원 배열 생성 및 초기화
        int[][] floyd = new int[n + 1][n + 1];
        for (int i = 0; i <= n; i++) {
            Arrays.fill(floyd[i], Integer.MAX_VALUE);
        }

        // 2. 자기 자신으로 가는 거리는 0
        for (int i = 1; i <= n; i++) {
            floyd[i][i] = 0;
        }

        // 3. 간선 정보 입력 (거리 초기화)
        for (int[] edge : edges) {
            floyd[edge[0]][edge[1]] = edge[2];
        }

        // 4. 플로이드 워셜 알고리즘 실행
        for (int k = 1; k <= n; k++) { // 경유 노드
            for (int i = 1; i <= n; i++) { // 출발 노드
                for (int j = 1; j <= n; j++) { // 도착 노드
                    // 경유할 수 없는 경우 패스
                    if (floyd[i][k] == Integer.MAX_VALUE || floyd[k][j] == Integer.MAX_VALUE) {
                        continue;
                    }
                    // 최단 거리 갱신
                    floyd[i][j] = Math.min(floyd[i][j], floyd[i][k] + floyd[k][j]);
                }
            }
        }

        // 5. 결과 출력 (최단 거리 행렬)
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                System.out.print(floyd[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```
