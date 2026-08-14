---
title: "Node.js 실습 코드 복기"
description: "🛠 연락처 관리 웹앱 Node.js & Express / MongoDB, EJS, JWT 인증 📌 실습 소개 Node.js + Express + MongoDB + EJS 템플릿 엔진을 기반으로 한 연락처 관리 웹 애플리케이션 회원가입 → 로그인 → 연락처 등록/조회/수정/삭제 기능 CRUD 을 구현하면서 백엔드와…"
publishedAt: 2025-03-30
updatedAt: 2026-08-14
category: Development
tags: ["node.js"]
source:
  platform: Velog
  id: 24c3ea39-93e7-41cd-bd4c-129124679e93
  url: https://velog.io/@lhs5427ll/Node.js-%EC%8B%A4%EC%8A%B5-%EC%BD%94%EB%93%9C-%EB%B3%B5%EA%B8%B0
draft: false
---
# 🛠 연락처 관리 웹앱 (Node.js & Express / MongoDB, EJS, JWT 인증)

## 📌 실습 소개

**Node.js + Express + MongoDB + EJS 템플릿 엔진**을 기반으로 한 **연락처 관리 웹 애플리케이션**

회원가입 → 로그인 → 연락처 등록/조회/수정/삭제 기능(CRUD)을 구현하면서 **백엔드와 서버 동작 원리**를 실습
![](/images/velog/node-js-실습-코드-복기-01.webp)


---

## 🧩 사용 기술 스택

| 기술 | 설명 |
| --- | --- |
| **Node.js** | 자바스크립트 런타임 |
| **Express** | 서버 구축을 위한 프레임워크 |
| **MongoDB** | NoSQL 데이터베이스 |
| **Mongoose** | MongoDB ODM (객체 모델링) |
| **EJS** | 템플릿 엔진 (HTML에 JS 삽입) |
| **JWT** | 로그인 인증용 JSON Web Token |
| **cookie-parser** | 쿠키 저장 및 인증을 위한 미들웨어 |
| **dotenv** | 환경변수 관리 |

---

## 📂 폴더 구조 (중요 파일만 요약)

```
myContacts/
├── app.js              # 서버 메인 파일
├── .env                # 환경변수
├── config/
│   └── dbConnect.js    # MongoDB 연결 설정
├── controllers/
│   ├── contactController.js
│   └── loginController.js
├── models/
│   ├── contactModel.js
│   └── userModel.js
├── routes/
│   ├── contactsRoutes.js
│   └── loginRoute.js
├── views/
│   ├── index.ejs       # 연락처 목록
│   ├── add.ejs         # 연락처 추가
│   ├── update.ejs      # 연락처 수정
│   ├── home.ejs        # 로그인 페이지
│   ├── register.ejs    # 회원가입
│   └── includes/
│       ├── _header.ejs
│       └── _footer.ejs
├── public/
│   └── style.css
└── package.json

```

---

## 🔑 구현된 주요 기능

1. 🔐 **회원가입 & 로그인 기능**
    - bcrypt로 비밀번호 암호화
    - JWT로 로그인 토큰 발급
    - 쿠키에 토큰 저장
2. 📇 **연락처 CRUD 기능**
    - 연락처 등록, 목록 조회, 수정, 삭제
    - MongoDB에 저장
    - EJS 템플릿으로 데이터 바인딩
3. 🛡 **미들웨어, 라우팅, 컨트롤러 분리**
    - MVC 패턴 학습

---

## 🧠 배운 개념들

- **라우터 → 컨트롤러 → 모델 → 뷰** 흐름
- HTTP 요청 방식: `GET`, `POST`, `PUT`, `DELETE`
- 비동기 처리 (`async/await`)
- MongoDB 기본 구조 및 CRUD
- 쿠키 / 세션 / JWT 인증 차이
- EJS에서 조건문, 반복문, include 사용법
- .env 환경변수 설정 및 관리

# 📦 `app.js` — Express 서버의 시작점


> 
>  app.js는 **서버 실행 흐름**, **라우팅 등록**, **미들웨어 설정**, **환경변수 사용법** 등을 정리한다.
> 

---

## 📄 전체 코드

