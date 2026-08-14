---
title: "React 1주차 정리"
description: "💡 React란? React는 Facebook 현재 Meta 에서 만든 JavaScript 기반의 UI 라이브러리이다. 웹페이지의 UI User Interface 를 구성할 때, 효율적이고 직관적으로 코드를 작성할 수 있도록 도와주는 도구로 사용된다. ✅ React를 왜 사용할까? 기존의 웹 개발 방식은 HTML,…"
publishedAt: 2025-03-31
updatedAt: 2026-08-14
category: Development
tags: ["React"]
source:
  platform: Velog
  id: e12c1a1b-f469-49e5-8a15-1b359327ab1d
  url: https://velog.io/@lhs5427ll/React-1%EC%A3%BC%EC%B0%A8-%EC%A0%95%EB%A6%AC
draft: false
---
# 💡 React란?

> **React**는 Facebook(현재 Meta)에서 만든 **JavaScript 기반의 UI 라이브러리**이다.

웹페이지의 UI(User Interface)를 구성할 때, 효율적이고 직관적으로 코드를 작성할 수 있도록 도와주는 도구로 사용된다.

---

## ✅ React를 왜 사용할까?

기존의 웹 개발 방식은 HTML, CSS, JavaScript 파일을 나눠서 관리하고,

페이지의 작은 변화가 있어도 전체 HTML을 다시 불러와야 하지만,

React는 **필요한 부분만 업데이트**하고, UI를 효율적으로 관리할 수 있도록 도와준다.

---

# 💡 JSX란?

**JSX (JavaScript XML)** 는 **JavaScript에 XML을 확장한 문법**이다.

> 쉽게 말하면, **JavaScript 코드 안에서 HTML을 작성하는 것처럼 보이는 문법**

```jsx
const element = <h1>Hello, React!</h1>;
```

- 위 코드처럼, HTML 태그를 마치 JavaScript 변수처럼 작성할 수 있다.
- 이 코드는 사실 Babel이라는 도구에 의해 `React.createElement()`로 변환된다.

---

## ✅ JSX의 장점

1. **가독성 향상**: UI 구조를 코드에서 직관적으로 볼 수 있다.
2. **컴포넌트화 용이**: UI를 작은 조각으로 나누어 관리하기 편하다.
3. **자바스크립트와 완벽히 통합**: 조건부 렌더링, 반복 렌더링 등을 JS 문법으로 쉽게 처리할 수 있다.

---

## 🔍 JSX 기본 문법 정리

### 1. 하나의 최상위 태그로 감싸기

```jsx

// ❌ 오류 발생
return (
  <h1>Hello</h1>
  <p>React</p>
);

// ✅ 올바른 코드
return (
  <div>
    <h1>Hello</h1>
    <p>React</p>
  </div>
);
```

> 컴포넌트는 항상 하나의 부모 요소만 반환해야 한다.
> 

---

### 2. HTML 속성 대신 camelCase 사용

```

// HTML: <div class="box"></div>
// JSX:  <div className="box"></div>

```

- `class` → `className`
- `onclick` → `onClick`


JSX에서는 HTML 속성을 **camelCase(카멜 표기법)** 으로 작성해야 한다.

---

### 3. JavaScript 표현식 사용

JSX 안에서는 **중괄호 `{}`** 를 사용해 JavaScript 표현식을 쓸 수 있다.

```jsx

const name = "민지";
return <h1>안녕하세요, {name}님!</h1>;

```

- 조건부 렌더링도 가능!

```jsx

{isLoggedIn ? <Logout /> : <Login />}

```

---

### 4. self-closing 태그는 반드시 닫기

JSX에서는 혼자 쓰이는 태그도 반드시 **슬래시(/)** 를 붙여 닫아야 한다.

```jsx

<input />
<br />
<hr />

```
---

# 💡 Props와 컴포넌트 합성

## 🧩 Props란?

> 부모 컴포넌트가 자식 컴포넌트에 값을 전달할 때 사용하는 **데이터 전달 방식**

