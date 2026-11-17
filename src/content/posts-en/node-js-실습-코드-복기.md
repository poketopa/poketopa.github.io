---
title: "Reviewing My Node.js Practice Code"
description: "🛠 Contact management web app: Node.js & Express / MongoDB, EJS, JWT authentication. 📌 Practice overview: a contact management web application based on Node.js + Express + MongoDB + the EJS template engine. Practicing backend and server behavior by implementing registration → login → contact creation/viewing/editing/deletion (CRUD)…"
publishedAt: 2025-03-30
updatedAt: 2026-08-14
category: Development
cover: /covers/nodejs-thumbnail.png
tags: ["node.js"]
source:
  platform: Velog
  id: 24c3ea39-93e7-41cd-bd4c-129124679e93
  url: https://velog.io/@lhs5427ll/Node.js-%EC%8B%A4%EC%8A%B5-%EC%BD%94%EB%93%9C-%EB%B3%B5%EA%B8%B0
draft: false
---

# 🛠 Contact management web app (Node.js & Express / MongoDB, EJS, JWT authentication)

## 📌 Practice overview

A **contact management web application** based on **Node.js + Express + MongoDB + the EJS template engine**

Practicing **how backends and servers work** by implementing registration → login → contact creation/viewing/editing/deletion (CRUD)
![](/images/velog/node-js-실습-코드-복기-01.webp)

---

## 🧩 Technology stack

| Technology | Description |
| --- | --- |
| **Node.js** | JavaScript runtime |
| **Express** | Framework for building servers |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM (object modeling) |
| **EJS** | Template engine (embedding JS in HTML) |
| **JWT** | JSON Web Token for login authentication |
| **cookie-parser** | Middleware for cookie storage and authentication |
| **dotenv** | Environment variable management |

---

## 📂 Folder structure (key files only)

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

## 🔑 Main features implemented

1. 🔐 **Registration & login**
    - Encrypt passwords with bcrypt
    - Issue login tokens with JWT
    - Store tokens in cookies
2. 📇 **Contact CRUD**
    - Create, list, edit, and delete contacts
    - Store in MongoDB
    - Bind data through EJS templates
3. 🛡 **Separate middleware, routing, and controllers**
    - Learn the MVC pattern

---

## 🧠 Concepts learned

- The **router → controller → model → view** flow
- HTTP request methods: `GET`, `POST`, `PUT`, `DELETE`
- Asynchronous processing (`async/await`)
- MongoDB's basic structure and CRUD
- Differences between cookies / sessions / JWT authentication
- Using conditions, loops, and includes in EJS
- Setting up and managing .env environment variables

# 📦 `app.js` — the entry point of the Express server

> 
> app.js brings together **server execution flow**, **route registration**, **middleware configuration**, **environment variable usage**, and more.
> 

---

## 📄 Full code

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

## ✅ Code explanation

### 1. `require()` — loading modules

```
const express = require("express");
const path = require("path");

```

- `express`: the most widely used web server framework in Node.js
- `path`: used to configure file/folder paths. Helps join paths safely regardless of OS.
---

### 📌 Question: what is `require("dotenv").config();`?

- `dotenv` is a library that reads a `.env` file and makes values accessible through `process.env.변수명` (variable name).
- Calling the `config()` method loads the `.env` file into memory.
- For example, `JWT_SECRET=123456` written in `.env` becomes accessible as `process.env.JWT_SECRET`.

---

### 📌 Question: how is the .env file protected?

.env is a configuration file used only within Node.js,
It is never sent to the client (browser),
And the general rule is to configure .gitignore so it is not uploaded to Git.

#### ✅ Detailed explanation
1. The .env file is used only by server-side code
When the server starts, the dotenv module registers variables from .env in the process.env object.

It is read only on the server and never exposed to the **browser (client)**.

```
require("dotenv").config();
const key = process.env.API_KEY; // 서버에서만 접근 가능
```
#### ❌ The client cannot see these values directly. (They are not included in HTML or JS files)
---

### 2. `dbConnect();` — connecting to MongoDB

```
const dbConnect = require("./config/dbConnect");
dbConnect();

```

- **Function for setting up the DB connection**
- Internally calls `mongoose.connect()` and similar methods to connect to the MongoDB server.

---

### 3. Middleware configuration

```
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
```
---
### What is middleware?
   - Intermediate processing logic between a client request (req) and a server response (res).
   - For example, processing request data, checking authentication, or writing shared logs.

#### Put simply, middleware can be understood as the behavior of a function that accepts req as a parameter and returns res.
---
- `express.json()`:
    - Automatically puts **JSON data** sent by the client into `req.body`.
    - Used for API requests with `Content-Type: application/json`.
    <br>
