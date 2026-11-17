---
title: "Break Walls and Move 4 (Baekjoon, Java)"
description: "A BFS problem: find the number of tiles reachable from a wall tile. Running BFS separately for each wall exceeded the time limit. 💡 Idea: the regions reachable from each wall…"
publishedAt: 2025-03-18
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: fb4f31d4-53c1-41aa-ab54-20ecdcf20ed9
  url: https://velog.io/@lhs5427ll/%EB%B2%BD-%EB%B6%80%EC%88%98%EA%B3%A0-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-4-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/16946
![](/images/velog/벽-부수고-이동하기-4-백준-java-01.webp)

This is a BFS problem. We need to find the number of tiles reachable from a wall tile.

Running BFS separately for each wall exceeded the time limit.

## 💡 Idea

Finding the regions reachable from each wall has high time complexity because it repeats BFS operations.

I thought of **filling each region with the number of tiles reachable within it**.

![](/images/velog/벽-부수고-이동하기-4-백준-java-02.webp)

Dividing the regions gives the arrangement above.

The numbers of reachable tiles in each region are 2, 3, 1, 1, 1, and 1.

I chose to fill each region with a region number and create a hash map mapping (region number - tile count).

## 🛠️ Solving the problem

![](/images/velog/벽-부수고-이동하기-4-백준-java-03.webp)

#### I used BFS to fill each region with a number.

Region 1 - 2
Region 2 - 3
Region 3 - 4
Region 4 - 5
Region 5 - 6
Region 6 - 7

![](/images/velog/벽-부수고-이동하기-4-백준-java-04.webp)

#### I also mapped each region number to its tile count in a hash map.

![](/images/velog/벽-부수고-이동하기-4-백준-java-05.webp)

Finally, traverse the array and check the accessible (non-wall) tiles above, below, left, and right of each wall tile.

The yellow wall tile in the image above can reach regions 1, 2, and 3.

![](/images/velog/벽-부수고-이동하기-4-백준-java-06.webp)

As with the yellow wall in the image, some adjacent regions may have the same number.

Here, the tiles above and to the left have the same number (2).

To avoid this duplication, I used a Set so duplicate tiles would not be counted multiple times.

![](/images/velog/벽-부수고-이동하기-4-백준-java-07.webp)

Implementation was not easy, and I got it wrong several times.

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
        int column = Integer.parseInt(st.nextToken());
        int row = Integer.parseInt(st.nextToken());
        int[][] map = new int[column][row];
        int[][] clone = new int[column][row];
        for(int i=0;i<column;i++){
            String str = br.readLine();
            for(int j=0;j<row;j++) {
                map[i][j] = str.charAt(j) - '0';
                clone[i][j] = map[i][j];
            }
        }
        int[] y = new int[]{1, -1, 0, 0};
        int[] x = new int[]{0, 0, 1, -1};
        Queue<int[]> queue = new LinkedList<>();
        HashMap<Integer, Integer> hash = new HashMap<>();
        int[][] visited = new int[column][row];
        int count = 2;
        for(int i=0;i<column;i++){
            for(int j=0;j<row;j++){
                if(clone[i][j] == 0){
                    int many = 0;
                    queue.add(new int[]{i, j});
                    visited[i][j] = 1;
                    while(!queue.isEmpty()){
                        int[] temp = queue.poll();
                        many++;
                        clone[temp[0]][temp[1]] = count;
                        for(int k=0;k<4;k++){
                            int newY = temp[0] + y[k];
                            int newX = temp[1] + x[k];
                            if(0<=newY && newY<column
                             &&0<=newX && newX<row
                             &&clone[newY][newX] == 0
                             &&visited[newY][newX] == 0){
                                visited[newY][newX] = 1;
                                queue.add(new int[]{newY, newX});
                            }
                        }
                    }
                    hash.put(count, many);
                    count++;

                }
            }
        }

        Set<Integer> set = new HashSet<>();
        for(int i=0;i<column;i++){
            for(int j=0;j<row;j++){
                if(map[i][j] == 1){
                    set.clear();
                    for(int k=0;k<4;k++){
                        int newY = i + y[k];
                        int newX = j + x[k];
                        if(0<=newY && newY<column
                         &&0<=newX && newX<row
                         &&map[newY][newX] == 0){
                            set.add(clone[newY][newX]);
                        }
                    }
                    for(int k : set){
                        map[i][j] += hash.getOrDefault(k, 0);
                    }
                    map[i][j] %= 10;
                }
            }
        }




        for (int i = 0; i < column; i++) {
            StringBuilder sb = new StringBuilder();
            for (int j = 0; j < row; j++) {
                sb.append(map[i][j]); // 한 줄을 먼저 만든 후
            }
            bw.write(sb.toString()); // 한 번에 출력
            bw.newLine();
        }
        bw.flush(); // 출력 버퍼 비우기
        bw.close(); // BufferedWriter 닫기
    }
}
```
