---
title: "Union-Find"
description: "We are holding your nodes. Parents, please come and collect them."
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

## 🚀 Union-Find
> **Union-Find** is a data structure for managing disjoint sets.

It can quickly perform operations that **check whether groups are different** or **merge two groups**.

## 📌 Union-Find concepts
#### ✔ Each element has a root (parent) node for the set it belongs to.
#### ✔ Union: merge two sets into one.
#### ✔ Find: find the set (representative node) that a particular element belongs to.
#### ✔ Path compression can improve performance.

## 🚀 Path compression
When finding a particular node's root (parent), update the intermediate path at once to optimize performance.

In other words, minimize operations by setting a particular node's parent to the root node.
![](/images/velog/유니온-파인드-union-find-01.webp)

### In the diagram above, the root node is 1, so path compression means setting every node's parent to 1.

## 🛠 Union-Find operations
### 1. Union
✔ An operation that merges the sets to which two nodes belong
✔ Find the two nodes' roots and connect one to the other.

### 2. Find
✔ An operation that finds a particular node's root
✔ Keep following parent[x] upward to find the representative node.
✔ Path compression optimizes the process of finding the root.

### 3. Path compression
✔ During find(), connect the parents of all intermediate nodes directly to the root
✔ This dramatically improves subsequent search speed
✔ Performance is close to O(1) time complexity.

## ⏰ Time complexity
The basic Find() operation is **O(log N)**,

but applying path compression reduces it to around **O(N)**.

## 💻 Example code
### The find function
**The parent array stores each node's parent. The find function follows the parents upward and returns the root node.**
```
private static int find(int x){
        if(x == parent[x]) return x;
        else return find(parent[x]);
    }
```

### The union function
Check each node's root and return true if they are the same.
#### Same root node = the two nodes are in the same tree.

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