- `express.urlencoded({ extended: true })`:
    - Puts data sent through an **HTML form** into `req.body`.
    - Essential when using `<form method="POST">` in EJS.
    <br>
- `cookieParser()`:
    - Middleware that parses **cookies** sent by the client into `req.cookies`.
    - Used to retrieve tokens stored in cookies for JWT token authentication.

---

### 4. View template configuration

```
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

```

- Specifies **EJS** as the view engine.

### ✅ What is EJS?

> EJS (Embedded JavaScript) is
> 
> 
> **A template engine that lets you embed JavaScript code** in HTML
> 

---

### ✅ Why use it?

Typically **used to receive data from the server and pass it into HTML**

With HTML alone, you can only create fixed, static webpages.

But EJS lets you display data received from the backend dynamically on a page.

---

### ✅ Main features

| Feature | Description |
| --- | --- |
| Use JavaScript inside HTML | Uses `<%= %>` and `<% %>` syntax |
| Connect with backend data | Can display server-provided values on the page |
| Quick and simple | Lighter than React and easier to learn |
| Works well with Express | Widely used with Node.js + Express |

---

### 5. Registering static files

```
app.use(express.static(path.join(__dirname, "public")));

```

- Sets the folder serving **static resources** such as CSS, images, and JS files.
- Files inside `public` can be accessed directly from the browser. (`/style.css`, `/logo.png`, etc.)

---

### 6. Registering routers

```
const contactsRoutes = require("./routes/contactsRoutes");
const loginRoutes = require("./routes/loginRoute");

app.use("/contacts", contactsRoutes);
app.use("/", loginRoutes);

```
### ✅ What is a router?

> A **router** determines **which code (controller) to execute**
> 
> 
> Based on the user's request URL and HTTP method (GET, POST, etc.)
>
- Requests starting with `/contacts` are handled by `contactsRoutes.js`.
- Requests to `/` (root) are handled by `loginRoute.js`, which manages login-related routing.

### ✅ Why use routers?

| Reason | Description |
| --- | --- |
| Separate code | Routing logic can be written separately in the routes folder |
| Improved readability | Neatly organize routes by path |
| Easy maintenance | Files are separated by feature, making changes easier |

📌 Relative paths defined in a router file (`/`, `/add`, `/123/edit`, etc.) are **automatically appended** to the prefix specified in `use()` in `app.js`.

---

### 7. Starting the server

```
app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});

```

- Starts the server on localhost port 3000.
- Access the service at `http://localhost:3000` in a browser.

---

## ✅ Review of concepts learned

| Concept | Description |
| --- | --- |
| `req.body` | Data sent by the client as a form or JSON |
| Middleware | Intermediate processing between requests and responses |
| `.env` | File for hiding important settings (API keys, DB URIs, etc.) |
| `EJS` | Template engine (can embed JS in HTML) |
| `Router` | Handler function executed according to the path |

---

# 📁 `contactsRoutes.js` — contact routing file

> 
> A **dedicated routing file** handling all requests starting with `/contacts`.
> 

---

## 📄 Full code

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

## ✅ What is a router?

> A router specifies the **processing logic (controller function)** to execute for a particular URL path.
> 

Examples:

- `/contacts` → retrieve all contacts
- `/contacts/add` → show the form / add a contact
- `/contacts/:id` → edit / delete

---

## 🔗 Reviewing the connection with app.js

```
// app.js
const contactsRoutes = require("./routes/contactsRoutes");
app.use("/contacts", contactsRoutes);

```

- With this configuration, `"/"` inside `contactsRoutes.js` **actually means the `/contacts` path**.
- In other words, `router.get("/")` ultimately handles `GET /contacts`.

---

## ✅ Main routes

### 1. Retrieving the full contact list

```
router.get("/", getAllContacts);

```

- Executes on a `GET /contacts` request
- The controller's `getAllContacts()` retrieves DB data and renders it in `index.ejs`

---

### 2. Showing the add contact form

```
router.get("/add", addContactForm);

```

- Executes on a `GET /contacts/add` request
- Renders the `add.ejs` form page for the client.

---

### 3. Creating a contact (POST)

```
router.post("/add", createContact);

```

- `POST /contacts/add`
- Receives data the user entered in the form and saves it in MongoDB
- Redirects to `/contacts` after saving
---
### ✅ How does information get into req.body?

> Data sent from an HTML `<form>` is placed in `req.body` through the `app.use(express.urlencoded())` middleware.

---

### 4. Retrieving contact details (edit form)

```
router.get("/:id", getContact);

```

- `GET /contacts/:id` (for example, `/contacts/123`)
- Loads a particular contact and renders it in `update.ejs`

