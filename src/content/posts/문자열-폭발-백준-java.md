---
title: "문자열 폭발 (백준, Java)"
description: "❌ 틀린 풀이 코드 난이도에 비해서 문제가 너무 쉽다고 생각했으나, 메모리 초과가 발생했다. 이유는 replace 매서드가 호출될 때마다 새로운 메모리를 생성하기 때문. ✅ StringBuilde"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: 10710637-00b7-4a30-a7d4-9cf8daa73086
  url: https://velog.io/@lhs5427ll/%EB%AC%B8%EC%9E%90%EC%97%B4-%ED%8F%AD%EB%B0%9C-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/9935

## ❌ 틀린 풀이 코드
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

난이도에 비해서 문제가 너무 쉽다고 생각했으나, 메모리 초과가 발생했다.


이유는 replace 매서드가 호출될 때마다 새로운 메모리를 생성하기 때문.

## ✅ StringBuilder를 이용해야 한다.

### ✅ String (불변, Immutable)

String은 한 번 생성되면 수정 불가

+ 연산이나 replace()를 할 때마다 새로운 객체가 생성됨 (메모리 낭비)


### ✅ StringBuilder (가변, Mutable)

동일 객체 내에서 수정 가능 → 메모리 낭비 없음


스택을 사용하여 한글자가 들어올 때마다 마지막 인덱스를 검사(타겟 단어의 길이만큼)하여 확인하는 아이디어


## 📌 StringBuilder 기본 문법 정리
![](/images/velog/문자열-폭발-백준-java-01.webp)

## 💻 정답 코드
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

## 🛠 추가로 기억할 것

### substring(0, str.length())

String기본형과 StringBuilder에서 모두 사용 가능

이 때, end-1 인덱스 까지만 잘리므로 주의


### sb.delete(0, str.length()) /

문자열을 삭제한다.

substring과 같이 end-1 인덱스까지만 삭제된다.
