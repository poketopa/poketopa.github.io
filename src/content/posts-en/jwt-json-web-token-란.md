---
title: "What Is JWT (JSON Web Token)?"
description: "JWT: tastier than cookies!"
publishedAt: 2025-06-10
updatedAt: 2026-08-14
category: Development
tags: ["보안","웹"]
cover: /covers/velog/jwt-json-web-token-란-cover.webp
source:
  platform: Velog
  id: dd3247c2-69fd-47ad-ba8c-0080525f995f
  url: https://velog.io/@lhs5427ll/JWTJSON-Web-Token%EB%9E%80
draft: false
---

## 📌 What is JWT?
<br>
JWT stands for **JSON Web Token**, a lightweight, self-contained way to transmit authentication information using JSON.

**Comparing the relationship between JWT and the server to an amusement park makes it easy to understand.**
<br>
> ✅ At an amusement park, you need a ticket to go on rides.
>
>- Ticket issued by the park -> **JWT**
>- Going on a ride -> **A request the client sends to the server**

 <br>

In other words, once the client is authenticated (logged in), the server creates and issues a JWT,

Then verifies the user's authentication by having the client attach the JWT to the Header of every request.

---

## 🧩 Why did JWT emerge?

The traditional **session-cookie authentication** flow is as follows.

1. Login → The server creates a session
2. The session ID is sent to the client as a cookie
3. The client includes the session ID with every request
4. The server looks up the session in a DB or memory

But with this approach...

- The server must **remember session state**.
- **Sessions must be shared between servers**.
- There are many things to consider, including **increased memory use**.

> JWT was developed to solve these problems as a
> 
> 
> **Stateless authentication method**!!
> 
- Information is placed in the token, and the server **only verifies the token**
- No session store is needed, improving **scalability**

---

## 🌐 What does stateless mean?

What exactly does **stateless** mean when describing JWT?

---

### ✅ Having state = the server remembers (Stateful)

Traditional session authentication is **stateful**.

- When a user logs in, the server creates a session,
- Stores user information **in server memory or a DB**,
- The client carries only the session ID,
- And the server checks who that ID belongs to with every request!

> This requires the server to keep remembering the user's state (authentication information and so on).
> 

---

### ❌ Stateless = the server does not remember

JWT authentication is **stateless**.

- Issue a JWT at login (including user information and expiry time in the token)
- The server passes it to the client **without remembering it**
- The client sends the JWT with every subsequent request,
- And the server **simply verifies it** (check signature → OK or reject)

> ✅ The server neither stores the token separately nor remembers user state.
> 
> 
> ✅ It operates solely on trust in the token → hence **stateless**
> 

---

## 🧐 A simple analogy!

### ✅ A stateful amusement park

> Guests carry **only a numbered ticket**,
> And **the amusement park holds all their information**.
>
> 1. An employee receives a guest's numbered ticket.
> 2. The employee looks up the ticket number on a computer.
> 3. They check the name, date of birth, admission pass details, and so on.

#### A stateful amusement park must store all guest information in its DB.

<br>

### ❌ A stateless amusement park

> Guests carry **tickets containing all their information**.
> Each ticket shows **the guest's information and a QR code**.
>
> 1. An employee checks the guest's QR code.
> 2. If it is valid, they trust the information printed on the ticket.

#### A stateless amusement park only needs to check the QR code.

---

## 🔁 Stateful vs. stateless

| Item | Session (Stateful) | JWT (Stateless) |
| --- | --- | --- |
| Remembering state on the server | O (sessions stored) | ❌ (not remembered) |
| Server storage | Required (memory/DB, etc.) | Not required |
| Authentication method | Session ID → server lookup | The token itself is authentication information |
| Scalability | Sessions must be shared between servers | Easy horizontal server scaling |
| Security risk | Session theft | Token theft (so HTTPS is essential) |

---

## ✨ Advantages of statelessness

- Lightweight servers with good scalability
- Authentication state persists through server restarts (it does not disappear like a session)
- Can serve as a unified authentication token in a microservices architecture

---

## ⚠️ Disadvantages and considerations of statelessness

- Requires a token expiry/renewal strategy
- **Cannot force logout** because the server does not store the token
- No way to prevent misuse of a stolen token (difficult to block before reissuing)

---

## 🧱 What does a JWT look like?

A JWT consists of **three parts** separated by dots (`.`):

**[Header].[Payload].[Signature]**

<br>
Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxFRSIsImlhdCI6MTYyMDAwMDAwMH0.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```
<br>

| Part | Description |
| --- | --- |
| Header | Which algorithm to use (`alg`, `typ`) |
| Payload | The actual contents, such as user information and claims |
| Signature | An encrypted signature based on the first two parts |

<br>

> ✅ These three parts are Base64-encoded strings,
> 
> 
> And **anyone can decode and read the header and payload!**
> 

---

## 🔐 How is a JWT created, and how does it work?

### ✅ 1. Issue a token at login

```json
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "user123",
  "name": "LEE",
  "exp": 1718000000
}

```

The server creates a Signature from this data and passes the token to the client.

---

### ✅ 2. The client attaches the JWT to every request

``` json
Authorization: Bearer eyJhbGciOiJIUzI1...
```

> The standard approach is to use the Bearer type in the Authorization header!
> 

---

### ✅ 3. The server verifies the Signature to check for forgery

- If the signature is valid, authentication succeeds based on the information in the Payload
- Check the expiry time (`exp`), inspect whether the token was tampered with, and so on

---

## 🧠 JWT's encryption method (Signature)

JWT itself is **encoded (Base64), rather than encrypted**.

The key is generating the **Signature**.

The server uses a `secret key` to create a signature based on the **Header + Payload**:

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)

```

> ✅ This Signature is the key to preventing forgery
> 

※ `alg` can be chosen from various algorithms, including HMAC(SHA256), RSA, and ES256

---

## ⚠️ Cautions when using JWT

| Risk | Description |
| --- | --- |
| ❌ Including sensitive information | The Payload **can be decoded** → beware of exposing personal information |
| ❌ Token theft | Anyone who steals it can impersonate an authenticated user → HTTPS is essential |
| ⌛ Expiry management | Properly configure claims such as `exp`, `iat`, and `nbf` to maintain security |
| 🔄 Token reissuance | A refresh strategy is needed for expired tokens (refresh token pattern) |
| ❗ The none algorithm vulnerability | Allowing `alg: none` permits passage without a signature → must be blocked |

---

## ✅ Wrapping up

- JWT is a digital token containing authentication information
- It emerged to address weaknesses in session authentication
- Its structure is Header + Payload + Signature
- It uses Base64 encoding and a signature to prevent forgery
- Do not include sensitive information, and always use HTTPS