---
### ✅ What does /:id mean?
> Adding a colon (:) in a route path, as in /:id,
Means "any value can go here!"

### In other words, :id acts like a variable.
A different value goes here each time a user accesses the route.

### 🧩 Example
```
router.get("/contacts/:id", getContact);
```
When a user accesses /contacts/1234:

:id is interpreted as "1234"

> Result: req.params.id === "1234"

---
### 5. Updating a contact

```
router.put("/:id", updateContact);

```

- `PUT /contacts/:id`
- Updates the contact with the corresponding ID in the DB

📌 Related concepts:

- Since HTML forms cannot send `PUT` requests directly, use the **method-override** module.
- `<form method="POST" action="/contacts/<%= contact._id %>?_method=PUT">`

---
## ✅ Why do HTML forms support only `GET` and `POST`?

An HTML `<form>` tag is written as follows:

```
<form action="/update" method="POST">
  <!-- 입력 필드들 -->
</form>

```

Only `method="POST"` or `method="GET"` can be used here.

### 📌 Reason:

Because the HTML standard (specification) defines the `<form>` tag to support **only GET and POST**

In other words, **HTML itself does not provide a way to send PUT or DELETE requests.**

---

### ✅ When can we use PUT/DELETE, then?

When building RESTful APIs, the following approach is common.

| Request method | Description |
| --- | --- |
| GET | Retrieve data |
| POST | Add new data |
| PUT | Update data |
| DELETE | Delete data |

In other words, the backend needs `PUT` and `DELETE`,

But **HTML cannot send them, so we need another approach.**

---

### ✅ Solution: the `method-override` module

`method-override` is **middleware that "pretends" a POST request is PUT or DELETE**.

### 📌 Usage

#### HTML:

```
<form action="/contacts/123?_method=PUT" method="POST">
  <!-- 입력 필드 -->
</form>

```

#### Server:

```
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

```

### ✅ How it works:

- HTML has no choice but to send a POST request
- But adds `_method=PUT` as a query parameter
- On the server, `method-override` reads `_method` and **changes it to PUT**

---

### ✅ Summary

| Aspect | Description |
| --- | --- |
| Methods supported by HTML `<form>` | Only `GET` and `POST` |
| Purpose of `PUT` and `DELETE` | Needed for updates/deletions in RESTful design |
| Solution | Use `method-override` middleware |
---

### 6. Deleting a contact

```
router.delete("/:id", deleteContact);

```

- `DELETE /contacts/:id`
- Deletes the contact with the corresponding ID from the DB

📌 Related concepts:

- Likewise, since HTML cannot send `DELETE` requests directly, use `method-override`.

---

## 🔄 Final overview: processing flow

| Request URL | HTTP method | Function executed |
| --- | --- | --- |
| `/contacts` | GET | getAllContacts |
| `/contacts/add` | GET | addContactForm |
| `/contacts/add` | POST | createContact |
| `/contacts/:id` | GET | getContact |
| `/contacts/:id` | PUT | updateContact |
| `/contacts/:id` | DELETE | deleteContact |

---

## ✅ Review of concepts learned

| Concept | Description |
| --- | --- |
| Router | Connects URL request paths with processing logic (controller functions) |
| `router.get()` | GET request (retrieve data) |
| `router.post()` | POST request (create data) |
| `router.put()` | PUT request (update data) |
| `router.delete()` | DELETE request (delete data) |
| `:id` | Route parameter. Allows extracting an ID value from the URL |

<br>

---

<br>

# 📁 `contactController.js` — contact-related business logic

> 
> A controller is **a collection of functions** defining the actual **behavior** when a request arrives
> 

---

## 📄 Full code

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

## ✅ What is a controller?

> A controller handles the actual behavior of functions connected by the router
> 
> 
> In other words, **execution logic** defining what to do when a client request arrives
> 

For example, showing the full list when a user accesses `/contacts`, or an input form at `/contacts/add`

---

## ✅ Function-by-function explanation

### 1. Retrieving all contacts - `getAllContacts`

```
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.render("index", { contacts });
});

```

#### 📌 Explanation:

- Retrieves all contact data from MongoDB using `Contact.find()`.
- Passes the result to `index.ejs` for rendering

#### 💡 Related concepts:

- `render("index", { contacts })`: passes `contacts` data to the EJS file
- `asyncHandler`: a middleware function that automates error handling

---

### 2. Add contact form - `addContactForm`

```
const addContactForm = (req, res) => {
  res.render("add");
};

```

- Renders the `add.ejs` template when the client requests `GET /contacts/add`

---

### 3. Processing contact creation - `createContact`

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

#### 📌 Explanation:

