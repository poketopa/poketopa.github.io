---
title: "React Week 1 Summary"
description: "💡 What is React? React is a JavaScript-based UI library created by Facebook (now Meta). It helps you write efficient, intuitive code when building a webpage’s UI (User Interface). ✅ Why use React? Traditional web development manages separate HTML,…"
publishedAt: 2025-03-31
updatedAt: 2026-08-14
category: Development
cover: /covers/react-thumbnail.png
tags: ["React"]
source:
  platform: Velog
  id: e12c1a1b-f469-49e5-8a15-1b359327ab1d
  url: https://velog.io/@lhs5427ll/React-1%EC%A3%BC%EC%B0%A8-%EC%A0%95%EB%A6%AC
draft: false
---

# 💡 What is React?

> **React** is a **JavaScript-based UI library** created by Facebook (now Meta).

It is a tool that helps you write efficient, intuitive code when building a webpage's UI (User Interface).

---

## ✅ Why use React?

Traditional web development manages separate HTML, CSS, and JavaScript files,

And requires reloading the entire HTML even for a small change on the page,

Whereas React **updates only the necessary parts** and helps manage the UI efficiently.

---

# 💡 What is JSX?

**JSX (JavaScript XML)** is **syntax that extends JavaScript with XML**.

> Put simply, **syntax that looks like writing HTML inside JavaScript code**

```jsx
const element = <h1>Hello, React!</h1>;
```

- As above, you can write HTML tags as though they were JavaScript variables.
- This code is actually transformed into `React.createElement()` by a tool called Babel.

---

## ✅ Benefits of JSX

1. **Improved readability**: the UI structure is intuitive to see in code.
2. **Easy componentization**: convenient to divide and manage the UI in small pieces.
3. **Full integration with JavaScript**: conditional rendering, repeated rendering, and more are easy with JS syntax.

---

## 🔍 Basic JSX syntax

### 1. Wrap everything in one top-level tag

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

> A component must always return a single parent element.
> 

---

### 2. Use camelCase instead of HTML attributes

```

// HTML: <div class="box"></div>
// JSX:  <div className="box"></div>

```

- `class` → `className`
- `onclick` → `onClick`

JSX attributes must be written in **camelCase**.

---

### 3. Using JavaScript expressions

Inside JSX, you can use JavaScript expressions with **braces `{}`**.

```jsx

const name = "민지";
return <h1>안녕하세요, {name}님!</h1>;

```

- Conditional rendering is possible too!

```jsx

{isLoggedIn ? <Logout /> : <Login />}

```

---

### 4. Always close self-closing tags

Even standalone tags must be closed with a **slash (/)** in JSX.

```jsx

<input />
<br />
<hr />

```
---

# 💡 Props and component composition

## 🧩 What are props?

> A **way of passing data** from a parent component to a child component

```
function Welcome(props) {
  return <h1>안녕하세요, {props.name}님!</h1>;
}

<Welcome name="민지" />

```

- `props.name` lets you use the `name` value passed by the parent.
- **Values are passed to components like HTML attributes**.

---

## 💡 Characteristics of props

1. **Read-only** → child components cannot directly change prop values.
2. **Passed as an object**, allowing multiple values at once.
3. Allow **dynamic rendering**. (Component content changes with the data)

---

## ✍️ Simple example: a `Comment` component

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

- Using props this way lets you **reuse components**

---

## 🔗 Component composition

**Composition** means bringing small components together to create **one larger component**.

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

- `CommentList` is a parent component built by using `Comment` multiple times.
> The key is **nesting components**

---

## 🧼 Extracting components to organize code

If a component becomes too large or needs to be **divided by functionality**, **extracting components** can improve readability.

### Example: breaking down the `Comment` component

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

This gives components **clearer roles**, making them easier to reuse and maintain.

# 💡 State and lifecycle

## 🧩 What is state?

> **State** is **data a component needs to remember**

Put simply, values that change through **user interaction or internal changes**.

### ✅ Characteristics

- State is declared inside a component
- When its value changes, the component **automatically rerenders**
- Props are **values received from a parent (external)**; state is **values managed by the component itself (internal)**

---

## 📦 Using state in class components

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

- `this.state` defines the initial state
- `this.setState()` changes the state and rerenders the component

---

## ❗ Do not modify state directly ❌

```
this.state.count = this.state.count + 1; // ❌ 절대 이렇게 하면 안 됨!

```

> Values must only be changed using setState().
>
> That allows React to **automatically manage rendering** as state changes.
>
> **Changing this.state directly causes no change on screen.**
> 

---

# 💡 What is a lifecycle?

Components follow the sequence **creation → update → removal**,

Called the **component lifecycle**.

### 🎢 Lifecycle stages

1. **Mounting (creation)**: when a component is first created
2. **Updating**: when props or state change
3. **Unmounting (removal)**: when a component disappears

---

