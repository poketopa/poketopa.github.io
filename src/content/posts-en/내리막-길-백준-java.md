---
title: "Downhill (Baekjoon, Java)"
description: "Wrong idea. Since the goal is to count all possibilities, I thought BFS / DFS could solve it. BFS is optimized for shortest paths and DFS for counting possibilities, so I used DFS, but it timed out. I used a visited array to avoid searching places I had already passed..."
publishedAt: 2025-09-25
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: c3c1531e-065f-4e34-90d1-cf260e04186a
  url: https://velog.io/@lhs5427ll/%EB%82%B4%EB%A6%AC%EB%A7%89-%EA%B8%B8-%EB%B0%B1%EC%A4%80-Java
draft: false
---

https://www.acmicpc.net/problem/1520
![](/images/velog/내리막-길-백준-java-01.webp)

### Wrong idea
Since the goal is to count all possibilities, I thought BFS / DFS could solve it. BFS is optimized for shortest paths and DFS for counting possibilities, so I used DFS, but it timed out.
``` java
public static void dfs(int[][] map, int nowY, int nowX, int[][] visited){
		// 도착하면 백
		if(nowY == map.length-1 && nowX == map[0].length-1){
			count++;
			return;
		}
		for(int i=0;i<4;i++){
			int newY = nowY + y[i];
			int newX = nowX + x[i];
			if(0 <= newY && newY < map.length
			&& 0 <= newX && newX < map[0].length
			&& visited[newY][newX] == 0
			&& map[nowY][nowX] > map[newY][newX]){
				visited[newY][newX] = 1;
				dfs(map, newY, newX, visited);
				visited[newY][newX] = 0;
			}
		}
	}
```
I used a visited array to avoid searching places I had already passed. But this approach does nothing across different paths.

![](/images/velog/내리막-길-백준-java-02.webp)

Even with a visited array, the red and light blue paths do not affect each other at all.

### Idea
In the diagram above, the two paths overlap at coordinate (3, 1), with value 24. At that moment of overlap, we need to know, "If I take this path, how many ways can I eventually reach the destination?"

Add a DP array, update it when reaching the destination, and take the sum of DP values when backtracking. That way, instead of searching an already traveled path again, we can determine how many ways it offers to reach the destination.

### Process

![](/images/velog/내리막-길-백준-java-03.webp)

1. Red line
Reach the destination (10) through DFS. Now backtrack to (0, 0), updating DP to 1 along the way. From now on, paths that touch the red line stop advancing and begin backtracking. (There is only one way to reach the destination)

2. Blue line
When the search touches the red line, backtrack. Then explore again along the branch leading to the orange line.

3. Orange line
When the orange line touches the blue line during exploration, return. At the branching coordinate (0, 3), the blue and orange DP values combine to make 2. As we return to the origin, the DP value at the origin becomes 3. Returning that value gives a result of 3.

![](/images/velog/내리막-길-백준-java-04.webp)

The completed DP array is as shown above.

### Code
``` java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
	static int[] y = {1, -1, 0, 0};
	static int[] x = {0, 0, 1, -1};
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		//StringTokenizer st = new StringTokenizer(br.readLine());

		StringTokenizer st = new StringTokenizer(br.readLine());
		int row = Integer.parseInt(st.nextToken());
		int column = Integer.parseInt(st.nextToken());
		int[][] map = new int[row][column];
		for(int i=0;i<row;i++){
			StringTokenizer st2 = new StringTokenizer(br.readLine());
			for(int j=0;j<column;j++){
				map[i][j] = Integer.parseInt(st2.nextToken());
			}
		}
		int[][] dp = new int[row][column];
		for(int i=0;i<row;i++) Arrays.fill(dp[i], -1);

		System.out.print(dfs(map, 0, 0, dp));
	}
	public static int dfs(int[][] map, int nowY, int nowX, int[][] dp){
		// 도착하면 백
		if(nowY == map.length-1 && nowX == map[0].length-1){
			return 1;
		}
		if(dp[nowY][nowX] != -1){
			return dp[nowY][nowX];
		}

		dp[nowY][nowX] = 0;

		for(int i=0;i<4;i++){
			int newY = nowY + y[i];
			int newX = nowX + x[i];
			if(0 <= newY && newY < map.length
			&& 0 <= newX && newX < map[0].length
			&& map[nowY][nowX] > map[newY][newX]){
				dp[nowY][nowX] += dfs(map, newY, newX, dp);
			}
		}

		return dp[nowY][nowX];
	}
}

```
