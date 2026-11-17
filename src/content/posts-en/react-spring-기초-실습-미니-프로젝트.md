---
title: "React–Spring Basics: A Mini Practice Project"
description: "Aw, it's a baby mini project."
publishedAt: 2025-05-08
updatedAt: 2026-08-14
category: Development
tags: ["Java","React","Spring"]
cover: /covers/react-thumbnail.png
source:
  platform: Velog
  id: ddf686cb-8e57-4c34-9ac1-7b5f52f28d1e
  url: https://velog.io/@lhs5427ll/React-Spring-%EA%B8%B0%EC%B4%88-%EC%8B%A4%EC%8A%B5-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%AF%B8%EB%8B%88-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8
draft: false
---
# ✨ Overview
![](/images/velog/react-spring-기초-실습-미니-프로젝트-01.webp)

**A record of connecting a local Spring + MySQL backend to a simple blog page I built while taking a React course.**
<br>

<br>

---

## 📁 Original structure: a React-only blog

#### The blog built in the React course initially had the following structure.

- Post list page
- Post creation page
- Post details + comment creation
<br>
![](/images/velog/react-spring-기초-실습-미니-프로젝트-02.webp)

**The blog post and comment page built with React code.**
<br>

![](/images/velog/react-spring-기초-실습-미니-프로젝트-03.webp)

#### All post and comment data used on the page was hardcoded in a single **`data.js`** file.
<br>

> I wanted to see firsthand how React and Spring exchange data,
so I decided to connect a real local DB to the page and experience the entire flow.

<br>

---

## ⚙️ Additional technologies

### 1. **Spring Boot**

- Backend for saving and processing posts/comments on the server.
- Provides a REST API (exchanging data through POST, GET, and so on).
<br>

### 2. **MySQL (using Docker)**

- Stores posts and comments in an actual database.
- A reliable storage structure considering development and deployment.

<br>

---

## 🛠️ Direction of the changes

Previously, React handled data by loading the hardcoded contents of  
`data.js`.

> **But connecting to a DB requires an additional structure linking the frontend and backend.**

### 📦 axios: the tool needed for the DB connection

To send HTTP requests from React to the Spring server,  
I **introduced a library called `axios`**.

> `axios` is a Promise-based JavaScript HTTP client,  
> commonly used to communicate with REST APIs in React.

<br>

---

## ✏️ Modifying the existing React code

<br>

### ✅ MainPage.jsx (post list)

``` java
import { posts } from "../data";
<PostList posts={posts} />

```
<br>

### 🔄 After modification (fetching from the Spring server)

``` java
import axios from "axios";
import { useEffect, useState } from "react";

const [posts, setPosts] = useState([]);

useEffect(() => {
  axios.get("http://localhost:8080/posts")
    .then((res) => setPosts(res.data))
    .catch((err) => console.error(err));
}, []);

```

<br>

---

### ✅ PostWritePage.jsx (post creation)

``` java
const handleSubmit = () => {
  alert(`제목: ${title}\n내용: ${content}`);
  navigate("/");
};

```

<br>

### 🔄 After modification (POST request to the Spring server)

``` java
const handleSubmit = async () => {
  try {
    await axios.post("http://localhost:8080/posts", {
      title,
      content
    });
    navigate("/");
  } catch (err) {
    alert("글 작성에 실패했습니다.");
  }
};

```

<br>

---

## 📌 Spring code design

#### When a user writes a post in React,

#### that data is sent to the Spring server through `axios.post("/posts")`.

<br>

The request is then saved to the DB through **the following process**.

### ⚙️ Overall flow

### React → Spring Controller → Service → Repository → DB

<br>

---

## 💻 Key Spring code

### 🧩 Controller: the entry point for user requests

```java
@PostMapping("/posts")
public ResponseEntity<PostResponseDto> createPost(@RequestBody PostRequestDto requestDto) {
    return ResponseEntity.ok(postService.createPost(requestDto));
}

```

