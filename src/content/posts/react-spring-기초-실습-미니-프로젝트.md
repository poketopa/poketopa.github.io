---
title: "React - Spring 기초 실습 미니 프로젝트"
description: "아 미니 프로젝트가 응애에요"
publishedAt: 2025-05-08
updatedAt: 2026-08-14
category: Development
tags: ["Java","React","Spring"]
cover: /covers/velog/react-spring-기초-실습-미니-프로젝트-cover.webp
source:
  platform: Velog
  id: ddf686cb-8e57-4c34-9ac1-7b5f52f28d1e
  url: https://velog.io/@lhs5427ll/React-Spring-%EA%B8%B0%EC%B4%88-%EC%8B%A4%EC%8A%B5-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%AF%B8%EB%8B%88-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8
draft: false
---
# ✨ 개요
![](/images/velog/react-spring-기초-실습-미니-프로젝트-01.webp)


**React 강의를 수강하며 만든 간단한 블로그 페이지에, Spring + MySQL 기반 로컬 백엔드를 접목시킨 과정을 기록하였다.**
<br>

<br>

---

## 📁 기존 구조: React만 사용한 블로그

#### React 강의에서 제작한 블로그의 초기 구조는 아래와 같다.

- 글 목록 페이지
- 글 작성 페이지
- 글 상세 보기 + 댓글 작성
<br>
![](/images/velog/react-spring-기초-실습-미니-프로젝트-02.webp)

**React 코드를 이용한 블로그 포스팅, 댓글 페이지이다.**
<br>

![](/images/velog/react-spring-기초-실습-미니-프로젝트-03.webp)

#### 페이지에서 사용된 포스팅, 댓글 데이터는 모두 **`data.js`** 파일 하나에 하드코딩되어있는 상태이다.
<br>

> React와 Spring이 어떻게 데이터를 주고받는지 직접 확인해보고 싶어서
위 페이지에 실제 로컬 DB를 연결하여 전체 흐름을 경험해 보고자 했다.

<br>

---


## ⚙️ 추가로 도입한 기술

### 1. **Spring Boot**

- 글/댓글을 서버에서 저장하고 처리하기 위한 백엔드
- REST API 제공 (POST, GET 등으로 데이터를 주고받음)
<br>

### 2. **MySQL (Docker 활용)**

- 글과 댓글을 실제 데이터베이스에 저장
- 개발과 배포를 고려한 안정적인 저장 구조

<br>

---

## 🛠️ 수정 방향

기존에는 React 내에서 데이터를 처리하기 위해  
`data.js` 파일에 하드코딩된 데이터를 불러와 사용했다.

> **그러나, DB와 연결을 위해서는 FE와 BE를 잇는 구조가 추가로 필요하다.**


### 📦 DB 연결을 위해 필요한 도구 axios

React에서 Spring 서버에 HTTP 요청을 보내기 위해  
**`axios`라는 라이브러리를 도입**하였다.


> `axios`는 Promise 기반의 JavaScript HTTP 클라이언트로,  
> React에서 REST API와 통신할 때 주로 사용한다.

<br>

---

## ✏️ 기존 React 코드 수정

<br>

### ✅ MainPage.jsx (글 목록)

``` java
import { posts } from "../data";
<PostList posts={posts} />

```
<br>


### 🔄 수정 후 (Spring 서버에서 가져오기)

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

### ✅ PostWritePage.jsx (글 작성)

``` java
const handleSubmit = () => {
  alert(`제목: ${title}\n내용: ${content}`);
  navigate("/");
};

```

<br>

### 🔄 수정 후 (Spring 서버로 POST 요청)

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


## 📌 Spring 코드 설계

#### React에서 사용자가 글을 작성하면,

#### 해당 데이터는 `axios.post("/posts")`를 통해 Spring 서버로 전송된다.

<br>

그리고 해당 요청은 **다음과 같은 과정**을 통해 DB에 저장된다.

### ⚙️ 전체 흐름 요약


### React → Spring Controller → Service → Repository → DB

<br>

---

## 💻 Spring 주요 코드

### 🧩 Controller: 사용자의 요청을 받는 입구

