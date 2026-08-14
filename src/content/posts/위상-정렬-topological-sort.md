---
title: "위상 정렬 (Topological Sort)"
description: "기술을 배우고 문제를 해결한 과정을 정리한 기록입니다."
publishedAt: 2025-03-18
updatedAt: 2026-08-14
category: Development
tags: ["Java","알고리즘"]
source:
  platform: Velog
  id: 17fcfd3b-7137-4ce8-98b5-ac8623657b51
  url: https://velog.io/@lhs5427ll/%EC%9C%84%EC%83%81-%EC%A0%95%EB%A0%AC
draft: false
---
## 🚀 위상 정렬 (Topological Sort)

순환하지 않는 유향 그래프를 방향성에 거스르지 않도록 순서대로 배열하는 방법이다.

## 📌 위상 정렬 개념

![](/images/velog/위상-정렬-topological-sort-01.webp)

위에서 말하는 순환하지 않는 유향 그래프란 사이클이 없는 방향 그래프 (DAG)를 뜻한다.

간단하게 예시를 들면 각 노드가 서로 우선순위를 가질 때, 이 우선순위를 거스르지 않고 노드를 정렬시키는 알고리즘이다.

## 😅 간단한 예 (라면 조리)

#### 냄비 -> 물 -> 면, 스프, 후레이크 -> 식사 의 우선순위를 가진다고 해보자

우선순위가 같은 면, 스프, 후레이크의 순서는 바뀌어도 되지만 우선순위가 다른 요소를 반대로 배치해서는 안된다

### 가능한 정렬
냄비 -> 물 -> 면 

### 불가능한 정렬
물 -> 면 -> 냄비


## ✨ 진입 차수란?

특정 노드로 들어오는 간선의 개수를 의미한다.

자신 앞에 적어도 몇개의 노드가 있어야 하는지를 나타낸다.

예를 들어 E라는 노드 앞에 A, B, C, D가 있어야 할 때 E의 진입 차수는 4이다.

## 🛠 위상 정렬 과정

### 1. 진입 차수가 0인 노드를 찾는다.

즉, 어떤 노드도 선행 조건으로 요구하지 않는 작업을 먼저 수행할 수 있다.

### 2. 해당 노드를 방문하고, 그래프에서 제거한다.

방문한 노드와 연결된 간선을 삭제한다.
(여기서 "제거한다"는 큐에 넣지 않는 것을 뜻한다.)

### 3. 연결된 노드들의 진입 차수를 1 감소시킨다.

이 과정에서 새롭게 진입 차수가 0이 되는 노드가 생긴다면, 이를 다음 방문 대상으로 선택한다.

### 4. 이 과정을 모든 노드를 처리할 때까지 반복한다.

더 이상 방문할 노드가 없으면 정렬된 순서를 반환한다.


## ⏰ 시간 복잡도

O(V + E) (V: 노드 수, E: 간선 수)
노드를 한 번씩 방문하고, 간선을 한 번씩 확인한다.

## 💻 예제 코드

```
Queue<Integer> queue = new LinkedList<>();
        for(int i=1;i<=N;i++){
            if(degree[i] == 0){
                queue.add(i);
            }
        }

        while(!queue.isEmpty()){
            int temp = queue.poll();
            bw.write(temp + " ");
            for(int i=0;i<list[temp].size();i++){
                degree[list[temp].get(i)]--;
                if(degree[list[temp].get(i)] == 0) queue.add(list[temp].get(i));
            }
        }
```
