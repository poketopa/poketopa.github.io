---
title: "[Java] Integer가 있는데 int를 왜 쓰나요? / 래퍼 클래스(wrapper class)에 대하여"
description: "래퍼 클래스에 대해서 ARABOJA."
publishedAt: 2025-04-18
updatedAt: 2026-08-14
category: Development
tags: ["Java"]
cover: /covers/velog/java-integer가-있는데-int를-왜-쓰나요-래퍼-클래스-wrapper-class-에-대하여-cover.webp
source:
  platform: Velog
  id: 7003bec0-8481-4c70-9184-48f8bf092358
  url: https://velog.io/@lhs5427ll/Java-Integer%EC%9D%B4-%EC%9E%88%EB%8A%94%EB%8D%B0-int%EB%A5%BC-%EC%99%9C-%EC%93%B0%EB%82%98%EC%9A%94-eku8ng03
draft: false
---
# **✍️ 서론**

**나는 알고리즘을 공부하며 늘 한 가지 의문점이 있었다.**

> 왜 `int`형이 존재하는 것일까?

`Integer`는 다양한 기능도 많고 형변환도 쉽고 `null`도 담을 수 있는데

왜 `int`를 사용해야 하는 것일까? 왜 둘은 나누어져 있는 것일까?

#### 지금부터 그 질문에 대한 해답을 정리하려고 한다.
<br>

# ✅ int와 Integer는 무엇이고, 무엇이 다른가?

자바에서는 정수를 표현할 때

`int`와 `Integer`라는 **두 가지 타입**이 존재한다.

그렇기에 나는 자바를 공부하며 이런 궁금증이 생겼다.

> “숫자를 저장하는데 왜 타입이 두 개나 필요하지?” 

처음엔 “`Integer`가 더 고급진 타입이겠지~” 라고 생각하고 지나쳤지만

실제로 이 둘은 **의미부터, 저장 방식, 동작까지 완전히 다르다**는 것을 알게되었다.

---

### 🔹 `int`는 기본형(Primitive Type)

`int`는 자바에서 제공하는 **기본 데이터 타입** 중 하나다.

8개의 기본형 타입 중 하나고,

말 그대로 “숫자 그 자체”를 저장하는 타입이다.

```java
int a = 10;

```

- 여기서 `a`는 숫자 10을 **값 자체로 저장**한다.
- 메모리의 스택(stack) 영역에 바로 `10`이라는 숫자가 올라감
- **null 값을 가질 수 없음**

---

### 🔸 `Integer`는 참조형(Reference Type), 즉 객체다

반면 `Integer`는 **클래스**다.

`java.lang.Integer`라는 이름을 가진 **래퍼 클래스(Wrapper Class)** 이고,

내부적으로는 `int value`라는 필드를 갖고 있다.

```java
Integer b = 10;
```

- 이건 `int`가 아니라 **Integer라는 객체**를 만들어서 그 안에 10을 넣는 것
- 메모리에는 스택에는 **객체의 주소**, 힙에는 **실제 Integer 객체**가 존재
- `null`을 저장할 수 있음 (`Integer b = null;`)

---

## ✨ 정리

| 구분 | int | Integer |
| --- | --- | --- |
| 타입 | 기본형 (primitive) | 참조형 (reference) |
| 저장 위치 | 스택에 값 직접 저장 | 스택에 주소, 힙에 객체 저장 |
| null 허용 | ❌ 불가능 | ✅ 가능 |
| 메서드 제공 | ❌ 없음 | ✅ `.compareTo()`, `.toString()` 등 |
| 컬렉션 사용 | ❌ 불가 (List<int> 불가능) | ✅ 가능 (List<Integer>) |


---

# ✨ 그렇다면 int가 Integer보다 우월한 상황은 언제일까?

### 1. 🔥 **성능이 중요한 반복 연산**

```java
int sum = 0;
for (int i = 0; i < 1_000_000; i++) {
    sum += i;
}
```

이 코드를 `Integer`로 바꿔본다면?

```java
Integer sum = 0;
for (int i = 0; i < 1_000_000; i++) {
    sum += i;  // 오토언박싱 + 덧셈 + 오토박싱 반복
}
```

> 🚨 내부적으로 계속 int → Integer, Integer → int 변환이 일어나기 때문에
> 
> 
> **객체 생성 + GC(Garbage Collector) 부담**이 크다.
> 

---

### 2. 💡 **null이 절대 들어오면 안 되는 상황**

- `int`는 기본형이라서 **null 자체가 들어올 수 없음**
- 반면 `Integer`는 참조형이라서 **null 참조 시 NPE(Null Pointer Exception) 발생 가능**


> 그래서 “절대로 null이 들어오면 안 되는 필드”는 int로 선언하는 게 안전하다.
> 

---

### 3. ✏️ **단순 수학 계산만 필요할 때**

- `int`는 연산자 `+`, , , `/`이 바로 적용됨
- `Integer`는 내부적으로 언박싱을 거쳐야 계산 가능

```java
int result = (a + b) * c;
```

`Integer`로 쓰면 결국 내부에서 `intValue()` 꺼내서 연산하고

다시 `Integer`로 감싸야 한다. → **부하 발생**