```
// 모듈 불러오기
const express = require("express");
const path = require("path");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // .env 파일을 읽어 환경변수 설정

// Express 앱 초기화
const app = express();

// DB 연결 실행
dbConnect();

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// EJS 템플릿 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일(css 등) 경로 설정
app.use(express.static(path.join(__dirname, "public")));

// 라우터 등록
const contactsRoutes = require("./routes/contactsRoutes");
const loginRoutes = require("./routes/loginRoute");

app.use("/contacts", contactsRoutes);
app.use("/", loginRoutes);

// 서버 시작
app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});

```

---

## ✅ 코드 설명

### 1. `require()` — 모듈 불러오기

```
const express = require("express");
const path = require("path");

```

- `express` : Node.js에서 가장 널리 쓰이는 웹 서버 프레임워크
- `path` : 파일/폴더 경로를 설정할 때 사용한다. OS 상관없이 안전하게 경로를 연결할 수 있게 도와준다.
---

### 📌 질문 : `require("dotenv").config();`란?

- `dotenv`는 `.env` 파일을 읽어서 `process.env.변수명`으로 접근할 수 있게 해주는 라이브러리이다.
- `config()` 메서드를 호출하면 `.env` 파일이 메모리에 로드된다.
- 예를 들어 `.env`에 작성된 `JWT_SECRET=123456` 이라는 값은 `process.env.JWT_SECRET`으로 사용 가능해진다.

---

### 📌 질문 : .env 파일이 보호받는 원리는?

.env 파일은 Node.js 내부에서만 사용되는 설정 파일이고,
클라이언트(브라우저)로 절대 전송되지 않으며,
.gitignore로 Git에 업로드되지 않도록 설정하는 것이 원칙이다.

#### ✅ 자세한 설명
1. .env 파일은 서버 측 코드에서만 사용됨
.env 파일은 dotenv 모듈을 통해 서버 실행 시 process.env 객체에 변수로 등록된다.

서버에서만 읽히고, **브라우저(클라이언트)**에는 절대 노출되지 않는다.

```
require("dotenv").config();
const key = process.env.API_KEY; // 서버에서만 접근 가능
```
#### ❌ 클라이언트가 이 값을 직접 볼 수는 없다. (HTML, JS 파일에는 포함되지 않음)
---

### 2. `dbConnect();` — MongoDB 연결

```
const dbConnect = require("./config/dbConnect");
dbConnect();

```

- **DB 연결 설정 함수**
- 내부에서 `mongoose.connect()` 등을 호출해 MongoDB 서버와 연결한다.

---

### 3. 미들웨어 설정

```
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
```
---
### 미들웨어(Middleware)란?
   - 클라이언트 요청(req)과 서버 응답(res) 사이에서 동작하는 중간 처리 로직이다.
   - 예를 들어, 요청 데이터를 가공하거나, 인증 여부를 확인하거나, 공통 로그를 찍는 등의 역할을 한다.
   
####    쉽게 req를 매개변수로 받고 res를 리턴하는 함수의 동작을 미들웨어라고 이해할 수 있다.
---
- `express.json()` :
    - 클라이언트가 보낸 **JSON 데이터**를 `req.body`에 자동으로 넣어준다.
    - API 요청에서 `Content-Type: application/json`인 경우 사용된다.
    <br>
- `express.urlencoded({ extended: true })` :
    - **HTML form** 방식으로 전달된 데이터를 `req.body`에 넣어준다.
    - EJS에서 `<form method="POST">` 를 사용할 때 필수이다.
    <br>
- `cookieParser()` :
    - 클라이언트가 보낸 **쿠키**를 `req.cookies`로 파싱해주는 미들웨어이다.
    - JWT 토큰 인증에서 쿠키에 저장된 토큰을 꺼낼 때 사용한다.

---

### 4. 뷰 템플릿 설정

```
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

```

- 뷰 엔진으로 **EJS**를 사용한다고 지정한다.

### ✅ EJS란?

> EJS (Embedded JavaScript) 는
> 
> 
> HTML 안에 **JavaScript 코드를 넣을 수 있는 템플릿 엔진**
> 

---

### ✅ 사용 이유

