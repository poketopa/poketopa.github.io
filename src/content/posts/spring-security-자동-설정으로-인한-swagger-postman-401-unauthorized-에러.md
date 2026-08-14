---
title: "Spring Security 자동 설정으로 인한 Swagger, Postman 401 Unauthorized 에러"
description: "API 테스트 도중 Swagger나 Postman에서 401 Unauthorized와 403 Forbidden 에러가 발생하였다. Spring Security의 자동 보안 설정이 원인이었다. 상황 Spring Boot 프로젝트에서 Swagger 또는 Postman을 이용해 다음과 같이 API를 호출 하지만 다음과 같…"
publishedAt: 2025-07-22
updatedAt: 2026-08-14
category: Development
tags: ["Spring"]
cover: /covers/velog/spring-security-자동-설정으로-인한-swagger-postman-401-unauthorized-에러-cover.webp
source:
  platform: Velog
  id: b08864a9-990a-4802-9f53-f7a9a69be672
  url: https://velog.io/@lhs5427ll/Spring-Security-%EC%9E%90%EB%8F%99-%EC%84%A4%EC%A0%95%EC%9C%BC%EB%A1%9C-%EC%9D%B8%ED%95%9C-Swagger-Postman-401-Unauthorized-%EC%97%90%EB%9F%AC
draft: false
---
API 테스트 도중 Swagger나 Postman에서 `401 Unauthorized`와 `403 Forbidden` 에러가 발생하였다.

Spring Security의 **자동 보안 설정**이 원인이었다.

---

## 상황

Spring Boot 프로젝트에서 Swagger 또는 Postman을 이용해 다음과 같이 API를 호출

``` bash
POST /api/users/signup
```

하지만 다음과 같은 오류가 발생

- **401 Unauthorized**
- **403 Forbidden**

모든 API 요청이 인증 없이 접근 불가

---

## 원인

**Spring Security의 자동 구성(autoconfiguration)**

Spring Boot에서 `spring-boot-starter-security` 의존성이 프로젝트에 포함되어 있으면 다음과 같은 동작이 기본 적용된다:

- 기본 In-Memory 유저 계정 생성
- 모든 요청에 인증(Authentication) 요구

따라서 명시적으로 Security 설정을 하지 않으면, 모든 요청이 기본 보안 필터에 걸려 **인증되지 않은 사용자**로 간주되고 요청이 거절된다.

---

## 해결 방법: Security 자동 설정 비활성화

아래 어노테이션 설정을 통해 **Spring Security 자동 설정을 제거**할 수 있다.

```java
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

```

> 이 설정은 전체 Spring Security 기능을 비활성화하므로,
> 
> 
> 임시로 테스트할 때만 사용하고, 이후에는 반드시 제거해야 한다.
>