<br>

### ✅ Explanation

- `@PostMapping("/posts")`: runs when a POST request arrives from the client.
- `@RequestBody`: converts the incoming JSON data to a DTO object.
- `postService.createPost(...)`: delegates to the business logic layer.

<br>

---

### ⭐️ Service: core logic processing (business layer)

```java
public PostResponseDto createPost(PostRequestDto dto) {
    Post post = Post.builder()
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .build();

    postRepository.save(post);  // 👉 DB에 저장
    return new PostResponseDto(post);
}

```
<br>

### ✅ Explanation

- Converts the DTO into an Entity and saves it to the DB through the `Repository`.
- Converts the saved `Post` back to a response DTO and returns it.

<br>

---

### 🗂️ Repository: connecting to the DB through JPA

```java
public interface PostRepository extends JpaRepository<Post, Long> {
}

```

<br>

### ✅ Explanation

- Extending `JpaRepository` automatically provides basic methods such as `save()`, `findAll()`, and `findById()`.
- DB operations are possible without writing SQL directly.

<br>

---

### 🧱 Entity: an object mapped to an actual DB table

```java
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Comment> comments = new ArrayList<>();
}

```

<br>

### ✅ Explanation

- `@Entity`: maps this class to a DB table.
- `@OneToMany`: defines the relationship with comments.
- `@JsonManagedReference`: prevents circular references during serialization.

<br>

---

# 🐳 Docker

## What is Docker?

> A tool that packages an entire development environment so it runs identically anywhere.
>

Package the language environment, DB, ports, settings, versions, and everything else in a Docker container, and anyone you give it to can immediately run it in the same environment.

| Problems with the old approach | Benefits of Docker |
| --- | --- |
| Bugs caused by different development environments | Standardizes the environment (regardless of OS, version, and so on) |
| Tedious manual MySQL installation and configuration | Runs the DB with one line |
| Reinstallation burden for deployment/collaboration | Just copy the container |

#### The philosophy of running identically in any environment resembles that of Java's JVM.

<br>

---

## 📦 Docker configuration used in the project

In this project, I ran only the **MySQL DB** in Docker.

### 📄 docker-compose.yml

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-container
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: miniblog
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:

```

<br>

---

# 😎 Checking the results
#### I used myCLI to decode Korean in the terminal environment.
<br>

### DB test
![](/images/velog/react-spring-기초-실습-미니-프로젝트-04.webp)

#### I checked the DB tables.

> Posts - post
Comments - comment

---

### Post test
![](/images/velog/react-spring-기초-실습-미니-프로젝트-05.webp)
![](/images/velog/react-spring-기초-실습-미니-프로젝트-06.webp)

#### I confirmed successful storage in the content table.

---

### Comment test

![](/images/velog/react-spring-기초-실습-미니-프로젝트-07.webp)
![](/images/velog/react-spring-기초-실습-미니-프로젝트-08.webp)

#### I confirmed successful storage in the comment table.

<br>

---

## ✨ Overall flow summary

``` yaml
📍 React (포트 3000)
    |
    |  POST /posts
    |  { title: "...", content: "..." }
    v
📍 Spring Boot (포트 8080)
    |
    |  @PostMapping("/posts") → DTO 변환
    |  → Service: Entity 생성
    |  → Repository: JPA save()
    v
📍 MySQL (포트 3306)
    |
    |  INSERT INTO post ...
    v
📍 Spring → JSON 응답 → React 목록 재조회
```

---

### 💬 Thoughts afterward

>**The technologies used in this project were basic yet very important.
AI has increased what I “can do,”
but I feel that what I can actually say I “know” is decreasing instead.
To keep this tradeoff of the AI era from happening to me,
I need to study and understand the fundamentals thoroughly.**

**[Practice code on GitHub]** (https://github.com/Poketopa/react-spring-prac)