보통 **서버에서 데이터를 받아서 HTML에 전하기 위해 사용**

HTML로만 페이지를 만들면, 고정된 정적인 웹페이지만 만들 수 있다.

하지만 EJS를 쓰면, 백엔드에서 받은 데이터를 페이지에 동적으로 표시할 수 있다.

---

### ✅ 주요 특징

| 특징 | 설명 |
| --- | --- |
| HTML 안에서 JavaScript 사용 가능 | `<%= %>`, `<% %>` 문법 사용 |
| 백엔드 데이터와 연동 | 서버에서 넘겨준 값을 페이지에 출력 가능 |
| 빠르고 간편 | React보다 가볍고 학습 난이도 낮음 |
| Express와 잘 어울림 | Node.js + Express에서 많이 사용됨 |

---

### 5. 정적 파일 등록

```
app.use(express.static(path.join(__dirname, "public")));

```

- CSS, 이미지, JS 파일처럼 **정적 자원**들을 서빙하는 폴더를 설정한다.
- `public` 폴더 안에 있는 파일은 브라우저에서 직접 접근 가능하다. (`/style.css`, `/logo.png` 등)

---

### 6. 라우터 등록

```
const contactsRoutes = require("./routes/contactsRoutes");
const loginRoutes = require("./routes/loginRoute");

app.use("/contacts", contactsRoutes);
app.use("/", loginRoutes);

```
### ✅ 라우터(Router)란?

> **라우터(Router)**는 사용자의 요청 URL과 HTTP 메서드(GET, POST 등) 에 따라
> 
> 
> **어떤 코드(컨트롤러)를 실행할지 정해주는 역할**
>
- `/contacts`로 시작하는 요청은 `contactsRoutes.js`에서 처리한다.
- `/` (루트) 요청은 로그인 관련 라우팅을 담당하는 `loginRoute.js`에서 처리한다.

### ✅ 라우터를 쓰는 이유?

| 이유 | 설명 |
| --- | --- |
| 코드 분리 | 라우팅 로직을 routes 폴더에 따로 작성 가능 |
| 가독성 향상 | 경로별로 깔끔하게 정리 가능 |
| 유지보수 쉬움 | 기능별로 파일이 분리되어 수정이 쉬움 |

📌 라우터 파일에서 정의된 상대 경로(`/`, `/add`, `/123/edit` 등)는 `app.js`의 `use()`에서 지정한 앞 경로에 **자동으로 붙는다.**

---

### 7. 서버 실행

```
app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});

```

- 로컬호스트에서 포트 3000번으로 서버를 시작한다.
- 브라우저에서 `http://localhost:3000` 으로 접속하면 서비스가 시작된다.

---

## ✅ 배운 개념들 리마인드

| 개념 | 설명 |
| --- | --- |
| `req.body` | 클라이언트가 form이나 JSON으로 보낸 데이터 |
| 미들웨어 | 요청과 응답 사이에서 중간처리 역할 |
| `.env` | 중요한 설정값(API 키, DB URI 등)을 숨기기 위한 파일 |
| `EJS` | 템플릿 엔진 (HTML에 JS 삽입 가능) |
| `라우터` | 경로에 따라 실행되는 처리기 함수 |

---


# 📁 `contactsRoutes.js` — 연락처 라우팅 담당 파일

> 
> 해당 파일은 `/contacts`로 시작하는 모든 요청을 처리하는 **라우팅 전용 파일**이다.
> 

---

## 📄 전체 코드

``` 
const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm,
} = require("../controllers/contactController");

// 연락처 전체 목록 조회
router.get("/", getAllContacts);

// 연락처 추가 폼 보여주기
router.get("/add", addContactForm);

// 연락처 추가
router.post("/add", createContact);

// 특정 연락처 상세 보기 (수정폼)
router.get("/:id", getContact);

// 연락처 수정
router.put("/:id", updateContact);

// 연락처 삭제
router.delete("/:id", deleteContact);

module.exports = router;

```

---

## ✅ 라우터란?

> 라우터(Router)는 특정 URL 경로에 따라 실행할 **처리 로직(컨트롤러 함수)**을 지정해주는 역할을 한다.
> 

