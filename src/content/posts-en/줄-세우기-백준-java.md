---
title: "Lining Up (Baekjoon, Java)"
description: "A problem asking how to line up students when each has an assigned priority. 💡 Idea: a very basic topological sort problem. Declare an array storing each node's indegree and use BFS"
publishedAt: 2025-03-18
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: 213b232c-b72b-4407-9471-84689aa22a8e
  url: https://velog.io/@lhs5427ll/%EC%A4%84-%EC%84%B8%EC%9A%B0%EA%B8%B0-%EB%B0%B1%EC%A4%80-Java
draft: false
---

https://www.acmicpc.net/problem/2252
![](/images/velog/줄-세우기-백준-java-01.webp)

A problem asking how to line up students when each has an assigned priority.

## 💡 Idea
This is a very basic problem using topological sort.

Declare an array storing each node's indegree and use BFS to line up the students.

Here, indegree means "the minimum number of students who must stand before this student."

## 🛠️ Solution process

### 1. Declare the indegree array degree[]
For an input (a, b), b's indegree must increase by one, so perform degree[b]++.

### 2. Initialize the queue with nodes whose indegree is 0.

An indegree of 0 means the highest priority, so visit these first.

### 3. Decrease the indegree of the next nodes by 1 and enqueue those whose indegree becomes 0.

After visiting nodes with priority 0 (the highest), change the priority of nodes with priority 1 to 0 so they can be visited next.

## 💻 Source code

```
import java.io.*;
import java.util.*;

public class Main {
    static int[] arr;
    static long[] tree;
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        //StringTokenizer st = new StringTokenizer(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int[] degree = new int[N + 1];
        List<Integer>[] list = new List[N + 1];
        for(int i = 1;i<N + 1;i++) list[i] = new ArrayList<>();
        for(int i=0;i<M;i++){
            StringTokenizer st2 = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st2.nextToken());
            int b = Integer.parseInt(st2.nextToken());
            list[a].add(b);
            degree[b]++;
        }
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


        bw.flush();
        bw.close();
    }
}
```
