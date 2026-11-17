---
title: "Printing Stars - 11 (Baekjoon, JAVA)"
description: "A star-printing problem using recursion. ❌ My original approach: I made a function to print one small triangle and tried to find a pattern in positions where triangles were absent. I numbered each triangle's position as shown…"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: 54cf0a91-077d-4dd3-8007-99fa31fb5e06
  url: https://velog.io/@lhs5427ll/%EB%B3%84-%EC%B0%8D%EA%B8%B0-11-%EB%B0%B1%EC%A4%80-JAVA
draft: false
---

https://www.acmicpc.net/problem/2448

![](/images/velog/별-찍기-11-백준-java-01.webp)

A star-printing problem using recursion.

## ❌ My original approach
![](/images/velog/별-찍기-11-백준-java-02.webp)

I made a function to print one small triangle and tried to find a pattern in the positions where triangles were absent.

![](/images/velog/별-찍기-11-백준-java-03.webp)

I numbered each triangle's position as shown and thought there would be a pattern among counts like 5, 12, 13, and 14 where triangles do not appear, but I needed to use recursion.

## 💡 Solution idea

Because recursion must always run from the largest part down to the smallest (the point where the condition is met), first identify the pattern.

![](/images/velog/별-찍기-11-백준-java-04.webp)

**The pattern is that three triangles repeat.**

(The upper triangle, lower-left triangle, and lower-right triangle)

​

Using this, we can **recurse** while halving the triangle size.

(Print when the size becomes 3.)

Also, because the lower-left and lower-right triangles must be drawn relative to the upper triangle's coordinates, declare a two-dimensional String array and assign values to it. (Empty areas contain spaces (" "))

![](/images/velog/별-찍기-11-백준-java-05.webp)

#### When the initial triangle size is 24,

Three triangles of size 12 (light blue)

**- Recurse (size /= 2)**

Three triangles of size 6 (orange)

**- Recurse (size /= 2)**

Three triangles of size 3 (red)

**- Condition met (size == 3)**

-> Print the triangle

## 💻 Source code
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