예:

- `/contacts` → 전체 연락처 조회
- `/contacts/add` → 폼 보여주기 / 추가하기
- `/contacts/:id` → 수정 / 삭제

---

## 🔗 app.js와 연결 구조 복습

```
// app.js
const contactsRoutes = require("./routes/contactsRoutes");
app.use("/contacts", contactsRoutes);

```

- 이 설정으로 인해 `contactsRoutes.js` 내부의 `"/"` 는 **실제로는 `/contacts` 경로**를 의미한다.
- 즉, `router.get("/")`는 결국 `GET /contacts`로 동작한다.

---

## ✅ 주요 라우팅

### 1. 전체 연락처 목록 조회

```
router.get("/", getAllContacts);

```

- `GET /contacts` 요청 시 실행
- 컨트롤러의 `getAllContacts()` 함수에서 DB 데이터를 조회 후 `index.ejs`에 렌더링

---

### 2. 연락처 추가 폼 보여주기

```
router.get("/add", addContactForm);

```

- `GET /contacts/add` 요청 시 실행
- `add.ejs` 폼 페이지를 클라이언트에게 렌더링한다.

---

### 3. 연락처 생성 (POST)

```
router.post("/add", createContact);

```

- `POST /contacts/add`
- 사용자가 폼에 입력한 데이터를 받아 MongoDB에 저장
- 저장 후 `/contacts`로 리디렉션됨
---
### ✅ req.body에 정보가 어떻게 정보가 담길까?

> HTML `<form>`에서 전송된 데이터는 `app.use(express.urlencoded())` 미들웨어를 통해 `req.body`에 들어간다.

---

### 4. 연락처 상세 조회 (수정 폼)

```
router.get("/:id", getContact);

```

- `GET /contacts/:id` (예: `/contacts/123`)
- 특정 연락처를 불러와서 `update.ejs`에 렌더링

---
### ✅ /:id의 의미는?
> 라우팅 경로에서 /:id와 같이 콜론(:) 을 붙이면,
"여기에는 어떤 값이든 들어올 수 있다!" 라는 뜻

### 즉, :id는 변수처럼 동작한다.
사용자가 접속할 때마다 이 자리에 다른 값이 들어오게 된다.

### 🧩 예시
```
router.get("/contacts/:id", getContact);
```
사용자가 /contacts/1234로 접속하면:

:id는 "1234"로 해석됨

> 결과 : req.params.id === "1234"


---
### 5. 연락처 수정

```
router.put("/:id", updateContact);

```

- `PUT /contacts/:id`
- DB에서 해당 ID의 연락처를 수정함

📌 관련 개념:

- `PUT` 요청은 HTML 폼에서 직접 보낼 수 없기 때문에 **method-override** 모듈을 사용한다.
- `<form method="POST" action="/contacts/<%= contact._id %>?_method=PUT">`

---
## ✅ 왜 HTML 폼에서는 `GET`, `POST`만 지원할까?

HTML의 `<form>` 태그는 다음과 같이 작성한다:

```
<form action="/update" method="POST">
  <!-- 입력 필드들 -->
</form>

```

이때 `method="POST"` 혹은 `method="GET"`만 쓸 수 있다.

### 📌 이유:

HTML 표준(스펙)에서 `<form>` 태그는 **오직 GET과 POST만** 지원하도록 정의되어 있기 때문

즉, **HTML 자체가 PUT, DELETE 요청을 전송하는 기능을 제공하지 않는다.**

---

### ✅ 그럼 PUT/DELETE은 언제 사용 가능할까?

RESTful API를 만들 때는 이런 방식이 일반적이다.

| 요청 방식 | 설명 |
| --- | --- |
| GET | 데이터 조회 |
| POST | 새 데이터 추가 |
| PUT | 데이터 수정 |
| DELETE | 데이터 삭제 |

즉, 백엔드에서는 `PUT`이나 `DELETE`가 필요한데,

**HTML은 그걸 못 보내니까 다른 방법이 필요하다.**

---

### ✅ 해결 방법: `method-override` 모듈

`method-override`는 **POST 요청을 "가짜로" PUT이나 DELETE처럼 바꿔주는 미들웨어**이다.

