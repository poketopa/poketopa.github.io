---
title: "[HTTP] That Thing You Put in the Address Bar"
description: "Now I can explain it."
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
## 💬 Introduction

> As a computer science major, when asked **“What is HTTP?” **
I can't just say **“Uh… Naver… address bar…”**, so
I studied HTTP and am leaving a summary here.

---

## 🧱 HTTP message structure

HTTP is **an agreed set of rules for exchanging data** between a client (usually a browser or frontend) and a server (backend).

There are two kinds of HTTP messages, **requests** and **responses**, each with the structure below.

### 📬 Request message structure

```
요청줄 (Request Line)
헤더1: 값
헤더2: 값
...

[빈 줄]

본문 (Body)

```

### 📩 Response message structure
```
상태줄 (Status Line)
헤더1: 값
헤더2: 값
...

[빈 줄]

본문 (Body)

```

---

## 📬 Request line

The request line is the core instruction in which the client tells the server, “Do this for me!”

Its structure is:

> **<HTTP method> <request path (route)> <HTTP version>**
Example: GET /users/123 HTTP/1.1

## ✉️ Status line

The status line tells us how the server handled the request.

Its structure is:

> **<HTTP version> <status code> <reason phrase>**
Example: HTTP/1.1 200 OK

The status code and reason phrase appear when the response to a request succeeds or fails.

The familiar error message **404 NOT FOUND** has the structure **<status code>** and **<reason phrase>**;
in **404 NOT FOUND**, **404 is the status code and NOT FOUND is the reason phrase**.

> **The status code is required because it is a numeric code interpreted by the server receiving the response. The reason phrase is a human-readable annotation, so it can be customized or omitted.**

### 🧾 Common status codes and reason phrases

| Status code | Reason phrase |
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

## 📄 Blank line (CRLF: Carriage Return + Line Feed)

#### **There must be one blank line between the headers and the body.**

The blank line distinguishes the HTTP headers from the body.

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

Without it, the HTTP body cannot be interpreted correctly.

---

## 🧾 Header

> “Metadata describing what information this message contains.”
>

Headers act as **instructions describing how to interpret the body and how to handle the message**.

---

### 🔹 Common request headers

| Header | Description | Example |
| --- | --- | --- |
| `Content-Type` | Specifies the body's format | `application/json` |
| `Authorization` | Authentication information, such as a token | `Bearer eyJhbGciOi...` |
| `Accept` | Data type the client wants to receive | `application/json` |
| `User-Agent` | Type of client sending the request | `Mozilla/5.0 ...` |
| `Cookie` | Sends stored cookies | `SESSIONID=abc123` |

---

### 🔸 Common response headers

| Header | Description | Example |
| --- | --- | --- |
| `Content-Type` | Body format | `application/json` |
| `Set-Cookie` | Instructs the client to store a cookie | `Set-Cookie: token=xyz; HttpOnly` |
| `Cache-Control` | Cache control policy | `no-cache` |
| `Location` | Redirect address | `Location: /login` |

---

## 📦 Body

> **The core data conveyed over HTTP**

The body is the part of an HTTP message that contains the actual data.
It plays an important role particularly in methods such as POST, PUT, and GET.

**An HTTP body does not define a particular data format itself; instead, the Content-Type header specifies the format of that data.**

**For example, when JSON data is sent in the body, the body's data has no meaning on its own,
but setting Content-Type to applcation/json tells the recipient to interpret it as JSON.**

---

### ✏️ Examples of body data

| Content-Type | Description | Usage example |
| --- | --- | --- |
| `application/json` | JSON format | `{"id":"lee", "pw":"1234"}` |
| `application/x-www-form-urlencoded` | key=value format | `id=lee&pw=1234` |
| `multipart/form-data` | Includes file uploads | Uploading images or documents |
| `text/plain` | Text | Plain text such as logs and notes |

---

## ✅ Summary

- HTTP messages consist of Header + Body.
- **Headers are metadata (who? how?).**
- **The body is the actual content we want to convey.**
- Backend frameworks, including Spring, map this structure automatically.
- In practice, API communication often fails because headers are configured incorrectly.
