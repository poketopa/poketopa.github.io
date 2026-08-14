---
title: "줄 세우기 (백준, Java)"
description: "각 학생들에게 우선순위가 부여될 때, 줄을 세울 수 있는 방법을 묻는 문제이다. 💡 아이디어 위상정렬을 이용하는 가장 기본적인 문제이다. 각 노드에 대한 진입차수를 저장하는 배열을 선언하고 BFS"
publishedAt: 2025-03-18
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: 213b232c-b72b-4407-9471-84689aa22a8e
  url: https://velog.io/@lhs5427ll/%EC%A4%84-%EC%84%B8%EC%9A%B0%EA%B8%B0-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/2252
![](/images/velog/줄-세우기-백준-java-01.webp)

각 학생들에게 우선순위가 부여될 때, 줄을 세울 수 있는 방법을 묻는 문제이다.

## 💡 아이디어
위상정렬을 이용하는 가장 기본적인 문제이다.

각 노드에 대한 진입차수를 저장하는 배열을 선언하고 BFS를 이용하여 학생들을 줄 세운다.

여기서 진입 차수는 "해당 학생 앞에 적어도 몇 명이 있어야 하는가" 를 뜻한다.

## 🛠️ 풀이 과정

### 1. 진입차수 배열 degree[] 선언
입력값을 (a, b)라고 할 때 b의 진입차수가 하나씩 증가해야 하므로 degree[b]++ 연산을 수행한다.

### 2. 큐에 초기값으로 진입차수가 0인 노드를 넣는다.

진입차수가 0이라는 것은 우선순위가 가장 높다는 뜻이므로 가장 먼저 탐색한다.

### 3. 다음으로 탐색하는 노드들의 진입차수를 1씩 낮추며 진입 차수가 0이 된 노드들을 큐에 삽입한다.

우선순위가 0인 (가장 높은) 노드를 탐색한 뒤에는 우선순위가 1인 노드들의 우선순위를 0으로 만들어 다음으로 탐색해야 한다.

## 💻 소스 코드

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
