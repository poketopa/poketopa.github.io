---
title: "유니온 파인드 (Union-Find)"
description: "노드를 보관하고 있으니, 부모님은 찾아가시길 바랍니다."
publishedAt: 2025-03-19
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
cover: /covers/velog/유니온-파인드-union-find-cover.webp
source:
  platform: Velog
  id: 41103247-b405-4cda-91ed-c6933e99e8bb
  url: https://velog.io/@lhs5427ll/%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%8C%8C%EC%9D%B8%EB%93%9C-Union-Find
draft: false
---
## 🚀 유니온 파인드 (Union-Find)
> **유니온 파인드(Union-Find)**는 서로소(Disjoint) 집합을 관리하는 자료구조이다.

"**서로 다른 그룹인지 확인**"하거나 "**두 그룹을 합치는**" 연산을 빠르게 수행할 수 있다.


## 📌 유니온 파인드 개념
#### ✔ 각 원소는 자신이 속한 집합의 루트(parent) 노드를 가진다.
#### ✔ 유니온(Union): 두 집합을 하나로 합친다.
#### ✔ 파인드(Find): 특정 원소가 속한 집합(대표 노드)을 찾는다.
#### ✔ 경로 압축(Path Compression) 기법을 활용하여 성능을 향상할 수 있다.

## 🚀 경로 압축(Path Compression)
특정 노드의 루트(parent)를 찾을 때, 중간 경로를 한 번에 갱신하여 성능을 최적화한다.

즉, 특정 노드의 parent 노드를 루트 노드로 설정하여 연산을 최소화하는 것이다.
![](/images/velog/유니온-파인드-union-find-01.webp)

### 위와같은 그림에서 루트 노드는 1이므로 모든 노드의 parent 노드를 1로 설정하는 것이 경로 압축이다.

## 🛠 유니온 파인드 연산 과정
### 1. 유니온(Union)
✔ 두 노드가 속한 집합을 합치는 연산
✔ 두 노드의 루트 노드를 찾고, 한 쪽을 다른 쪽에 연결한다.

### 2. 파인드(Find)
✔ 특정 노드의 루트 노드를 찾는 연산
✔ parent[x]를 계속 타고 올라가면서 대표 노드를 찾는다.
✔ 경로 압축을 사용하면 루트 노드 찾는 과정이 최적화된다.

### 3. 경로 압축(Path Compression)
✔ find() 연산 시, 중간에 거치는 모든 노드들의 부모를 루트 노드로 직접 연결
✔ 이를 통해 이후 탐색 속도가 획기적으로 향상됨
✔ 시간 복잡도가 거의 O(1)에 가까운 성능을 보인다.

## ⏰ 시간 복잡도
기본적으로 Find() 연산은 **O(log N)** 이지만, 

경로 압축을 적용하면 **O(N)** 수준으로 줄어든다.

## 💻 예제 코드
### find 함수
**parent 배열은 해당 노드에 대한 부모 노드로, find함수에서는 부모 노드를 타고 올라가 루트 노드를 리턴한다.**
```
private static int find(int x){
        if(x == parent[x]) return x;
        else return find(parent[x]);
    }
```

### union 함수
각 노드의 루트 노드를 확인하여 같으면 true를 리턴한다.
#### 루트 노드가 같다 = 두 노드가 같은 트리 안에 있다.


```
private static boolean union(int a, int b){
        int rootA = parent[a];
        int rootB = parent[b];
        if(rootA == rootB) return true;
        else{
            parent[rootB] = rootA;
            return false;
        }
    }
```