```
function Welcome(props) {
  return <h1>안녕하세요, {props.name}님!</h1>;
}

<Welcome name="민지" />

```

- `props.name`을 통해 부모가 전달한 `name` 값을 사용할 수 있다.
- **컴포넌트에 값을 전달할 때는 HTML 속성처럼 작성**한다.

---

## 💡 Props의 특징

1. **읽기 전용** → 자식 컴포넌트에서 props 값을 직접 변경할 수 없다.
2. **객체 형태로 전달**되며, 여러 개의 값을 한 번에 보낼 수 있다.
3. **동적으로 렌더링**이 가능하다. (데이터에 따라 컴포넌트 내용이 바뀜)

---

## ✍️ 간단한 예제: `Comment` 컴포넌트

```
function Comment(props) {
  return (
    <div className="comment">
      <h2>{props.name}</h2>
      <p>{props.comment}</p>
    </div>
  );
}

```

```
<Comment name="지훈" comment="좋은 글 감사합니다!" />
<Comment name="수아" comment="많이 배워가요 😊" />

```

- 이렇게 props를 사용하면 **컴포넌트를 재사용** 가능

---

## 🔗 컴포넌트 합성(Component Composition)

**합성**이란, 작은 컴포넌트들을 모아서 **하나의 큰 컴포넌트**를 만드는 것을 말한다.

```
function CommentList() {
  return (
    <div>
      <Comment name="민지" comment="정말 좋아요!" />
      <Comment name="지훈" comment="배워갑니다~" />
    </div>
  );
}

```

- `CommentList`는 `Comment`를 여러 번 사용해 만든 상위 컴포넌트이다.
> **컴포넌트를 중첩해서 사용하는 것**이 중요

---

## 🧼 코드 정리를 위한 컴포넌트 추출

컴포넌트가 너무 커지거나 **기능별로 구분**이 필요하다면, **컴포넌트 추출**을 통해 코드의 가독성을 높일 수 있다.

### 예: `Comment` 컴포넌트 분해

```
function Avatar(props) {
  return <img src={props.user.avatarUrl} alt={props.user.name} />;
}

function UserInfo(props) {
  return (
    <div className="user-info">
      <Avatar user={props.user} />
      <span>{props.user.name}</span>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="comment">
      <UserInfo user={props.author} />
      <p>{props.text}</p>
      <span>{props.date}</span>
    </div>
  );
}

```

이렇게 하면 컴포넌트가 더 **명확한 역할**을 가지게 되어 재사용도 쉬워지고 유지보수도 편해진다.

# 💡 State와 생명주기

## 🧩 State란?

> **State(상태)** 는 컴포넌트가 **기억해야 할 데이터**

쉽게 말하면 **사용자와의 상호작용이나 내부의 변화**에 따라 바뀌는 값이다.

### ✅ 특징

- State는 컴포넌트 내부에서 선언됨
- 값이 바뀌면 컴포넌트는 **자동으로 다시 렌더링**
- Props는 **부모로부터 받는 값(외부)**, State는 **컴포넌트 자신이 관리하는 값(내부)**

---

## 📦 클래스 컴포넌트에서의 State 사용

```
import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // 초기 상태 정의

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 }); // 상태 업데이트
  }

  render() {
    return (
      <div>
        <p>현재 카운트: {this.state.count}</p>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}

```

- `this.state`는 초기 상태를 정의
- `this.setState()`는 상태를 변경하고 컴포넌트를 다시 렌더링함

---

## ❗ State는 직접 수정 ❌

```
this.state.count = this.state.count + 1; // ❌ 절대 이렇게 하면 안 됨!

```

> 반드시 setState()를 사용해서만 값을 변경해야 한다.
>
> 그래야 리액트가 상태 변화와 함께 **자동으로 렌더링을 관리**해준다.
>
> **this.state를 직접 바꾸면 화면에 아무런 변화가 일어나지 않는다.**
> 

---

# 💡 생명주기(Lifecycle)란?

