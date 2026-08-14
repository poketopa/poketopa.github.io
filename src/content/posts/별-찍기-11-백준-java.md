---
title: "별 찍기 - 11 (백준, JAVA)"
description: "재귀 함수 이용 별 찍기 문제이다. ❌ 기존 풀이 작은 삼각형을 하나 출력하는 함수를 만들고, 삼각형이 출력되지 않는 위치의 패턴을 찾으려고 했다. 그림과 같이 각 삼각형의 위치를 숫자로 카운팅하"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: 54cf0a91-077d-4dd3-8007-99fa31fb5e06
  url: https://velog.io/@lhs5427ll/%EB%B3%84-%EC%B0%8D%EA%B8%B0-11-%EB%B0%B1%EC%A4%80-JAVA
draft: false
---
https://www.acmicpc.net/problem/2448

![](/images/velog/별-찍기-11-백준-java-01.webp)

재귀 함수 이용 별 찍기 문제이다.


## ❌ 기존 풀이
![](/images/velog/별-찍기-11-백준-java-02.webp)

작은 삼각형을 하나 출력하는 함수를 만들고, 삼각형이 출력되지 않는 위치의 패턴을 찾으려고 했다.

![](/images/velog/별-찍기-11-백준-java-03.webp)

그림과 같이 각 삼각형의 위치를 숫자로 카운팅하며 5, 12, 13, 14 등 삼각형이 등장하지 않는 카운트에 패턴이 있을 것이라고 생각했지만 재귀를 이용해야 했다.


## 💡 풀이 아이디어

재귀는 항상 가장 큰 곳부터 가장 작은 곳 (조건이 성립되는 지점)까지 실행되야 하기 때문에 패턴을 먼저 파악해야한다.

![](/images/velog/별-찍기-11-백준-java-04.webp)

**패턴은 삼각형이 3개 반복된다는 것이다.**

(위 삼각형, 왼쪽 아래 삼각형, 오른쪽 아래 삼각형)

​

이를 이용해서 삼각형의 크기를 절반으로 줄여가며 **재귀를 수행**할 수 있다.

(크기가 3이 될 시, print를 수행한다.)


또한, 왼쪽 아래, 오른쪽 아래 삼각형을 그릴 때 위 삼각형의 좌표를 기준으로 그려야 하기 때문에 String 2차원 배열을 선언하여 값을 할당한다. (빈 공간은 공백 (" "))

![](/images/velog/별-찍기-11-백준-java-05.webp)

#### 초기 삼각형의 크기가 24일 때,

삼각형의 크기가 12인 삼각형 3개 (하늘색)

**- 재귀 (크기 /= 2)**

삼각형의 크기가 6인 삼각형 3개 (주황색)

**- 재귀 (크기 /= 2)**

삼각형의 크기가 3인 삼각형 3개 (빨간색)

**- 조건 충족 (크기 == 3)**

-> 삼각형 프린팅


## 💻 소스 코드
```
import java.io.*;
import java.util.*;

public class Main {
    static int answer = Integer.MAX_VALUE;
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int input = Integer.parseInt(br.readLine());
        String[][] map = new String[input][2 * input - 1];

        for (int i = 0; i < map.length; i++) Arrays.fill(map[i], " ");
        
        star(input, 0, input - 1, map);

        // BufferedWriter를 이용하여 출력
        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[0].length; j++) {
                bw.write(map[i][j]);
            }
            bw.newLine(); // 줄 바꿈
        }
        
        bw.flush(); // 버퍼 비우기
        bw.close(); // BufferedWriter 닫기
    }

    private static void star(int length, int y, int x, String[][] map) {
        if (length == 3) {
            map[y][x] = "*";
            map[y + 1][x - 1] = "*";
            map[y + 1][x + 1] = "*";
            map[y + 2][x - 2] = "*";
            map[y + 2][x - 1] = "*";
            map[y + 2][x] = "*";
            map[y + 2][x + 1] = "*";
            map[y + 2][x + 2] = "*";
            return;
        }

        int half = length / 2;
        star(half, y, x, map);
        star(half, y + half, x - half, map);
        star(half, y + half, x + half, map);
    }
}
```
