---
title: "Jackson 라이브러리와 DTO 규칙"
description: "Jackson 라이브러리란? 자바와 JSON을 서로 변환시키는 라이브러리이다. Spring에서 선택한 converter이며, 표준으로 사용된다. 자바를 JSON으로 변환하는 것을 직렬화, 반대를 역직렬화라고 한다. 문제 상황 프로젝트 진행 중, Request DTO 코드에서 @AllArgsConstructor 애노테…"
publishedAt: 2025-12-21
updatedAt: 2026-08-14
category: Development
tags: ["Java","Spring"]
cover: /covers/velog/jackson-라이브러리와-dto-규칙-cover.webp
source:
  platform: Velog
  id: f544c67c-ff91-4830-a617-1a3cb1d55cdf
  url: https://velog.io/@lhs5427ll/Jackson-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EC%99%80-DTO-%EA%B7%9C%EC%B9%99
draft: false
---
### Jackson 라이브러리란?
자바와 JSON을 서로 변환시키는 라이브러리이다.

Spring에서 선택한 converter이며, 표준으로 사용된다.

자바를 JSON으로 변환하는 것을 직렬화, 반대를 역직렬화라고 한다.

### 문제 상황
프로젝트 진행 중, Request DTO 코드에서 @AllArgsConstructor 애노테이션을 사용하는 경우, @NoArgsConstructor 애노테이션도 포함하여 빈 생성자를 만들어두는 것이 관행이라는 것을 알게 되었다.

이것은 Response DTO에는 적용되지 않고, Response DTO에만 적용되는 조건이었다.

![](/images/velog/jackson-라이브러리와-dto-규칙-01.webp)


### 이유
이는 Jackson에서 JSON을 자바로 변환하는 과정 때문인데, Jackson은 JSON 데이터를 자바로 옮길 때, 빈 객체를 생성한 뒤에 데이터를 하나씩 파싱한다. (리플렉션으로 필드에 값을 주입한다.)

이를 위해 JSON을 자바로 저장해야 하는 Request DTO에서는 Jackson의 파싱 동작을 위해 빈 생성자를 만들어야 한다는 것이다.

반대로 자바를 JSON으로 파싱하는 과정에서는 자바 객체를 읽기만 하면 되므로, @Getter 애노테이션만 존재하면 동작한다.

### 다른 대안은 없을까?
#### 1. 생성자 관련 애노테이션이 없을 경우
모든 Request DTO에 @NoArgsConstructor 애노테이션이 필요한 것은 아니다. 

만약, @AllArgsConstructor 등 생성자에 관한 애노테이션이 존재하지 않는다면 자바는 자동으로 기본 생성자를 만들게 된다.
![](/images/velog/jackson-라이브러리와-dto-규칙-02.webp)

그러므로, 생성자에 관한 애노테이션이 존재한다면 @NoArgsConstructor 애노테이션 또한 추가되어야 하고, 존재하지 않는다면 없어도 된다.

#### 2. record 불변 객체 사용
record는 데이터가 변하지 않는 불변 객체이기 때문에, 기본 생성자를 만들 수 없다.

그렇기에, Jackson은 record에서 일반적인 클래스와는 다르게 동작하는데, 빈 생성자에 리플렉션으로 필드에 값을 주입하지 않고 JSON에서 데이터를 읽어 전체 생성자 (AllArgsConstructor)을 호출하여 한 번에 객체를 만들게 된다.

데이터를 수정하지 않고 주고받기만 하는 DTO의 경우에는 record를 적극 사용하는 것이 좋은 것 같다.
