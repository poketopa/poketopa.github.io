---
title: "[HTTP] 주소창에 넣는 그거"
description: "이제는 설명할 수 있다"
publishedAt: 2025-06-10
updatedAt: 2026-08-14
category: Development
tags: ["네트워크","웹"]
cover: /covers/velog/http-주소창에-넣는-그거-cover.webp
source:
  platform: Velog
  id: 6a57bdf1-ab64-44cd-9968-1a973db73f3b
  url: https://velog.io/@lhs5427ll/HTTP-%EC%A3%BC%EC%86%8C%EC%B0%BD%EC%97%90-%EB%84%A3%EB%8A%94-%EA%B7%B8%EA%B1%B0
draft: false
---
## 💬 시작하며

> 전공자로서 **"HTTP가 뭔가요?" **
하는 질문에 **"그,,, 네이버,,, 주소창,,,"** 할 수 없기에 
HTTP에 대해서 공부하고 내용들을 요약해 포스팅으로 남긴다.

---


## 🧱 HTTP 메시지 구조

HTTP는 클라이언트(보통 브라우저 또는 프론트)와 서버(백엔드)가 **데이터를 주고받기 위한 약속된 규칙**이다.

HTTP 메시지는 **요청(Request)**와 **응답(Response)** 두 가지가 있고 각각은 아래와 같은 구조이다.

### 📬 요청 메시지 구조

```
요청줄 (Request Line)
헤더1: 값
헤더2: 값
...

[빈 줄]

본문 (Body)

```


### 📩 응답 메시지 구조
```
상태줄 (Status Line)
헤더1: 값
헤더2: 값
...

[빈 줄]

본문 (Body)

```

---

## 📬 요청줄 (Request Line)

요청줄은 클라이언트가 서버에 "이런 작업을 해줘!"라고 말하는 핵심 명령이다.

구조는 다음과 같다.

> **<HTTP 메서드> <요청 경로 (라우트)> <HTTP 버전>**
예시) GET /users/123 HTTP/1.1


## ✉️ 상태줄 (Status Line)

상태줄은 서버가 요청을 어떻게 처리했는지를 알려준다.

구조는 다음과 같다.

> **<HTTP 버전> <상태 코드> <설명 메시지>**
예시) HTTP/1.1 200 OK

요청에 대한 응답이 성공하거나 실패했을 때 출력되는 것이 상태 코드와 설명 메시지이다.

유명한 에러 메시지인 **404 NOT FOUND**가 **<상태 코드>**와 **<설명 메시지>**의 구조이며,
**404 NOT FOUND** 에서 **404가 상태코드, NOT FOUND가 설명 메시지**이다.

> **상태 코드는 응답을 받는 서버에서 해석하는 숫자 코드이기 때문에 필수적이고, 설명 메시지는 사람이 보기 편하게 만들어놓은 주석이기 때문에 커스터마이징이 가능하고 사용하지 않아도 된다.**

### 🧾 대표적인 상태 코드와 설명 메시지

| 상태 코드 | 설명 메시지 (Reason Phrase) |
| --- | --- |
| 100 | Continue |
| 200 | OK |
| 201 | Created |
| 202 | Accepted |
| 204 | No Content |
| 301 | Moved Permanently |
| 302 | Found |
| 304 | Not Modified |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 409 | Conflict |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |




---

## 📄 빈 줄 (CRLF: Carriage Return + Line Feed)

#### **헤더와 본문 사이에는 반드시 빈 줄이 하나 있어야 한다.**

빈 줄을 통해 HTTP의 헤더와 바디를 구분할 수 있게 된다.


```
POST /login HTTP/1.1
Content-Type: application/json
Authorization: Bearer ...

📄 <빈 줄>

{
  "username": "lee",
  "password": "1234"
}
```

빈 줄이 빠지면 HTTP Body를 정상적으로 해석할 수 없다.

---

## 🧾 Header

> "이 메시지가 어떤 정보인지 설명해주는 메타데이터(Meta-data)"
>

헤더는 **Body를 어떻게 해석해야 하는지, 이 메시지를 어떻게 처리해야 하는지를 알려주는 설명서** 역할을 한다.

---

### 🔹 자주 쓰는 Request Header

| 헤더 | 설명 | 예시 |
| --- | --- | --- |
| `Content-Type` | Body의 포맷 명시 | `application/json` |
| `Authorization` | 인증 정보 (토큰 등) | `Bearer eyJhbGciOi...` |
| `Accept` | 클라이언트가 받고 싶은 데이터 타입 | `application/json` |
| `User-Agent` | 요청 보낸 클라이언트 종류 | `Mozilla/5.0 ...` |
| `Cookie` | 저장된 쿠키 전달 | `SESSIONID=abc123` |

---

### 🔸 자주 쓰는 Response Header

| 헤더 | 설명 | 예시 |
| --- | --- | --- |
| `Content-Type` | Body의 형식 | `application/json` |
| `Set-Cookie` | 쿠키 저장 지시 | `Set-Cookie: token=xyz; HttpOnly` |
| `Cache-Control` | 캐시 제어 정책 | `no-cache` |
| `Location` | 리다이렉트 주소 | `Location: /login` |

---

## 📦 Body

> **HTTP로 전하는 메시지의 핵심 데이터**

Body는 HTTP 메시지에서 실제 데이터를 담는 부분이다. 
특히 POST, PUT, GET과 같은 메서드에서 중요한 역할을 한다.

**HTTP Body는 그 자체로 특정 데이터 형식을 정의하지 않지만, Header의 Content-Type을 통해 해당 데이터가 어떤 형식인지를 명시한다.**

**예를 들어 Body로 JSON형식의 데이터가 전달될 때 Body의 데이터는 아무 의미를 갖지 않지만, 
Content-Type을 applcation/json으로 정함으로써 요청을 받는 쪽에서 Body를 JSON으로 해석하게 되는 것이다.**

---

### ✏️ Body에 담기는 데이터 예시

| Content-Type | 설명 | 사용 예 |
| --- | --- | --- |
| `application/json` | JSON 형식 | `{"id":"lee", "pw":"1234"}` |
| `application/x-www-form-urlencoded` | key=value 형식 | `id=lee&pw=1234` |
| `multipart/form-data` | 파일 업로드 포함 | 이미지, 문서 업로드 |
| `text/plain` | 텍스트 | 로그, 메모 등 단순 텍스트 |

---

## ✅ 정리

- HTTP 메시지는 Header + Body로 구성된다.
- **Header는 메타 정보 (누구? 어떻게?)**
- **Body는 실제 전달하고자 하는 내용**
- Spring을 포함한 백엔드 프레임워크들은 이 구조에 맞춰 자동 매핑해준다.
- 실무에서는 헤더 설정 실수로 API 통신이 안 되는 경우가 많다.
