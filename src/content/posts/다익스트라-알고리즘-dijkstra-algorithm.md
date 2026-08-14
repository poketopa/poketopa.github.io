---
title: "다익스트라 알고리즘 Dijkstra algorithm"
description: "🚀 다익스트라 알고리즘 Dijkstra Algorithm 출발 노드에서 다른 모든 노드까지의 최단 거리를 찾는 알고리즘 다익스트라는 DFS / BFS와 무엇이 다를까? ✅ 간단하게 생각하면 다익스트라는 노드 간의 이동 비용이 필요할 때 사용할 수 있다."
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: a315236f-be29-4e92-a070-dae980f0577d
  url: https://velog.io/@lhs5427ll/%EB%8B%A4%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%9D%BC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Dijkstra-algorithm
draft: false
---
# 🚀 다익스트라 알고리즘 (Dijkstra Algorithm)
> 출발 노드에서 다른 모든 노드까지의 최단 거리를 찾는 알고리즘


## **다익스트라는 DFS / BFS와 무엇이 다를까?**
![](/images/velog/다익스트라-알고리즘-dijkstra-algorithm-01.webp)

### ✅ 간단하게 생각하면 다익스트라는 노드 간의 이동 비용이 필요할 때 사용할 수 있다.

BFS : **노드 간의 이동 비용이 모두 1인 경우**, 이동 거리의 최소값을 구해야하는 경우

다익스트라 : **노드 간의 이동 비용이 달라** 이동 거리보다 최소 비용이 중요한 경우

### 📌 문제 예시 :
![](/images/velog/다익스트라-알고리즘-dijkstra-algorithm-02.webp)

### "노드 1에서 출발하여 이동 비용이 n 이하인 노드의 개수를 구하라"

#### 사용 변수
**List<int[]>[] list :**
→ 각 인덱스는 출발 노드를 의미하며,
int[] 배열의 0번 인덱스는 도착 노드, 1번 인덱스는 이동 비용을 저장

**Queue<Integer> queue :**
→ BFS와 유사한 방식으로 탐색을 진행하는 큐
  
**int[] distance :**
→ 각 노드까지의 최소 거리를 저장하는 배열
→ 출발 노드(1번 인덱스)는 0으로 초기화,
나머지는 Integer.MAX_VALUE로 설정 (무한대)
  
### BFS와의 차이점
visited 배열이 필요 없음
→ 이유: 각 노드를 확인할 때, 현재 탐색 경로가 최소값이 아닐 경우 큐에 추가하지 않기 때문
  
  
##  코드 구현 (Java)
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

## 🎯 핵심
✔ 다익스트라 알고리즘은 가중치 그래프에서 최단 거리를 찾을 때 사용
✔ BFS와 다르게 각 경로의 이동 비용을 고려해야 할 때 적합
✔ visited 배열이 필요 없음 → 최소 비용 경로만 갱신
✔ 시간 복잡도 : O(E log V) (우선순위 큐를 사용할 경우 더욱 최적화 가능)