---

### 4. 🧼 **메모리 사용량을 줄여야 할 때**

- `int`는 4바이트 (32bit)
- `Integer`는 객체니까 내부적으로 **추가적인 메모리 구조**를 가짐 (객체 헤더 등)

```java
int[] arr = new int[1000000];         // 4MB
Integer[] arr = new Integer[1000000]; // 최소 16MB 이상 (객체 100만 개)

```

---

# ✅ 박싱, 언박싱, 그리고 오토박싱이란?

앞에서 `int`는 값이고 `Integer`는 객체라는 것을 정리했다.

이 두 타입은 자동, 혹은 수동으로 변환되기도 하는데

이걸 바로 **박싱(Boxing)**, **언박싱(Unboxing)**이라고 부른다.

그리고 이것이 **자동으로 일어나는** 걸 **오토박싱(Auto Boxing)**이라고 한다.

---

## 🟦 박싱(Boxing)

> 기본형 → 참조형으로 바꾸는 것
> 

즉, `int`를 `Integer`로 감싸는 것.

```java
int a = 10;
Integer b = Integer.valueOf(a); // 박싱 (수동)

```

- `int` 값 10을 `Integer` 객체로 감쌌다.
- 내부적으로는 `new Integer(a)` 대신 **`Integer.valueOf(a)`*가 사용된다.

---

## 🟨 언박싱(Unboxing)

> 참조형 → 기본형으로 바꾸는 것
> 

즉, `Integer`를 다시 `int`로 꺼내는 것.

```java
Integer a = Integer.valueOf(10);
int b = a.intValue(); // 언박싱 (수동)

```

- `Integer` 안에 들어 있는 int 값을 꺼낸다.
- `.intValue()` 같은 메서드를 통해 꺼냄.

---

## 🟩 오토박싱 / 오토언박싱

> 자바가 알아서 박싱/언박싱을 해주는 기능
> 

```java
int a = 10;
Integer b = a;       // 오토박싱

Integer c = 20;
int d = c;           // 오토언박싱

```

- `a`가 자동으로 `Integer.valueOf(a)`로 감싸짐
- `c`가 자동으로 `c.intValue()`로 꺼내짐
- **자바 컴파일러가 자동으로 해주는 기능**이라 굉장히 자주 쓰인다

---


## ⚠️ 오토박싱 주의사항

**오토박싱은 편하지만, 비용이 있다.**

```java
List<Integer> list = new ArrayList<>();
for (int i = 0; i < 1000000; i++) {
    list.add(i); // 오토박싱 100만 번 발생
}
```

- 이 코드는 `int` → `Integer`로 100만 개 객체를 만들게 된다.
- 즉, **메모리와 성능에 영향을 줄 수 있음**

그래서 반복문, 연산이 많을 땐 **기본형 `int` 사용이 훨씬 효율적**이다.

# ✅ 객체에서의 비교연산자와 캐싱

Integer 끼리 == 비교 연산자를 이용하여 비교하면 잘못된 결과가 나올 수 있다는 것을 알게 되었다.

```java
Integer a = 100;
Integer b = 100;
System.out.println(a == b);       // true?

Integer c = 200;
Integer d = 200;
System.out.println(c == d);       // false?

```

`Integer`에 `100`을 할당하고 비교할 땐 `true`가 반환되지만, `200`을 할당하는 경우 `false`가 반환될 수 있다.
                                            
**이유가 무엇일까?**
                                          

---

## 🧊 자바는 -128 ~ 127 사이의 Integer를 캐싱한다

이것은 자바의 **성능 최적화 전략**이다.

자바는 `Integer.valueOf(int)`를 호출할 때

-128부터 127 사이의 값은 **미리 만들어둔 객체를 재사용**한다.

```java
Integer a = 100;
Integer b = 100;
// 같은 객체를 참조함 → a == b → true

```

```java
Integer c = 200;
Integer d = 200;
// 서로 다른 객체를 새로 생성 → c == d → false

```

이걸 **Integer 캐시(Integer Cache)**라고 부른다.

---

### 🔍 내부적으로는 이렇게 동작한다

```java
public static Integer valueOf(int i) {
    if (i >= -128 && i <= 127)
        return IntegerCache.cache[i + 128];
    else
        return new Integer(i);
}

```

즉, 캐시 범위 안에 들어오면 같은 객체,

범위를 벗어나면 새로운 객체가 생성된다.

---

## ❗  ==와 equals중 어떤 것을 사용해야 할까?

- `==`는 **객체가 같은지를 비교**한다 (주소 비교)
- `.equals()`는 **값이 같은지를 비교**한다.

```java
Integer a = 128;
Integer b = 128;

System.out.println(a == b);       // false ❌
System.out.println(a.equals(b));  // true ✅

```

- `a == b` → 서로 다른 객체니까 false
- `a.equals(b)` → 내부 값이 같으니까 true

---
                             
# 🌟 후기
>나는 알고리즘을 공부하며 자바라는 언어에 대해서 잘 알고 있다고 생각했지만, 전혀 아니었던 것 같다.
>자바의 원리, 설계 철학, 메모리 관리 등에 대해서도 열심히 공부해야겠다.
