---
title: "[Java] 🌳 모든 클래스의 어머니, Object 클래스에 대하여"
description: "자바 클래스는 트리 구조일까? 'Object' 와 자바 클래스 구조에 대한 질문과 해답"
publishedAt: 2025-04-16
updatedAt: 2026-08-14
category: Development
tags: ["Java"]
cover: /covers/velog/java-모든-클래스의-어머니-object-클래스에-대하여-cover.webp
source:
  platform: Velog
  id: b613d280-2c3b-44bd-8172-122042d0653c
  url: https://velog.io/@lhs5427ll/Java-%EB%AA%A8%EB%93%A0-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%96%B4%EB%A8%B8%EB%8B%88-Object-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC
draft: false
---
### 🐣 시작은 그냥 단순한 궁금증이었다

Spring으로 프로젝트를 하다가 `SimpleJdbcInsert`라는 클래스를 쓰게 됐는데,

이 클래스를 Object에 저장하는 것을 보고 문득 이런 생각이 들었다.

> **Object는 뭐길래 이것저것 다 들어가지..?**

이러한 궁금증으로 Object에 대해서 공부하게 되었고, 그 과정에서 생긴 질문과 답변을 기록하기 위해 글을 작성한다.

---

## 🧱 `Object`는 모든 클래스의 부모다

먼저 Object는 모든 클래스 부모이기에 Integer, Double, String 등 기본 자료형을 모두 담을 수 있다는 것을 알게 되었다.

### 🧐 그럼 파이썬이랑 똑같은거 아니야?

> 파이썬은 동적 타입(dynamic typing)언어이다.

그렇기에 변수는 어떤 타입이든 담을 수 있고, 타입이 자동으로 결정된다.

> 그러나 자바는 정적 타입(static typing)언어이다.

그래서 Object 변수는 어떤 객체든 담을 수 있지만, 꺼낼 때는 다시 원래 타입으로 형변환을 해야 한다.

```
String name = (String) o; // ✅ 형변환
System.out.println(name.length()); // OK
```

---

## 💁‍♂️ 그건 알겠는데 어떻게 Spring 클래스도 Object에 담길 수 있는거야?

나는 외부에서 import하는 라이브러리는 기존 자바 클래스와 개별적으로 관리되는 클래스라고 생각했다.

그렇기에 어떻게 스프링의 클래스를 Object에 넣을 수 있는지 이해가 되지 않았다.

마치 int형 변수에 "ABC"를 넣는 느낌이랄까?

### ✅ 외부 클래스도 `Object`의 자식이다

> **자바로 만든 클래스는 무조건 Object를 상속한다.**
>

스프링이든 내가 만든 클래스든, 자바 클래스라면 모두 `Object` 트리 위에 얹히는 구조다.

자바 클래스의 최상위 클래스는 Object이고, 다른 클래스는 Object의 하위 클래스로 **상속** 되는 것이다.
![](/images/velog/java-모든-클래스의-어머니-object-클래스에-대하여-01.webp)



---

```
public final class Integer extends Number {
    ...
}
```
즉 위 코드처럼 모든 클래스는 상속받는 클래스가 존재하지만 표현이 생략되어있다.

그래서 자바에서 클래스를 만드는 순간부터 이미 `Object`의 자식이 되는 것이다.

---

### 📌 나의 깨달음:

> “외부 라이브러리를 import 한다는 건 새로운 트리를 가져오는 게 아니라,
> 
> 
> 자바의 기존 클래스 트리에 새로운 **가지(branch)** 를 붙이는 행위다.”
> 
---



---

### ✅ 정리하며

- 자바의 클래스 구조는 **트리(Tree) 구조**다.
- 그 트리의 루트(최상위)는 **`Object`**
- `extends`는 클래스 간의 상속을 나타내고, 생략되어도 `Object`를 자동 상속
- 외부 라이브러리 클래스도 자바 클래스이기 때문에 당연히 `Object` 자식
- `Object` 타입에는 모든 객체를 담을 수 있다 (하지만 사용할 때는 형변환 필요)

---

### 🔥 학습 한 줄 요약

> "자바에서 클래스를 만든다는 건, 결국 Object라는 거대한 트리에 가지 하나를 더 붙이는 것이다."
>
