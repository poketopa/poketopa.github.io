---
title: "Topological Sort"
description: "A record of learning technologies and working through problems."
publishedAt: 2025-03-18
updatedAt: 2026-08-14
category: Development
tags: ["Java","알고리즘"]
source:
  platform: Velog
  id: 17fcfd3b-7137-4ce8-98b5-ac8623657b51
  url: https://velog.io/@lhs5427ll/%EC%9C%84%EC%83%81-%EC%A0%95%EB%A0%AC
draft: false
cover: /covers/topological-sort.jpg
---
## 🚀 Topological Sort

A way of arranging a directed graph with no cycles in an order that respects the directions of its edges.

## 📌 The concept of topological sorting

![](/images/velog/위상-정렬-topological-sort-01.webp)

The directed graph without cycles mentioned above is a directed acyclic graph (DAG).

Simply put, when nodes have precedence relationships, this algorithm sorts them without violating those relationships.

## 😅 A simple example (cooking instant noodles)

#### Suppose the precedence is pot -> water -> noodles, soup powder, dried toppings -> meal.

Noodles, soup powder, and dried toppings have the same precedence, so their order can change, but elements with different precedence must not be placed in reverse order.

### A possible ordering
Pot -> water -> noodles

### An impossible ordering
Water -> noodles -> pot

## ✨ What is in-degree?

The number of edges entering a particular node.

It indicates the minimum number of nodes that must come before it.

For example, if A, B, C, and D must precede node E, E has an in-degree of 4.

## 🛠 The topological sorting process

### 1. Find a node with an in-degree of 0.

In other words, tasks that require no other node as a prerequisite can be performed first.

### 2. Visit the node and remove it from the graph.

Delete the edges connected to the visited node.
(Here, “remove” means not putting it into the queue.)

### 3. Decrease the in-degree of connected nodes by 1.

If any node's in-degree becomes 0 during this process, select it as a node to visit next.

### 4. Repeat until all nodes are processed.

When there are no more nodes to visit, return the sorted order.

## ⏰ Time complexity

O(V + E) (V: number of nodes, E: number of edges).
Visit each node once and check each edge once.

## 💻 Example code

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
