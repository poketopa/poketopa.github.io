---
title: "@NoArgsConstructor: 안전한 객체 생성을 위한 접근 제어"
description: "JPA는 자신만의 공간이 필요해요"
publishedAt: 2025-07-11
updatedAt: 2026-08-14
category: Development
tags: ["JPA","Spring"]
cover: /covers/velog/noargsconstructor-안전한-객체-생성을-위한-접근-제어-cover.webp
source:
  platform: Velog
  id: 5f1698cd-1cef-4e0a-9cdb-94a4756d5331
  url: https://velog.io/@lhs5427ll/NoArgsConstructor-%EC%97%90%EC%84%9C%EC%9D%98-PROTECTED-%EC%82%AC%EC%9A%A9
draft: false
---
## JPA의 엔티티 생성

**`JPA`는 엔티티를 `DB`로부터 가져온다.**

**정확히는DB에서 조회한 데이터를 기반으로 엔티티 객체를 생성하거나 재사용한다.**

> **그렇다면 JPA가 DB로부터 값을 가져올 때마다 인스턴스를 생성할 수 있는가?**

### 답은 **'아니다.'**

JPA는 트랜잭션 안에서 동일한 엔티티는 `영속성 컨텍스트 (Persistence Context)`에 보관하고, 이미 관리 중인 엔티티가 있으면 **새로 생성하지 않고 재사용**하기 때문이다.

---

### JPA가 DB에서 데이터를 꺼내오는 과정

#### 1. 엔티티 클래스의 컴파일 시점을 모르기 때문에 리플렉션 (Reflection)으로 객체를 생성
_리플렉션: 런타임에 클래스의 정보를 보고, 조작할 수 있는 기능_
#### 2. JPA는 비어있는 생성자를 호출

<br>

#### 3. 각 필드에 DB 값을 주입

<br>

즉, JPA가 DB에서 값을 가져와서 사용할 수 있는 **비어있는 (파라미터가 없는) 생성자를 필요**로 하게 된다.

``` java
protected Member() {
        ...
}
```

#### 위처럼 비어있는 생성자를 직접 만들 수도 있고,

`@NoArgsConstructor`

#### 편리하게 애노테이션을 사용할 수도 있다.


> **그러나 애노테이션의 기본 접근 제한자로 인해서 발생할 수 있는 문제가 존재한다.**

---

## @NoArgsConstructor의 접근 제한자

`@NoArgsConstructor` 애노테이션의 **기본 접근 제한자**는 **public**이다.

여기서 어떤 **문제**가 발생할 수 있을까?

**비어있는 생성자**를 만드는 것은 JPA가 사용할 수 있는 **공간을 할당**해주기 위함이다.

> **그런데 생성자의 접근 제한자를 public으로 생성한다면?**

#### 외부에서 아무 값 없이 `new Member()` 등을 호출 가능!
- 필수 값이 누락되거나, null 값으로 잘못된 엔티티가 만들어질 수 있다.

---

## 이를 해결하기 위한 방법은?

`@NoArgsConstructor(access = AccessLevel.PROTECTED)` 를 이용한다.

접근 제한자를 `protected`로 설정하여, 외부에서의 **잘못된 생성 호출**을 막고, JPA가 비어있는 생성자에 DB에서 가져온 값을 **안전하게 주입**할 수 있도록 한다.

### ❌ @NoArgsConstructor

### ✅ @NoArgsConstructor(access = AccessLevel.PROTECTED)