### 📌 사용 방법

#### HTML:

```
<form action="/contacts/123?_method=PUT" method="POST">
  <!-- 입력 필드 -->
</form>

```

#### 서버 :

```
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

```

### ✅ 동작 방식:

- HTML은 어쩔 수 없이 POST로 요청을 보냄
- 그런데 쿼리 파라미터로 `_method=PUT`을 추가
- 서버에서 `method-override`가 `_method` 값을 읽고, **PUT으로 변경**

---

### ✅ 요약

| 구분 | 설명 |
| --- | --- |
| HTML `<form>` 지원 방식 | `GET`, `POST`만 가능 |
| `PUT`, `DELETE` 사용 목적 | RESTful 설계에서 수정/삭제를 위해 필요 |
| 해결 방법 | `method-override` 미들웨어로 해결 |
---

### 6. 연락처 삭제

```
router.delete("/:id", deleteContact);

```

- `DELETE /contacts/:id`
- 해당 ID의 연락처를 DB에서 삭제

📌 관련 개념:

- 마찬가지로 HTML에서는 `DELETE` 요청을 직접 못 보내기 때문에 `method-override`를 활용한다.

---

## 🔄 최종 정리: 처리 흐름

| 요청 URL | HTTP 메서드 | 실행 함수 |
| --- | --- | --- |
| `/contacts` | GET | getAllContacts |
| `/contacts/add` | GET | addContactForm |
| `/contacts/add` | POST | createContact |
| `/contacts/:id` | GET | getContact |
| `/contacts/:id` | PUT | updateContact |
| `/contacts/:id` | DELETE | deleteContact |

---

## ✅ 배운 개념들 리마인드

| 개념 | 설명 |
| --- | --- |
| 라우터 | URL 요청 경로와 처리 로직(컨트롤러 함수)을 연결하는 역할 |
| `router.get()` | GET 요청 (데이터 조회) |
| `router.post()` | POST 요청 (데이터 생성) |
| `router.put()` | PUT 요청 (데이터 수정) |
| `router.delete()` | DELETE 요청 (데이터 삭제) |
| `:id` | 라우트 매개변수. URL에서 ID 값을 추출할 수 있음 |

<br>


---

<br>

# 📁 `contactController.js` — 연락처 관련 비즈니스 로직 담당

> 
> 컨트롤러는 요청이 들어왔을 때 실제 **동작**을 정의한 **함수들의 집합**
> 

---

## 📄 전체 코드

```
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// 연락처 전체 조회
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.render("index", { contacts });
});

// 연락처 추가 폼 렌더링
const addContactForm = (req, res) => {
  res.render("add");
};

// 연락처 추가
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.send("필수 값이 입력되지 않았습니다.");
  }

  await Contact.create({ name, email, phone });
  res.redirect("/contacts");
});

// 특정 연락처 조회 (수정 폼 렌더링)
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update", { contact });
});

// 연락처 수정
const updateContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // 업데이트된 데이터 반환
  });
  res.redirect("/contacts");
});

// 연락처 삭제
const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/contacts");
});

module.exports = {
  getAllContacts,
  addContactForm,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

```

---

## ✅ 컨트롤러란?

> 컨트롤러는 라우터에서 연결된 함수들의 실제 동작을 담당하는 곳
> 
> 
> 즉, 클라이언트의 요청이 들어왔을 때 무슨 작업을 할지 정의된 **실행 로직**
> 

예) 사용자가 `/contacts`로 접속하면 전체 목록을 보여주거나, `/contacts/add`로 접속하면 입력 폼을 보여주는 등

---

## ✅ 함수별 설명


### 1. 전체 연락처 조회 - `getAllContacts`

```
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.render("index", { contacts });
});

```

#### 📌 설명:

- `Contact.find()`를 통해 모든 연락처 데이터를 MongoDB에서 가져온다.
- 그 결과를 `index.ejs`에 전달해서 렌더링

#### 💡 관련 개념:

- `render("index", { contacts })`: `contacts` 데이터를 EJS 파일에 넘김
- `asyncHandler`: 에러 처리를 자동화해주는 미들웨어 함수