```java
@PostMapping("/posts")
public ResponseEntity<PostResponseDto> createPost(@RequestBody PostRequestDto requestDto) {
    return ResponseEntity.ok(postService.createPost(requestDto));
}

```

<br>

### ✅ 설명

- `@PostMapping("/posts")`: 클라이언트에서 POST 요청이 들어올 때 실행
- `@RequestBody`: 요청으로 들어온 JSON 데이터를 DTO 객체로 변환
- `postService.createPost(...)`: 비즈니스 로직 처리 계층으로 위임

<br>

---

### ⭐️ Service: 핵심 로직 처리 (비즈니스 계층)

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


### ✅ 설명

- DTO를 Entity로 변환한 후, `Repository`를 통해 DB에 저장
- 저장된 `Post`를 다시 Response용 DTO로 변환하여 반환

<br>

---


### 🗂️ Repository: JPA를 통해 DB와 연결

```java
public interface PostRepository extends JpaRepository<Post, Long> {
}

```

<br>

### ✅ 설명

- `JpaRepository`를 상속하면, `save()`, `findAll()`, `findById()` 같은 기본 메서드를 자동으로 제공
- SQL을 직접 작성하지 않아도 DB 작업 가능

<br>

---

### 🧱 Entity: 실제 DB 테이블과 매핑되는 객체

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

### ✅ 설명

- `@Entity`: 이 클래스가 DB 테이블과 매핑
- `@OneToMany`: 댓글과의 관계 정의
- `@JsonManagedReference`: 직렬화 시 순환 참조 방지

<br>

---

# 🐳 Docker

## Docker란?

> Docker는 개발 환경을 통째로 포장해서 어디서든 똑같이 실행되게 해주는 도구
> 

언어 환경, DB, 포트, 설정, 버전 등 모든 걸 담고 Docker 컨테이너를 다른 사람에게 전달하면누구든 똑같은 환경에서 바로 실행할 수 있다.

| 기존 방식의 문제 | Docker의 장점 |
| --- | --- |
| 각자 개발 환경이 달라서 버그 발생 | 환경을 통일시킴 (OS, 버전 등 무관) |
| MySQL 직접 설치, 설정 번거로움 | 한 줄로 DB 실행 가능 |
| 배포/협업 시 재설치 부담 | 컨테이너만 복사하면 끝 |

#### 어떤 환경에서도 똑같이 실행할 수 있다는 철학이 Java의 JVM 철학과 닮아있다.

<br>


---

## 📦 프로젝트에서 사용한 Docker 구성

이번 프로젝트에서는 **MySQL DB**만 Docker로 실행하였다.

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

# 😎 결과 확인
#### 터미널 환경에서 한글 디코딩을 위해 myCLI를 사용하였다.
<br>

### DB 테스트
![](/images/velog/react-spring-기초-실습-미니-프로젝트-04.webp)

#### DB 테이블을 확인하였다.

> 포스팅 - post
댓글 - comment

---

### 포스팅 테스트
![](/images/velog/react-spring-기초-실습-미니-프로젝트-05.webp)
![](/images/velog/react-spring-기초-실습-미니-프로젝트-06.webp)

#### 성공적으로 content 테이블에 저장되는 것을 확인하였다.

---

### 댓글 테스트

![](/images/velog/react-spring-기초-실습-미니-프로젝트-07.webp)
![](/images/velog/react-spring-기초-실습-미니-프로젝트-08.webp)

#### 성공적으로 comment 테이블에 저장되는 것을 확인하였다.

<br>

---


## ✨ 전체 흐름 정리

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

### 💬 후기

>**이번 프로젝트에서 사용된 기술들은 기초적이면서도 매우 중요한 것들이었다.
AI의 발전으로 내가 “할 수 있는 것”은 많아졌지만,
정작 “알고 있다”고 말할 수 있는 것들은 오히려 줄어들고 있다는 생각이 든다.
이러한 AI 시대의 트레이드 오프가 나에게 일어나지 않도록,
기초부터 탄탄하게 공부하고 이해해야겠다.**

**[실습 코드 깃허브]** (https://github.com/Poketopa/react-spring-prac)
