---
title: "클래스 레벨 @Setter 사용의 위험성"
description: "Everything happens for a reason."
publishedAt: 2025-07-11
updatedAt: 2026-08-14
category: Development
tags: ["JPA","Spring"]
cover: /covers/velog/클래스-레벨-setter-사용의-위험성-cover.webp
source:
  platform: Velog
  id: 41e59b27-fb86-4b88-941f-c6817f4a2b0a
  url: https://velog.io/@lhs5427ll/%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%A0%88%EB%B2%A8-Setter-%EC%82%AC%EC%9A%A9%EC%9D%98-%EC%9C%84%ED%97%98%EC%84%B1
draft: false
---
### 클래스 레벨에서 @Setter 사용의 위험성

JPA를 사용하는 프로젝트에서 클레스 레벨에 @Setter 어노테이션을 사용하는 것은 **영속성 컨텍스트 (Persistence Context) **의 동작 방식과 **변경 감지 (Dirty Checking)** 메커니즘을 이해할 때 문제를 야기할 수 있다.

---

## 영속성 컨텍스트와 변경 감지 이해하기

영속성 컨텍스트는 JPA가 엔티티의 **생명 주기를 관리**하고, **동일성 (Identity)을 보장**하며, **쓰기 지연, 변경 감지 기능**을 제공하는 핵심 공간이다. 

> **쉽게 말하면 DB와 엔티티 코드를 연결하는 다리 역할을 한다고 할 수 있다.**

이 중, **변경 감지 (Dirty Checking)** 는 영속성 컨텍스트의 핵심 기능이다.

엔티티가 JPA에 의해 관리되는 **영속 상태 (Persist State)** 일 때, 엔티티 객체의 상태 변화를 감지하고, 트랜잭션 커밋 시점에 변경된 내용을 모아서 한 번에 **SQL 쿼리(update)**를 날린다.

#### 예를 들어
``` java
member.setName("홍길동");
```

위와 같이 setter로 엔티티의 값을 바꾸면 JPA는 다음 처럼 동작한다.

> **name 필드가 바뀌었으니 트랜젝션 끝나면 DB에도 쿼리를 날려야겠다!**

``` sql
update member
set name = '홍길동'
where id = 1
```

위와 같이 update 쿼리가 자동으로 발생한다.

---

## 무엇이 문제인가?

이처럼 JPA 변경 감지 기능을 통해 자동으로 쿼리를 발생시키는 경우 다음과 같은 문제가 발생할 수 있다.

#### - 변경 추적의 어려움:
@Setter로 발생 된 쿼리는 **"누가", "왜"** 값을 변경했는지에 대한 의도를 알 수 없다.

#### - 의도하지 않은 쿼리 발생 가능성:
개발자가 **의도하지 않은 쿼리가 발생**하여 데이터베이스로 전송될 수 있다.

#### - 유지보수와 확장의 어려움:
**엔티티의 변경 지점(메서드)**을 명확하게 하지 않으면, 유지보수성이 떨어지고 새로운 사항에 대해 확장성이 떨어질 수 있다.

---

## 그렇다면 어떻게 해야할까?

> **클래스 레벨의 @Setter 사용을 지양하고, 변경 의도를 담은 메서드를 엔티티 내에 직접 작성한다!**


``` java
public void changeName(String newName) {
        if (newName == null || newName.trim().isEmpty()) {
            throw new IllegalArgumentException("이름은 비어있을 수 없습니다.");
        }
        this.name = newName;
    }
```

위와 같이 **데이터 변경 역할을 하는 메서드를 명시**한다.

### 어떤 이점이 있을까?

#### - 코드의 가독성 향상
#### - 변경의 원인을 명확히 함
#### - 엔티티를 행위를 포함하는 도메인 객체로 만들어서 유지보수가 쉽게 함
