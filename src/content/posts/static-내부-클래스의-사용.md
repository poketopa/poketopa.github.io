---
title: "static 내부 클래스의 사용"
description: "예전 프로젝트에서 작성했던 DTO 코드이다. 내부 클래스인 UserInfo와 ImageInfo를 non-static으로 선언했다가, static으로 변경하라는 코멘트를 받았다. static이 없어도 외부 클래스를 통해 객체를 생성할 수 있는데 왜 static으로 클래스를 만들어야 하는지 궁금하여 이유를 알아보았다.…"
publishedAt: 2025-12-26
updatedAt: 2026-08-14
category: Development
tags: ["Java"]
cover: /covers/velog/static-내부-클래스의-사용-cover.webp
source:
  platform: Velog
  id: b01ca86f-04b8-4d7b-a9be-a71e883087d2
  url: https://velog.io/@lhs5427ll/static-%EB%82%B4%EB%B6%80-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%9D%98-%EC%82%AC%EC%9A%A9
draft: false
---
![](/images/velog/static-내부-클래스의-사용-01.webp)
예전 프로젝트에서 작성했던 DTO 코드이다.

내부 클래스인 `UserInfo`와 `ImageInfo`를 `non-static`으로 선언했다가, `static`으로 변경하라는 코멘트를 받았다.

`static`이 없어도 외부 클래스를 통해 객체를 생성할 수 있는데 왜 `static`으로 클래스를 만들어야 하는지 궁금하여 이유를 알아보았다.

### 1. 외부 클래스 인스턴스 없이 생성 가능
가장 먼저 편의성과 직관성에 대한 이유이다.

`static`이 붙으면 외부 클래스 객체를 먼저 만들지 않아도 바로 생성할 수 있다.

```java
// Non-static
new OuterClass().new InnerClass() <- 가독성 떨어짐!!

// static
new OuterClass.InnerClass()
```

공부할수록 직관성과 가독성이 매우 중요하다는 것을 느낀다.

### 2. 메모리 누수 방지 (중요)
#### 가장 중요한 이유이다.

`static`이 없는 내부 클래스는 생성될 때 외부 클래스의 인스턴스를 참조한다.
> 
**내부 클래스가 사용 중이라면, 가비지 콜렉터가 외부 클래스를 회수하지 않아, 메모리를 할당하게 된다.**

**큰 프로젝트의 경우, 이런 문제가 쌓여 메모리 부족 에러가 발생할 수 있기에, 외부 클래스의 값에 의존하지 않는 클래스는 `static`을 관리하는 것이 필수적이다.**

### 3. 논리적 그룹화와 캡슐화
이 또한 가독성과 구조를 위한 이유이다.

**질문: `static`을 사용하면 독자적인 클래스로 취급된다는 것인데, 새로운 클래스를 만드는 것과 다를 것이 없지 않나?**

#### 답변
**1. 강한 결합성 표현**
- 어떠한 구조가 특정 API 에서만 특수하게 쓰인다는 것을 코드로 표현
- 데이터의 범위를 한정

**2. 클래스 파일 수 관리**
- 자잘한 DTO가 많아질 수록 파일 관리가 어렵다.
- 관련된 것들을 묶어 코드 파악을 용이하게 함

**3. 이름 충돌 방지**
- `UserProfile.ImageInfo`와 `Post.ImageInfo`는 같은 이름임에도 서로 다른 외부 클래스를 갖기에 다른 객체로 취금되어 충돌을 방지한다.