- `req.body`: retrieves form data (sent by the `form` element)
- Validation displays a message if values are empty
- Saves data to the DB with `Contact.create()`
- Redirects to `/contacts` after saving

#### 💡 Related concepts:

- `redirect("/contacts")`: the server instructs the client to move to a different URL

---

### 4. Loading the edit form - `getContact`

```
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update", { contact });
});

```

#### 📌 Explanation:

- Retrieves the corresponding contact from the DB using the URL's `:id` value
- Passes the contact data to the `update.ejs` page

#### 💡 Related concepts:

- `req.params.id`: extracts the value from the URL's `/:id` part

---

### 5. Processing contact updates - `updateContact`

```
const updateContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.redirect("/contacts");
});

```

#### 📌 Explanation:

- Applies the modified data to the DB
- `new: true`: configures the operation to return the modified data
- Redirects to `/contacts` after updating

---

### 6. Deleting a contact - `deleteContact`

```
const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/contacts");
});

```

#### 📌 Explanation:

- Finds and deletes the contact using `req.params.id`
- Redirects to `/contacts` after deletion

---

## ✅ Related concepts

| Concept | Description |
| --- | --- |
| `asyncHandler` | Automatically handles errors in asynchronous functions without try-catch |
| `req.body` | Form data sent by the client |
| `res.render()` | Renders an EJS template (displays it on screen) |
| `res.redirect()` | Moves to another page (changes the URL) |
| `findById`, `create`, `update`, `delete` | Mongoose methods for operating on MongoDB |
| `new: true` | Configures an update to return the changed value |

<br>

---

<br>

## 📁 loginRoute.js — login and registration router

> A router specifies which controller function executes when a user accesses a particular URL.

---

### 📄 Full code

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

## ✅ Routing explanation by path

### 1. `router.get("/")` — login form

- Shows the `home.ejs` login form when a user accesses the root path `/`.
- Connected controller function: `getLogin`

---

### 2. `router.post("/")` — processing login requests

- When a POST request arrives from the login form
- Checks username and password, then issues a JWT token.
- Connected controller function: `loginUser`

---

### 3. `router.get("/register")` — registration form

- Shows `register.ejs` when accessing `/register`.
- Connected controller function: `getRegister`

---

### 4. `router.post("/register")` — processing registration

- Executes on a POST request from the registration form.
- Receives username and password, and registers a new user in the DB.
- Connected controller function: `registerUser`

---

## ✅ Why does `router.get("/")` mean the root path?

- Because this router file is registered in `app.js` with `app.use("/", loginRoutes)`,
- The actual path `/` corresponds to the root address (`localhost:3000/`).

---

## 📁 loginController.js — login and registration processing logic

> Checks the user's login status, issues JWT tokens, and handles encryption during registration

---

### 📄 Full code

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

## ✅ Function-by-function explanation

### 1. Showing the login form - `getLogin`

- Shows the home screen (home.ejs)
- Handles `GET /` requests
- Enter `username` and `password` in the HTML form

---

### 2. Processing login - `loginUser`

#### 📌 Explanation:

- Finds a user in the DB by `username`
- Compares passwords with `bcrypt.compare()`
- If they match, creates a JWT token and stores it in a cookie
- Redirects to `/contacts` on successful login

#### 💡 Related concepts:

| Concept | Description |
| --- | --- |
| `bcrypt.compare()` | Compares a plaintext password with an encrypted password |
| `jwt.sign()` | Creates a JWT token based on user information |
| `res.cookie("token", token)` | Stores the generated token in a browser cookie |
| `res.redirect()` | Responds with instructions to move to a particular page |

---

### 3. Rendering the registration form - `getRegister`

- Shows the registration input form (register.ejs)

---

### 4. Processing registration - `registerUser`

#### 📌 Explanation:

- Checks whether the password and confirmation match
- Encrypts the password with `bcrypt.hash()`
- Saves user information to the DB
- Returns the result as a JSON response

---

## ✅ Questions

### When does `catch(error)` execute?

- When an unexpected server error occurs above
- Examples: database errors, bcrypt errors, etc.

### Q3. What is `module.exports = { ... }`?

- Exports multiple functions as an object.
- A list of objects loaded and used when importing this module elsewhere
- A `collection of functions`, usable by the router as a module

---

## ✅ Concept summary

| Concept | Description |
| --- | --- |
| JWT token | A one-time encrypted token issued for authentication |
| Cookie | A small piece of data stored in the client browser |
| bcrypt | Password encryption module |
| req.body | POST data sent by the client |
| Controller | Functions containing the actual request processing logic |
| async/await | Asynchronous processing approach |
| try-catch | Exception handling approach |
