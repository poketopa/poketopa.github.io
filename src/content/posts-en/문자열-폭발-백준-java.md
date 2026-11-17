---
title: "String Explosion (Baekjoon, Java)"
description: "❌ Incorrect solution code. I thought the problem was too easy for its difficulty rating, but I exceeded the memory limit. The reason is that each call to replace allocates new memory. ✅ StringBuilde"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: 10710637-00b7-4a30-a7d4-9cf8daa73086
  url: https://velog.io/@lhs5427ll/%EB%AC%B8%EC%9E%90%EC%97%B4-%ED%8F%AD%EB%B0%9C-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/9935

## ❌ Incorrect solution code
```
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //StringTokenizer st = new StringTokenizer(br.readLine());
        String input = br.readLine();
        String target = br.readLine();
        input = input.replace(target, "");
        while(input.length() != input.replace(target,"").length()){
            input = input.replace(target, "");
        }
        if(input.length() == 0) System.out.println("FRULA");
        else System.out.println(input);
    }
}
```

I thought the problem was too easy for its difficulty rating, but I exceeded the memory limit.

The reason is that each call to replace allocates new memory.

## ✅ Use StringBuilder.

### ✅ String (immutable)

A String cannot be modified once created.

Every + operation or replace() call creates a new object (wasted memory).

### ✅ StringBuilder (mutable)

It can be modified within the same object → no wasted memory.

The idea is to use a stack and, whenever a character arrives, check the trailing indices for the length of the target word.

## 📌 StringBuilder basic syntax
![](/images/velog/문자열-폭발-백준-java-01.webp)

## 💻 Correct solution code
```
import java.io.*;
        import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //StringTokenizer st = new StringTokenizer(br.readLine());
        String input = br.readLine();
        String target = br.readLine();
        StringBuilder sb = new StringBuilder();

        for(int i=0;i<input.length();i++){
            sb.append(input.charAt(i));
            if(sb.length()>=target.length()){
                if(sb.substring(sb.length()-target.length(), sb.length()).equals(target)){
                    sb.delete(sb.length()-target.length(), sb.length());
                }
            }
        }
        if(sb.length()==0)System.out.println("FRULA");
        else System.out.println(sb);


    }
}
```

## 🛠 Other things to remember

### substring(0, str.length())

Available for both the basic String type and StringBuilder.

Note that it only slices through index end-1.

### sb.delete(0, str.length()) /

Deletes a string.

Like substring, it only deletes through index end-1.
