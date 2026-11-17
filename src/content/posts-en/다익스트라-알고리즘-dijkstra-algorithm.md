---
title: "Dijkstra's Algorithm"
description: "🚀 Dijkstra Algorithm: an algorithm for finding the shortest distance from a starting node to every other node. How does Dijkstra differ from DFS / BFS? ✅ Simply put, Dijkstra can be used when travel costs between nodes matter."
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: a315236f-be29-4e92-a070-dae980f0577d
  url: https://velog.io/@lhs5427ll/%EB%8B%A4%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%9D%BC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Dijkstra-algorithm
draft: false
cover: /covers/dijkstra.jpg
---
# 🚀 Dijkstra's Algorithm (Dijkstra Algorithm)
> An algorithm for finding the shortest distance from a starting node to every other node

## **How does Dijkstra differ from DFS / BFS?**
![](/images/velog/다익스트라-알고리즘-dijkstra-algorithm-01.webp)

### ✅ Simply put, Dijkstra can be used when travel costs between nodes matter.

BFS: when **the travel cost between every pair of connected nodes is 1** and you need the minimum travel distance.

Dijkstra: when **travel costs between nodes differ**, making minimum cost more important than travel distance.

### 📌 Example problem:
![](/images/velog/다익스트라-알고리즘-dijkstra-algorithm-02.webp)

### “Starting from node 1, find the number of nodes reachable at a travel cost of n or less.”

#### Variables used
**List<int[]>[] list:**
→ Each index represents a starting node;
index 0 of each int[] array stores the destination node, and index 1 stores the travel cost.

**Queue<Integer> queue:**
→ A queue used to search in a manner similar to BFS.

**int[] distance:**
→ An array storing the minimum distance to each node.
→ Initialize the starting node (index 1) to 0,
and the rest to Integer.MAX_VALUE (infinity).

### Difference from BFS
No visited array is needed.
→ Reason: when checking each node, we do not add it to the queue if the current search path is not the minimum.

## Code implementation (Java)
  ```
import java.util.*;

class Solution {
    public int solution(int N, int[][] road, int K) {
        // 1. 그래프 초기화 (인접 리스트)
        List<int[]>[] list = new List[N + 1];
        for (int i = 0; i <= N; i++) {
            list[i] = new ArrayList<>();
        }
        
        // 2. 거리 배열 초기화
        int[] distance = new int[N + 1];
        Arrays.fill(distance, Integer.MAX_VALUE);

        // 3. 도로 정보 입력 (양방향)
        for (int[] r : road) {
            list[r[0]].add(new int[]{r[1], r[2]});
            list[r[1]].add(new int[]{r[0], r[2]});
        }

        // 4. 다익스트라 알고리즘 수행
        Queue<Integer> queue = new LinkedList<>();
        queue.add(1);
        distance[1] = 0;

        while (!queue.isEmpty()) {
            int now = queue.poll();

            for (int[] next : list[now]) {
                int nextNode = next[0];
                int cost = next[1];

                // 현재 노드를 거쳐가는 것이 더 짧다면 갱신 후 큐에 추가
                if (distance[now] + cost < distance[nextNode]) {
                    distance[nextNode] = distance[now] + cost;
                    queue.add(nextNode);
                }
            }
        }

        // 5. K 이하의 거리인 노드 개수 반환
        int answer = 0;
        for (int d : distance) {
            if (d <= K) answer++;
        }

        return answer;
    }
}
```

## 🎯 Key points
✔ Dijkstra's algorithm is used to find shortest distances in weighted graphs.
✔ Unlike BFS, it is suitable when travel costs along each path must be considered.
✔ No visited array is needed → update only minimum-cost paths.
✔ Time complexity: O(E log V) (further optimization is possible using a priority queue).