컴포넌트는 **생성 → 업데이트 → 제거**의 흐름을 갖는데,

이 과정을 **컴포넌트 생명주기**라고 부른다.

### 🎢 생명주기 단계

1. **Mounting (생성)**: 컴포넌트가 처음 만들어지는 단계
2. **Updating (업데이트)**: props 또는 state가 변경될 때
3. **Unmounting (제거)**: 컴포넌트가 사라질 때

---

## 🛠 주요 생명주기 메서드 (클래스 컴포넌트 기준)

| 메서드 | 시점 | 역할 |
| --- | --- | --- |
| `constructor()` | 생성 전 | 초기값 설정 |
| `render()` | 렌더링 | 화면에 UI 출력 |
| `componentDidMount()` | 렌더링 후 | API 호출, setInterval 등 |
| `componentDidUpdate()` | 상태나 props가 변경된 후 | 변화 감지 |
| `componentWillUnmount()` | 제거 직전 | 정리 작업 (타이머 제거 등) |

---

## ⛓️ 생명주기 흐름 예제

```
class LifeCycleDemo extends React.Component {
  constructor(props) {
    super(props);
    console.log('1️⃣ constructor');
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('3️⃣ componentDidMount');
  }

  componentDidUpdate() {
    console.log('🔄 componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('❌ componentWillUnmount');
  }

  render() {
    console.log('2️⃣ render');
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          증가
        </button>
      </div>
    );
  }
}

```

> 버튼 클릭 → 상태 업데이트 → render → componentDidUpdate 순서로 호출된다.
> 

# 💡 리액트 Hook 정리

## 🔍 Hook이란?

> Hook(훅)은 **함수형 컴포넌트에서도 state와 생명주기 기능을 사용할 수 있도록 만든 함수**

리액트 16.8부터 공식적으로 도입되었고, 지금은 거의 모든 리액트 프로젝트에서 Hook을 사용한다.

---

## ✅ useState

### 👉 상태를 저장할 수 있게 해주는 Hook

```
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // count: 상태값, setCount: 상태를 바꾸는 함수

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

```

### 📌 설명

- `useState(0)` → 초기값 0
- `count` → 현재 상태값
- `setCount` → 상태를 업데이트하는 함수
- 상태가 변경되면 컴포넌트는 **자동으로 재렌더링**

---

## 🌀 useEffect

### 👉 부수 효과(Side Effect)를 처리하는 Hook

**API 호출, 타이머 설정, DOM 직접 조작 등**을 할 때 사용한다.

```
import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  // 화면이 렌더링된 후 실행됨
  useEffect(() => {
    console.log(`카운트가 ${count}로 바뀌었어요!`);
  }, [count]); // count가 바뀔 때마다 실행

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

```

---

## ⛓️ useEffect의 동작 방식

| 의존성 배열 (`[]`) | 실행 시점 | 예시 |
| --- | --- | --- |
| 없음 | **항상 실행** (렌더링마다) | `useEffect(() => { ... });` |
| 빈 배열 `[]` | **최초 마운트 시 1번 실행** | `useEffect(() => { ... }, []);` |
| 특정 값 `[a, b]` | **a 또는 b가 변경될 때만 실행** | `useEffect(() => { ... }, [a, b]);` |

---

## ✅ 예제: 마운트, 언마운트, 업데이트

```
useEffect(() => {
  console.log('컴포넌트가 화면에 나타남'); // Mount

  return () => {
    console.log('컴포넌트가 화면에서 사라짐'); // Unmount
  };
}, []); // 빈 배열: 최초 마운트 & 언마운트 시만 실행

```

---

## 🧪 useState & useEffect 같이 사용하기

```
function WelcomeMessage({ name }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(`${name}님, 환영합니다!`);
  }, [name]);

  return <p>{message}</p>;
}

```

### ✔️ 결과:

- `name`이 바뀌면 자동으로 message도 변경됨
- 의존성 배열 덕분에 필요한 시점에만 실행됨

---

## 📝 useMemo

