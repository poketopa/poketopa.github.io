---
title: "벽 부수고 이동하기 4 (백준, Java)"
description: "BFS활용 문제이다. 벽 타일에서 이동할 수 있는 타일의 수를 구하는 문제이다. 이 때, 각각의 벽에 대해서 BFS를 진행하니 시간 초과가 발생했다. 💡아이디어 각 벽에서 이동할 수 있는 영역"
publishedAt: 2025-03-18
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: fb4f31d4-53c1-41aa-ab54-20ecdcf20ed9
  url: https://velog.io/@lhs5427ll/%EB%B2%BD-%EB%B6%80%EC%88%98%EA%B3%A0-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-4-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/16946
![](/images/velog/벽-부수고-이동하기-4-백준-java-01.webp)

BFS활용 문제이다. 벽 타일에서 이동할 수 있는 타일의 수를 구하는 문제이다.

이 때, 각각의 벽에 대해서 BFS를 진행하니 시간 초과가 발생했다.

## 💡아이디어

각 벽에서 이동할 수 있는 영역들을 찾는 방법은 반복적인 BFS 연산 때문에 시간복잡도가 높다.

나는 **각 영역에 해당 영역에서 이동할 수 있는 타일의 개수를 채워넣는 방법**을 생각했다.

![](/images/velog/벽-부수고-이동하기-4-백준-java-02.webp)

영역을 나누면 위처럼 나타낼 수 있다. 

각 영역에서 이동할 수 있는 타일은 2개, 3개, 1개, 1개, 1개, 1개이다.

나는 각 영역에 번호를 매겨서 채워넣고, (영역 번호 - 타일 개수)를 매핑하는 해시맵을 만드는 방식을 채택했다.

## 🛠️ 문제 풀이

![](/images/velog/벽-부수고-이동하기-4-백준-java-03.webp)


#### BFS를 이용하여 각 영역별로 숫자를 채워 넣었다.

1번 영역 - 2
2번 영역 - 3
3번 영역 - 4
4번 영역 - 5
5번 영역 - 6
6번 영역 - 7

![](/images/velog/벽-부수고-이동하기-4-백준-java-04.webp)

#### 또한 해시맵에 각 영역 번호에 대한 타일 갯수를 매핑하였다.

![](/images/velog/벽-부수고-이동하기-4-백준-java-05.webp)

마지막으로 배열을 탐험하며 각 벽 타일마다 상하좌우에서 접근할 수 있는 (벽이 아닌) 타일을 확인한다.

위 그림에서 노란색으로 표시한 벽 타일에서는 1, 2, 3번 영역을 탐험할 수 있다는 것을 확인할 수 있다. 

![](/images/velog/벽-부수고-이동하기-4-백준-java-06.webp)

이 때, 그림의 노란 벽처럼 상하좌우에 존재하는 영역의 번호가 같은 경우가 있을 수 있다

그림의 경우에 위, 왼쪽의 타일이 같은 번호 (2번) 를 갖는다.

이런 중복을 피하기 위해서 Set을 이용하여 중복된 타일을 여러번 연산하지 않도록 했다.


![](/images/velog/벽-부수고-이동하기-4-백준-java-07.webp)

구현이 쉽지 않아 여러번 틀렸다.


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
