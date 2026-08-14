---
title: "최소비용 구하기 2 (백준, JAVA)"
description: "📌 문제에서 요구하는 것은 크게 3가지 이다. 1. 출발 노드에서 도착 노드까지의 최소 비용 2. 최소 비용을 갖는 경로에 포함된 노드의 개수 3. 최소 비용을 갖는 경로의 노드 방문 순서"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: e797ac2b-1bac-4063-a5ee-1ce53ceaf3ab
  url: https://velog.io/@lhs5427ll/%EC%B5%9C%EC%86%8C%EB%B9%84%EC%9A%A9-%EA%B5%AC%ED%95%98%EA%B8%B0-2-%EB%B0%B1%EC%A4%80-JAVA
draft: false
---
https://www.acmicpc.net/problem/11779

![](/images/velog/최소비용-구하기-2-백준-java-01.webp)

### 📌 문제에서 요구하는 것은 크게 3가지 이다.

#### 1. 출발 노드에서 도착 노드까지의 최소 비용

#### 2. 최소 비용을 갖는 경로에 포함된 노드의 개수

#### 3. 최소 비용을 갖는 경로의 노드 방문 순서

​

## ❌ 오답 아이디어

#### 1. 출발 노드에서 도착 노드까지의 최소 비용

다익스트라 알고리즘을 사용하여 구한다

​

#### 2. 최소 비용을 갖는 경로에 포함된 노드의 개수

다익스트라 알고리즘 로직은 BFS처럼 큐를 사용하므로 큐에 방문 노드 갯수 요소를 추가한다.

​

#### 3. 최소 비용을 갖는 경로의 노드 방문 순서

DFS를 이용해서 구현

​

나의 오답 아이디어에서는 다익스트라 알고리즘, DFS 알고리즘 2가지를 사용하여 시간 초과가 발생했다.

![](/images/velog/최소비용-구하기-2-백준-java-02.webp)

### ❌ 다익스트라 알고리즘은 DFS, BFS에 비해서 시간 복잡도가 작기 때문에 DFS, BFS를 사용하기 어렵다.



#### 그렇기에 다익스트라 알고리즘 안에서 3개의 조건을 모두 구현해야 한다.

​

## ✅ 아이디어 

1, 2 조건은 생각하기 쉬웠지만 3번 조건을 생각해내지 못했다.

​

### 3. 최소 비용을 갖는 경로의 노드 방문 순서


노드 배열을 하나 만들어서 해결한다. (moving[])

![](/images/velog/최소비용-구하기-2-백준-java-03.webp)

**최소 비용 노드를 찾았을 때, 이동할 노드 배열에 이전 위치를 할당한다.**

```
moving[list[now].get(i)[0]] = now;

// moving[now] = list[now].get(i)[0]; 위와 같이 하면 안된다.
```

이동할 노드에 이전 위치를 할당하며

### "나는 이 노드에서 왔어요!"

라는 것을 기록한다.

​

## 🛠 문제 예시

![](/images/velog/최소비용-구하기-2-백준-java-04.webp)

입력이 위와 같을 때 moving 배열의 값은 아래와 같다.

![](/images/velog/최소비용-구하기-2-백준-java-05.webp)

0번 인덱스 : 무시 (node의 개수 + 1의 크기로 선언하였으므로)

1번 인덱스 : 시작 지점이므로 -1

2, 3, 4 인덱스 : 1번 노드로부터 출발했다

5 인덱스 : 4번 노드로부터 출발했다

​

이 때, 5번 인덱스가 도착 노드이므로 5번 인덱스부터 역추적하여 노드의 진행 과정을 확인한다.

![](/images/velog/최소비용-구하기-2-백준-java-06.webp)


리스트를 만들어 도착 노드에서 부터 시작노드까지 역추적하여 출력하게 된다.

![](/images/velog/최소비용-구하기-2-백준-java-07.webp)

moving 배열을 -1로 초기화 했기 때문에 for문의 조건이 위와 같다.

​

## 💻 소스 코드 (Java)
```
package backjoon;

import java.io.*;
import java.util.*;

public class Main {
    static int max = Integer.MIN_VALUE;
    static int min = Integer.MAX_VALUE;
    static boolean flag = false;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //StringTokenizer st = new StringTokenizer(br.readLine());
        int node = Integer.parseInt(br.readLine());
        int edge = Integer.parseInt(br.readLine());
        List<int[]>[] list = new List[node + 1];
        for(int i=0;i<list.length;i++) list[i] = new ArrayList<>();
        for(int i=0;i<edge;i++){
            StringTokenizer st = new StringTokenizer(br.readLine());
            int temp1 = Integer.parseInt(st.nextToken());
            int temp2 = Integer.parseInt(st.nextToken());
            int temp3 = Integer.parseInt(st.nextToken());
            list[temp1].add(new int[]{temp2, temp3});
        }
        StringTokenizer st2 = new StringTokenizer(br.readLine());
        int start = Integer.parseInt(st2.nextToken());
        int end = Integer.parseInt(st2.nextToken());
        int[] distance = new int[node + 1];
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[start] = 0;
        PriorityQueue<int[]> queue = new PriorityQueue<>((a,b)->{
            if(a[1]<b[1]) return -1;
            else if(a[1]>b[1]) return 1;
            else return 0;
        });
        // now, cost, 횟수
        queue.add(new int[]{start, 0, 1});
        int move = 0;
        int[] moving = new int[node + 1];
        Arrays.fill(moving, -1);

        while(!queue.isEmpty()){
            int[] temp = queue.poll();
            int now = temp[0];
            int cost = temp[1];
            int length = temp[2];

            if(distance[now] < cost) continue;

            for(int i=0;i<list[now].size();i++){
                if(distance[list[now].get(i)[0]] > cost + list[now].get(i)[1]){
                    distance[list[now].get(i)[0]] = cost + list[now].get(i)[1];
                    moving[list[now].get(i)[0]] = now;
                    if(list[now].get(i)[0] == end) move = length + 1;
                    queue.add(new int[]{list[now].get(i)[0], cost + list[now].get(i)[1], length + 1});
                }
            }
        }

        System.out.println(distance[end]);
        System.out.println(move);

        List<Integer> print = new ArrayList<>();
        for(int i = end; i != -1;i = moving[i]){
            print.add(i);
        }
        for(int i=print.size()-1;i>=0;i--){
            System.out.print(print.get(i)+" ");
        }
    }
}
```