### 📌 복잡한 계산 결과를 기억(memoization)해서 불필요한 연산을 방지

```
const memoizedValue = useMemo(() => {
  return someHeavyComputation(input);
}, [input]);

```

### ✅ 언제 사용하나요?

- **계산 비용이 높은 함수**를 반복해서 호출하지 않도록 할 때
- 특정 `props`나 `state`가 변경될 때만 **다시 계산**되게 하고 싶을 때

### 📝 예제

```
import { useMemo, useState } from "react";

function ExpensiveComponent({ input }) {
  const expensiveValue = useMemo(() => {
    console.log("💥 연산 실행!");
    return input * 1000000;
  }, [input]);

  return <p>결과: {expensiveValue}</p>;
}

```

> input이 바뀔 때만 연산이 다시 수행되고, 그 외에는 이전 값 재사용
> 

---

## 🔁 useCallback

### 📌 함수를 기억(memoization)해서 매 렌더링마다 새로 만들어지는 것을 방지

```jsx
jsx
복사편집
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

```

### ✅ 언제 사용할까?

- **자식 컴포넌트에 props로 함수를 넘길 때**
- 리렌더링을 **최소화**하고 싶을 때

### 📝 예제

```
import React, { useCallback, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <><button onClick={() => setCount(count + 1)}>+1</button>
      <Child onClick={handleClick} />
    </>
  );
}

```

> Child 컴포넌트는 handleClick이 변하지 않으므로 리렌더링이 발생하지 않음
> 

---

## 🎯 useRef

### 📌 DOM 요소나 변수의 **참조(reference)** 를 저장할 수 있는 Hook

```
const myRef = useRef(null);

```

- `.current` 속성으로 실제 DOM 접근 가능
- 상태 변경과 다르게 변경되어도 **렌더링을 유발하지 않음**

### 📝 예제: input에 포커스 주기

```
import React, { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  const onClick = () => {
    inputRef.current.focus();
  };

  return (
    <><input ref={inputRef} />
      <button onClick={onClick}>포커스 주기</button>
    </>
  );
}

```

---

# 💡 이벤트(Event)란?

- **사용자와의 상호작용에서 발생하는 사건**
    - 버튼 클릭, 키보드 입력, 마우스 움직임, 폼 제출 등
- 예: `onClick`, `onChange`, `onSubmit`, `onMouseEnter`, `onKeyDown`, ...

---

## ✅ 리액트와 DOM의 이벤트 차이점

| 구분 | DOM 방식 | 리액트 방식 |
| --- | --- | --- |
| 이벤트 이름 | 소문자 (`onclick`) | 카멜표기법 (`onClick`) |
| 이벤트 핸들러 전달 방식 | 문자열 (`"myFunc()"`) | 함수 (`{myFunc}`) |

📎 예시 비교

### ✅ HTML DOM 방식

```
<button onclick="handleClick()">Click Me</button>

```

### ✅ 리액트 방식

```
<button onClick={handleClick}>Click Me</button>

```

---

## 💡 이벤트 핸들러 함수란?

- 이벤트 발생 시 실행되는 **함수**
- 보통 컴포넌트 내부에 정의해서 사용

```
function MyComponent() {
  const handleClick = () => {
    alert("버튼이 클릭되었습니다!");
  };

  return <button onClick={handleClick}>클릭</button>;
}

```

---

## 🛠️ 매개변수 전달 방법

이벤트 핸들러에 **추가 데이터를 전달**하려면 **화살표 함수** 또는 `.bind()` 사용

```jsx
jsx
복사편집
// 방법 1: 화살표 함수 사용
<button onClick={() => handleClick(userId)}>클릭</button>

// 방법 2: bind 사용
<button onClick={handleClick.bind(null, userId)}>클릭</button>

```

---

## 🔥 이벤트 객체(e)

이벤트 핸들러의 첫 번째 매개변수로 자동 전달되는 객체

```jsx
jsx
복사편집
function handleClick(event) {
  console.log(event.target); // 클릭된 DOM 요소
}

```