## 🛠 Main lifecycle methods (class components)

| Method | Timing | Role |
| --- | --- | --- |
| `constructor()` | Before creation | Set initial values |
| `render()` | Rendering | Display the UI on screen |
| `componentDidMount()` | After rendering | API calls, setInterval, etc. |
| `componentDidUpdate()` | After state or props change | Detect changes |
| `componentWillUnmount()` | Just before removal | Cleanup (removing timers, etc.) |

---

## ⛓️ Lifecycle flow example

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

> Called in the order: button click → state update → render → componentDidUpdate.
> 

# 💡 React Hooks summary

## 🔍 What is a Hook?

> A Hook is **a function designed to enable state and lifecycle features in function components**

Officially introduced in React 16.8, Hooks are now used in almost every React project.

---

## ✅ useState

### 👉 A Hook that lets you store state

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

### 📌 Explanation

- `useState(0)` → initial value 0
- `count` → current state value
- `setCount` → function to update state
- When state changes, the component **automatically rerenders**

---

## 🌀 useEffect

### 👉 A Hook for handling side effects

Used for **API calls, setting timers, directly manipulating the DOM, and so on**.

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

## ⛓️ How useEffect works

| Dependency array (`[]`) | When it runs | Example |
| --- | --- | --- |
| None | **Always** (every render) | `useEffect(() => { ... });` |
| Empty array `[]` | **Once on initial mount** | `useEffect(() => { ... }, []);` |
| Specific values `[a, b]` | **Only when a or b changes** | `useEffect(() => { ... }, [a, b]);` |

---

## ✅ Example: mounting, unmounting, and updating

```
useEffect(() => {
  console.log('컴포넌트가 화면에 나타남'); // Mount

  return () => {
    console.log('컴포넌트가 화면에서 사라짐'); // Unmount
  };
}, []); // 빈 배열: 최초 마운트 & 언마운트 시만 실행

```

---

## 🧪 Using useState & useEffect together

```
function WelcomeMessage({ name }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(`${name}님, 환영합니다!`);
  }, [name]);

  return <p>{message}</p>;
}

```

### ✔️ Result:

- Changing `name` automatically changes message too
- The dependency array makes it run only when needed

---

## 📝 useMemo

### 📌 Remember (memoize) expensive calculation results to prevent unnecessary computation

```
const memoizedValue = useMemo(() => {
  return someHeavyComputation(input);
}, [input]);

```

### ✅ When should you use it?

- To avoid repeatedly calling **computationally expensive functions**
- When you want **recalculation** only when particular `props` or `state` change

### 📝 Example

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

> Recalculates only when input changes, otherwise reusing the previous value
> 

---

## 🔁 useCallback

### 📌 Remember (memoize) a function to prevent recreating it on every render

```jsx
jsx
복사편집
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

```

### ✅ When should you use it?

- **When passing a function as a prop to a child component**
- When you want to **minimize rerendering**

### 📝 Example

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

> The Child component does not rerender because handleClick has not changed
> 

---

## 🎯 useRef

### 📌 A Hook for storing a **reference** to a DOM element or variable

```
const myRef = useRef(null);

```

- The `.current` property allows access to the actual DOM
- Unlike state changes, changing it **does not trigger rendering**

### 📝 Example: focusing an input

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

# 💡 What is an event?

- **Something that happens through user interaction**
    - Button clicks, keyboard input, mouse movement, form submission, etc.
- Examples: `onClick`, `onChange`, `onSubmit`, `onMouseEnter`, `onKeyDown`, ...

---

## ✅ Differences between React and DOM events

| Aspect | DOM approach | React approach |
| --- | --- | --- |
| Event names | Lowercase (`onclick`) | camelCase (`onClick`) |
| Passing event handlers | String (`"myFunc()"`) | Function (`{myFunc}`) |

📎 Example comparison

### ✅ HTML DOM approach

```
<button onclick="handleClick()">Click Me</button>

```

### ✅ React approach

```
<button onClick={handleClick}>Click Me</button>

```

---

## 💡 What is an event handler function?

- A **function** executed when an event occurs
- Usually defined inside a component

```
function MyComponent() {
  const handleClick = () => {
    alert("버튼이 클릭되었습니다!");
  };

  return <button onClick={handleClick}>클릭</button>;
}

```

---

## 🛠️ Passing parameters

Use an **arrow function** or `.bind()` to **pass additional data** to an event handler

```jsx
jsx
복사편집
// 방법 1: 화살표 함수 사용
<button onClick={() => handleClick(userId)}>클릭</button>

// 방법 2: bind 사용
<button onClick={handleClick.bind(null, userId)}>클릭</button>

```

---

## 🔥 The event object (e)

An object automatically passed as the event handler's first parameter

```jsx
jsx
복사편집
function handleClick(event) {
  console.log(event.target); // 클릭된 DOM 요소
}

```