---

### 2. 연락처 추가 폼 - `addContactForm`

```
const addContactForm = (req, res) => {
  res.render("add");
};

```

- 클라이언트가 `GET /contacts/add`로 요청하면 `add.ejs` 템플릿을 렌더링

---

### 3. 연락처 추가 처리 - `createContact`

```
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.send("필수 값이 입력되지 않았습니다.");
  }

  await Contact.create({ name, email, phone });
  res.redirect("/contacts");
});

```

#### 📌 설명:

- `req.body`: 폼 데이터를 가져옴 (`form` 요소에서 전송됨)
- 유효성 검사로 값이 비어있으면 메시지 출력
- `Contact.create()`를 통해 DB에 데이터 저장
- 저장 완료 후 `/contacts`로 리디렉션

#### 💡 관련 개념:

- `redirect("/contacts")`: 서버가 클라이언트에게 다른 URL로 이동하라고 지시

---

### 4. 수정폼 불러오기 - `getContact`

```
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update", { contact });
});

```

#### 📌 설명:

- URL에 있는 `:id` 값을 통해 DB에서 해당 연락처 정보를 조회
- `update.ejs` 페이지에 해당 연락처 데이터를 넘겨줌

#### 💡 관련 개념:

- `req.params.id`: URL의 `/:id` 부분에서 값 추출

---

### 5. 연락처 수정 처리 - `updateContact`

```
const updateContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.redirect("/contacts");
});

```

#### 📌 설명:

- 수정된 데이터를 DB에 반영
- `new: true`: 수정된 데이터를 반환하게 설정
- 수정 후 `/contacts`로 리디렉션

---

### 6. 연락처 삭제 - `deleteContact`

```
const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/contacts");
});

```

#### 📌 설명:

- `req.params.id`로 해당 연락처를 찾아서 삭제
- 삭제 완료 후 `/contacts`로 리디렉션

---

## ✅ 관련 개념 정리

| 개념 | 설명 |
| --- | --- |
| `asyncHandler` | 비동기 함수에서 try-catch 없이 에러를 자동으로 처리해주는 함수 |
| `req.body` | 클라이언트에서 보낸 폼(form) 데이터 |
| `res.render()` | EJS 템플릿 렌더링 (화면에 보여주기) |
| `res.redirect()` | 다른 페이지로 이동 (URL 변경) |
| `findById`, `create`, `update`, `delete` | Mongoose의 MongoDB 조작 메서드 |
| `new: true` | 업데이트 후 바뀐 값을 반환하도록 설정 |

<br>

---

<br>

## 📁 loginRoute.js — 로그인 및 회원가입 라우터

> 라우터는 사용자가 특정 URL에 접근했을 때 어떤 컨트롤러 함수가 실행될지를 지정해주는 역할을 한다.

---

### 📄 전체 코드

```
const express = require("express");
const {
  getLogin,
  loginUser,
  getRegister,
  registerUser,
} = require("../controllers/loginController");

const router = express.Router();

// 🔐 로그인 관련 라우팅
router.get("/", getLogin); // 로그인 폼
router.post("/", loginUser); // 로그인 요청 처리

// 🔐 회원가입 관련 라우팅
router.get("/register", getRegister); // 회원가입 폼
router.post("/register", registerUser); // 회원가입 요청 처리

module.exports = router;

```

---

## ✅ 경로별 라우팅 설명

### 1. `router.get("/")` — 로그인 폼


- 사용자가 루트 경로 `/`에 접속하면 `home.ejs` 로그인 폼을 보여준다.
- 연결된 컨트롤러 함수: `getLogin`

---

### 2. `router.post("/")` — 로그인 요청 처리


- 로그인 폼에서 POST 요청이 들어올 경우
- username, password를 확인하고 JWT 토큰을 발급한다.
- 연결된 컨트롤러 함수: `loginUser`

---

### 3. `router.get("/register")` — 회원가입 폼

- `/register`로 접속하면 `register.ejs`를 보여준다.
- 연결된 컨트롤러 함수: `getRegister`

---

### 4. `router.post("/register")` — 회원가입 처리


