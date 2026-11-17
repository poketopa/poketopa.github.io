---
title: "Finding the Minimum Cost 2 (Baekjoon, JAVA)"
description: "📌 The problem asks for three main things: 1. The minimum cost from the starting node to the destination. 2. The number of nodes in a minimum-cost path. 3. The order in which the nodes on that path are visited."
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: e797ac2b-1bac-4063-a5ee-1ce53ceaf3ab
  url: https://velog.io/@lhs5427ll/%EC%B5%9C%EC%86%8C%EB%B9%84%EC%9A%A9-%EA%B5%AC%ED%95%98%EA%B8%B0-2-%EB%B0%B1%EC%A4%80-JAVA
draft: false
---

https://www.acmicpc.net/problem/11779

![](/images/velog/최소비용-구하기-2-백준-java-01.webp)

### 📌 The problem asks for three main things.

#### 1. The minimum cost from the starting node to the destination

#### 2. The number of nodes in a minimum-cost path

#### 3. The order in which the nodes on that path are visited

​

## ❌ My incorrect approach

#### 1. The minimum cost from the starting node to the destination

Find it using Dijkstra's algorithm

​

#### 2. The number of nodes in a minimum-cost path

Like BFS, Dijkstra's algorithm uses a queue, so add a visited-node count to the queue entries.

​

#### 3. The order in which the nodes on that path are visited

Implement this using DFS

​

My incorrect approach used both Dijkstra's algorithm and DFS, resulting in a time limit exceeded error.

![](/images/velog/최소비용-구하기-2-백준-java-02.webp)

### ❌ Dijkstra's algorithm has lower time complexity than DFS and BFS, making DFS and BFS difficult to use here.

#### So all three requirements must be implemented within Dijkstra's algorithm.

​

## ✅ Idea

Requirements 1 and 2 were easy to think of, but I could not figure out requirement 3.

​

### 3. The order in which the nodes on that path are visited

Solve it by creating a node array. (moving[])

![](/images/velog/최소비용-구하기-2-백준-java-03.webp)

**When a minimum-cost node is found, assign its previous position in the array for the node being moved to.**

```
moving[list[now].get(i)[0]] = now;

// moving[now] = list[now].get(i)[0]; 위와 같이 하면 안된다.
```

By assigning the previous position to the node being moved to, we record

### "I came from this node!"

That is the information being stored.

​

## 🛠 Example

![](/images/velog/최소비용-구하기-2-백준-java-04.webp)

With the input above, the moving array contains the following values.

![](/images/velog/최소비용-구하기-2-백준-java-05.webp)

Index 0: ignored (because the array was declared with size node count + 1)

Index 1: -1, because it is the starting point

Indices 2, 3, 4: came from node 1

Index 5: came from node 4

​

Here, index 5 is the destination node, so trace backward from index 5 to check the path through the nodes.

![](/images/velog/최소비용-구하기-2-백준-java-06.webp)

Create a list, trace backward from the destination to the starting node, and print the result.

![](/images/velog/최소비용-구하기-2-백준-java-07.webp)

The for-loop condition is as shown above because the moving array was initialized to -1.

​

## 💻 Source code (Java)
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
