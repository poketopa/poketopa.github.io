---
title: "Floyd–Warshall Algorithm"
description: "🚀 Floyd–Warshall Algorithm. An algorithm for finding the shortest distances between all nodes, using dynamic programming (DP) to find optimal paths. 🔎 What is Floyd–Warshall? It uses DP (dynamic programming) to find minimum distances between all nodes…"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: 99ce8899-c626-4d6d-8cfc-a6f3b2d92354
  url: https://velog.io/@lhs5427ll/%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%9B%8C%EC%85%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Floyd-Warshall-Algorithm
draft: false
cover: /covers/floyd-warshall.jpg
---

# 🚀 Floyd–Warshall Algorithm

> An algorithm for finding the shortest distances between all nodes, using dynamic programming (DP) to find optimal paths.

## 🔎 What is Floyd–Warshall?
An algorithm using **DP (dynamic programming)** to find the minimum distances between all nodes
Stores distances between nodes in a two-dimensional array
Updates distance information by checking whether a shorter path exists through a particular node

### ✅ Dijkstra vs. Floyd–Warshall
![](/images/velog/플로이드-워셜-알고리즘-floyd-warshall-algorithm-01.webp)
#### - Floyd–Warshall is used to find shortest paths across an entire graph
#### - Suitable when the number of nodes is small (100 or fewer) and all paths must be considered

## 🧐 Key concepts

- Create a two-dimensional array to store distances between all nodes

- Distance from a node → itself = 0

- Distance between unconnected nodes = infinity (Integer.MAX_VALUE)

- Initialize distances using the input edge information

- Update shortest distances while using every node (i) as an "intermediate" node

- (Start → Destination) vs. (Start → Intermediate → Destination)

- Update the value if a shorter distance is found

## 📌 Implementation example:
![](/images/velog/플로이드-워셜-알고리즘-floyd-warshall-algorithm-02.webp)
Creating a two-dimensional array from the graph above gives the following

The distance from a node to itself is treated as 0, while the distance between unconnected nodes is set to infinity.
![](/images/velog/플로이드-워셜-알고리즘-floyd-warshall-algorithm-03.webp)

**Update the two-dimensional array using three nested loops.**
![](/images/velog/플로이드-워셜-알고리즘-floyd-warshall-algorithm-04.webp)

The core code is as follows. **The outermost for loop considers passing through nodes 1 to 5.**

Next, check the starting and destination nodes and compare

**1. Starting node -> Destination node**

**2. Starting node -> Intermediate node -> Destination node**

Update the corresponding index with whichever of the two has the shorter distance.

#### Here, if the starting, destination, or intermediate node is infinity (Integer.MAX_VALUE), movement is impossible, so continue to check the next case.

## Code implementation (Java)
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