- 회원가입 폼에서 POST 요청 시 실행된다.
- username, password를 받아 DB에 새로운 사용자 등록한다.
- 연결된 컨트롤러 함수: `registerUser`

---

## ✅ 왜 `router.get("/")`이 루트 경로를 의미할까?

- 이 라우터 파일은 `app.js`에서 `app.use("/", loginRoutes)`로 등록되어 있기 때문에,
- 실제 경로 `/`은 루트 주소(`localhost:3000/`)에 해당하게 된다.

---

## 📁 loginController.js — 로그인 및 회원가입 처리 로직


> 사용자의 로그인 여부를 확인하고, JWT 토큰을 발급하며, 회원가입 시 암호화를 처리

---

### 📄 전체 코드

```
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

// 🔐 로그인 폼 렌더링
const getLogin = (req, res) => {
  res.render("home");
};

// 🔐 사용자 로그인 처리
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("❌ 사용자 없음");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("❌ 비밀번호가 틀렸습니다.");
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/contacts");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류 발생");
  }
};

// 🔸 회원가입 폼 렌더링
const getRegister = (req, res) => {
  res.render("register");
};

// 🔸 회원가입 처리
const registerUser = async (req, res) => {
  const { username, password, password2 } = req.body;

  if (password !== password2) {
    return res
      .status(400)
      .json({ message: "❌ 비밀번호가 일치하지 않습니다." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "✅ 회원가입 완료",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ 서버 오류로 회원가입 실패" });
  }
};

module.exports = {
  getLogin,
  loginUser,
  getRegister,
  registerUser,
};

```
---

## ✅ 함수별 설명



### 1. 로그인 폼 보여주기 - `getLogin`


- 홈 화면(home.ejs)을 보여주는 역할
- `GET /` 요청에 대응
- HTML 폼에서 `username`, `password` 입력

---

### 2. 로그인 처리 - `loginUser`



#### 📌 설명:

- DB에서 `username`을 기준으로 사용자 찾기
- 비밀번호 비교: `bcrypt.compare()` 사용
- 일치하면 JWT 토큰을 만들어서 쿠키에 저장
- 로그인 성공 시 `/contacts`로 리디렉션

#### 💡 관련 개념:

| 개념 | 설명 |
| --- | --- |
| `bcrypt.compare()` | 평문 비밀번호와 암호화된 비밀번호 비교 |
| `jwt.sign()` | 사용자 정보를 토대로 JWT 토큰 생성 |
| `res.cookie("token", token)` | 생성한 토큰을 브라우저 쿠키에 저장 |
| `res.redirect()` | 특정 페이지로 이동하도록 응답 |

---

### 3. 회원가입 폼 렌더링 - `getRegister`


- 회원가입 입력 폼(register.ejs)을 보여줌

---

### 4. 회원가입 처리 - `registerUser`

#### 📌 설명:	

- 비밀번호와 비밀번호 확인이 일치하는지 검사
- `bcrypt.hash()`로 비밀번호 암호화
- DB에 사용자 정보 저장
- JSON 응답으로 결과 반환

---

## ✅ 질문

### `catch(error)`는 어떤 상황에서 실행될까?

- 위에서 예상하지 못한 서버 오류가 발생했을 때 실행됨
- 예: 데이터베이스 오류, bcrypt 에러 등

### Q3. `module.exports = { ... }` 는 뭘까?

- 여러 개의 함수를 객체 형태로 외부로 내보낸다.
- 외부에서 해당 모듈을 임포트할 때 불러와 사용하는 객체들의 목록
- `함수의 모음`이자 하나의 모듈로서 라우터에서 사용 가능

---

## ✅ 개념 정리

| 개념 | 설명 |
| --- | --- |
| JWT 토큰 | 인증을 위해 발급하는 일회용 암호 토큰 |
| 쿠키 | 클라이언트 브라우저에 저장되는 작은 데이터 조각 |
| bcrypt | 비밀번호 암호화 모듈 |
| req.body | 클라이언트가 보낸 POST 데이터 |
| 컨트롤러 | 요청 처리의 실제 로직이 담긴 함수들 |
| async/await | 비동기 처리 방식 |
| try-catch | 예외 처리 방식 |
