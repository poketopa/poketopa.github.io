---
title: "Swagger and Postman 401 Unauthorized Errors Caused by Spring Security Autoconfiguration"
description: "While testing APIs, I encountered 401 Unauthorized and 403 Forbidden errors in Swagger and Postman. Spring Security’s automatic security configuration was the cause. Situation: calling an API in a Spring Boot project using Swagger or Postman as follows. But the following errors occurred…"
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

While testing APIs, I encountered `401 Unauthorized` and `403 Forbidden` errors in Swagger and Postman.

Spring Security's **automatic security configuration** was the cause.

---

## Situation

Calling an API in a Spring Boot project using Swagger or Postman as follows

``` bash
POST /api/users/signup
```

But the following errors occurred

- **401 Unauthorized**
- **403 Forbidden**

No API requests could be accessed without authentication

---

## Cause

**Spring Security autoconfiguration**

If a Spring Boot project includes the `spring-boot-starter-security` dependency, the following behavior applies by default:

- Creation of a default in-memory user account
- Authentication required for every request

So unless Security is explicitly configured, every request is caught by the default security filter, regarded as coming from an **unauthenticated user**, and rejected.

---

## Solution: disable Security autoconfiguration

The annotation setting below can **remove Spring Security autoconfiguration**.

```java
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

```

> This setting disables all Spring Security functionality,
> 
> 
> so use it only for temporary testing and be sure to remove it afterward.
>
