---
title: "React 2주차 정리"
description: "💡 조건부 렌더링 Conditional Rendering 리액트에서는 상황에 따라 다른 UI를 보여주는 것을 \"조건부 렌더링\"이라고 한다. 기본적으로는 JavaScript의 조건문을 활용하여 컴포넌트 안에서 렌더링할 내용을 동적으로 바꿀 수 있다. ✅ 조건부 렌더링의 사용 React에서는 마치 if문처럼 특정 조건…"
publishedAt: 2025-04-06
updatedAt: 2026-08-14
category: Development
tags: ["React"]
source:
  platform: Velog
  id: f3c054fa-1aa1-4b93-898f-dde164f6e312
  url: https://velog.io/@lhs5427ll/React-2%EC%A3%BC%EC%B0%A8-%EC%A0%95%EB%A6%AC
draft: false
---
# 💡 조건부 렌더링 (Conditional Rendering)

> 리액트에서는 상황에 따라 다른 UI를 보여주는 것을 "조건부 렌더링"이라고 한다.
> 

기본적으로는 JavaScript의 조건문을 활용하여 컴포넌트 안에서 렌더링할 내용을 동적으로 바꿀 수 있다.

---

## ✅ 조건부 렌더링의 사용

React에서는 마치 **if문처럼** 특정 조건에 따라 **다른 컴포넌트나 JSX 요소를 렌더링**할 수 있다.

> 예를 들어, 로그인 상태에 따라 화면에 “환영합니다!” 또는 “로그인 해주세요”를 보여줄 수 있다.
> 

---

## 🔍 조건부 렌더링 방식

### 1. `if` 문 사용

```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  if (isLoggedIn) {
    return <h1>환영합니다!</h1>;
  }
  return <h1>로그인 해주세요.</h1>;
}

```

- 가장 직관적인 방식으로, 조건에 따라 컴포넌트를 반환한다.
- 여러 조건이 복잡할 때 사용하면 가독성이 좋다.

---

### 2. `삼항 연산자` 사용 (Inline 조건)

```
function Greeting(props) {
  return (
    <h1>
      {props.isLoggedIn ? '환영합니다!' : '로그인 해주세요.'}
    </h1>
  );
}

```

- 간단한 조건일 경우 **짧고 깔끔한 코드**를 작성할 수 있다.
- JSX 내부에서 직접 사용할 수 있다는 점이 특징

---

### 3. `&&` 연산자 사용

```
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;

  return (
    <div>
      <h1>안녕하세요!</h1>
      {unreadMessages.length > 0 && (
        <h2>읽지 않은 메시지: {unreadMessages.length}개</h2>
      )}
    </div>
  );
}

```

- 특정 조건이 **true일 때만** JSX를 렌더링하고 싶을 때 사용한다.
- `unreadMessages.length > 0`이 참이면 `<h2>`가 렌더링된다.

---

## ❗ 주의사항: `false`, `null`, `undefined`는 렌더링되지 않음

```
return <div>{false}</div>; // 화면에 아무것도 렌더링되지 않음

```

- JSX에서는 `false`, `null`, `undefined`, `true`는 무시되고 화면에 표시되지 않는다..

---

## ✨ 예제: 로그인 버튼 전환

```
function LoginButton(props) {
  return <button onClick={props.onClick}>로그인</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>로그아웃</button>;
}

function LoginControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={handleClick} />
      ) : (
        <LoginButton onClick={handleClick} />
      )}
    </div>
  );
}

```

- 버튼을 클릭할 때마다 **상태(State)**가 바뀌고,
- 그에 따라 **다른 컴포넌트가 조건부로 렌더링**된다.

---

## ⭐️ 요약

| 방식 | 설명 | 특징 |
| --- | --- | --- |
| `if` 문 | JSX 바깥에서 조건을 분기 | 복잡한 조건에 적합 |
| `삼항 연산자` | JSX 안에서 조건 분기 | 간단한 조건 처리 |
| `&& 연산자` | true일 때만 렌더링 | 조건부 출력에 간편 |



> ✍️ 조건부 렌더링은 사용자 경험을 향상시키기 위한 필수 기능
> 

<br>

---


# 💡 리스트와 Key

> 리액트에서는 여러 개의 데이터를 반복해서 화면에 표시할 때, 리스트 렌더링 기능을 사용
> 

이때 각 항목을 구분하기 위해 반드시 **고유한 Key**가 필요

---

## ✅ 리스트 렌더링이란?

JavaScript의 `map()` 함수를 사용하여 **배열 안의 데이터를 반복적으로 렌더링**할 수 있다.

### 📌 예제: 배열을 화면에 출력하기

```
const numbers = [1, 2, 3, 4, 5];

const listItems = numbers.map((number) =>
  <li>{number}</li>
);

return <ul>{listItems}</ul>;

```

> map()을 사용하여 배열 요소들을 li로 변환한 뒤, JSX로 출력
> 

---

## 🔐 Key란?

> 리스트의 각 항목을 구분하기 위한 고유한 값
> 

리액트는 어떤 항목이 변경, 추가, 삭제되었는지 식별하기 위해 Key를 사용한다.

```
const numbers = [1, 2, 3, 4, 5];

const listItems = numbers.map((number) =>
  <li key={number}>{number}</li>
);

```

- 여기서 `key={number}`는 각 항목을 고유하게 식별할 수 있는 값
- Key가 없거나 중복되면 **경고 메시지**가 뜨고 성능이 저하될 수 있다.

---

## ❗ key에 index를 사용해도 될까?

```
const listItems = items.map((item, index) =>
  <li key={index}>{item}</li>
);

```

- key로 `index`를 사용하는 건 **권장되지 않는다.** ❌
- 이유: 리스트의 순서가 바뀌거나 항목이 추가/삭제되면 index 값이 바뀌어 잘못된 동기화가 발생할 수 있음

> 가능한 경우엔 고유 ID값을 key로 사용하는 것이 좋다.
> 

---

## ⭐️ 요약

| 개념 | 설명 |
| --- | --- |
| 리스트 렌더링 | `map()` 함수를 이용하여 반복 렌더링 |
| key | 각 항목을 고유하게 식별하기 위한 값 |
| 좋은 key 값 | 고유한 ID (index는 지양) |


---




# 💡 Form과 Controlled Component


> 사용자로부터 입력을 받을 때 사용하는 HTML 요소인 Form,
> 
> 
> 그리고 입력값을 리액트에서 **직접 제어**하는 방식을 **Controlled Component**라고 한다.
> 

---

## ✅ 왜 Controlled Component를 사용할까?

기존 HTML에서는 `<input>`, `<textarea>`, `<select>` 등 form 요소들이 **DOM이 직접 관리**했다.

하지만 리액트에서는 상태(state)를 통해 **입력값을 제어(제어된 컴포넌트)** 하면서

입력된 값을 실시간으로 추적하고, 조건에 따라 동작을 유연하게 변경할 수 있다.

---

## ✍️ Controlled Component 기본 예제

```
import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value); // 입력값을 상태에 저장
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 막기
    alert(`입력한 이름: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} />
      <button type="submit">제출</button>
    </form>
  );
}

```

- `value={name}`: input의 값을 상태와 연결
- `onChange={handleChange}`: 입력할 때마다 상태 갱신
- `useState`를 통해 입력값을 제어 (Controlled)

---

## ✅ 다양한 Form 요소들 제어하기

### 📌 textarea 제어

```
<textarea value={message} onChange={(e) => setMessage(e.target.value)} />

```

### 📌 select 제어

```
<select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
</select>

```

- select의 `value`도 상태와 연결
- 다양한 입력 요소를 동일한 방식으로 제어 가능

---

## ❗ 주의할 점

- input에 `value`를 지정했는데 `onChange`를 빠뜨리면 **입력 불가능한 필드**가 된다.
- 항상 `value`와 `onChange`를 함께 사용해야 합니다.

---

## ✅ 사용자 정보 입력받기 예제

```
function UserForm() {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      <input name="name" value={userInfo.name} onChange={handleChange} />
      <input name="email" value={userInfo.email} onChange={handleChange} />
    </form>
  );
}

```

- 여러 개의 input을 객체 형태로 상태 관리
- `name` 속성을 통해 어떤 필드인지 구분

---

## ⭐️ 요약

| 개념 | 설명 |
| --- | --- |
| Controlled Component | 리액트 상태가 form 요소의 값을 제어 |
| value | 상태 값을 input 등에 연결 |
| onChange | 입력 변화 시 상태 업데이트 |
| 장점 | 입력값 추적, 조건 제어, 실시간 검증 가능 |

---

# 💡 상태 공유 (State Lifting)

> 상태 공유란, 여러 하위 컴포넌트들이 동일한 상태를 사용할 때,
> 
> 
> 그 상태를 **공통의 상위 컴포넌트로 올려서(lift up)** 관리하는 패턴
> 

---

## ✅ 왜 상태 공유(State Lifting)를 할까?

React에서 컴포넌트는 **독립적인 상태(state)** 를 가진다.

하지만 때로는 **여러 컴포넌트가 동일한 데이터를 공유**해야 할 때가 있다.

이때 상태를 하위 컴포넌트 각각에 만들면 ❌ 데이터 불일치 발생

→ 해결 방법: 상태를 **공통 부모 컴포넌트로 끌어올림**

---

## 🔍 간단한 예시: 두 input의 동기화

```
function TemperatureInput({ temperature, onTemperatureChange }) {
  return (
    <fieldset>
      <inputvalue={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </fieldset>
  );
}

```

```
function Calculator() {
  const [temperature, setTemperature] = useState("");

  return (
    <div>
      <TemperatureInputtemperature={temperature}
        onTemperatureChange={setTemperature}
      />
      <TemperatureInputtemperature={temperature}
        onTemperatureChange={setTemperature}
      />
    </div>
  );
}

```

- `Calculator` 컴포넌트가 상태를 가지고 있고,
- `TemperatureInput`은 상태를 **props로 받아서 표시 & 수정**함
- 이렇게 상태를 상위 컴포넌트에 올리는 것을 **State Lifting**이라고 함

---

## ⭐️ 핵심 정리

| 개념 | 설명 |
| --- | --- |
| 상태 공유 | 여러 컴포넌트가 동일한 상태를 사용 |
| Lifting State Up | 공통 부모 컴포넌트로 상태를 올려 관리 |
| 장점 | 데이터 동기화, 흐름이 명확해짐 |
| 단점 | 컴포넌트 간의 결합도가 다소 올라감 |

---

## ✅ 언제 상태를 끌어올릴까?

- **2개 이상의 하위 컴포넌트가 같은 데이터를 필요로 할 때**
- **하위 컴포넌트끼리 상태를 공유해야 할 때**
- 예: 필터링된 리스트를 보여주는 컴포넌트와 검색어 입력창

---


- `SearchInput`: 검색어 입력
- `List`: 필터링된 결과 표시
- 공통된 상태 `filterText`는 상위 컴포넌트 `FilterableList`에서 관리

---



# 💡 컴포넌트 합성과 상속

> React에서는 합성(Composition) 을 통해 컴포넌트를 조합하고,
> 
> 
> **상속(Inheritance)** 보다는 합성을 우선적으로 사용
> 

---

## ✅ React는 상속보다 합성을 권장

- 클래스 기반 객체지향 언어에서는 **상속**을 많이 사용하지만,
    
    React에서는 대부분의 문제를 **컴포넌트 합성**으로 해결할 수 있다.
    
- 합성은 더 **유연하고 재사용성 높은 구조**를 만들 수 있다.

---

## 🔗 컴포넌트 합성의 종류

React에서는 컴포넌트를 조합하는 방법으로 아래 **두 가지 합성 패턴**을 주로 사용한다.

### 1. Containment (컨테인먼트: 자식 포함)

> 자식 엘리먼트를 props.children으로 받아서 렌더링하는 방식
> 

```
function Card({ children }) {
  return <div className="card">{children}</div>;
}

```

```
<Card>
  <h2>공지사항</h2>
  <p>이번 주 금요일은 휴강입니다.</p>
</Card>

```

✅ **props.children**을 활용하면,

부모 컴포넌트가 자식으로 어떤 요소든 자유롭게 넘길 수 있다.

---

### 2. Specialization (특수화: 일부 내용만 변경)

> 일반적인 컴포넌트를 특정 용도에 맞게 재사용하는 방식
> 

```
function Dialog({ title, message }) {
  return (
    <div className="dialog">
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}

function WelcomeDialog() {
  return <Dialog title="환영합니다!" message="저희 사이트에 오신 걸 환영해요." />;
}

```

✅ **일반적인 구조는 유지**하면서,

**내용만 바꾸고 싶을 때 적합한 방식**

---

## ⭐️ 합성과 상속 비교

| 항목 | 합성(Composition) | 상속(Inheritance) |
| --- | --- | --- |
| 사용성 | React에서 권장 ✅ | 거의 사용 안 함 ❌ |
| 장점 | 유연하고 조립 가능 | 코드 결합도 높음 |
| 예시 | children, props | extends 클래스 상속 등 |

---


# 💡 Context API란?

> Context는 컴포넌트 트리 전체에 데이터(상태)를 공유할 수 있게 해주는 리액트 기능
> 

React는 기본적으로 **단방향 데이터 흐름**을 사용한다.

즉, 부모 → 자식으로 `props`를 통해 데이터를 전달

하지만, 컴포넌트 깊이가 깊어지면

**매번 props로 전달하는 것이 매우 번거롭고 비효율적**이다.

→ 이럴 때 등장하는 것이 바로 **Context API**

---

## ✅ 언제 Context를 써야 할까?

> 여러 컴포넌트에서 동일한 데이터를 필요로 할 때
> 

예를 들면 이런 데이터들:

- 사용자 로그인 정보 (user)
- 현재 UI 테마 (dark / light)
- 선택된 언어 (locale)
- 사이트 설정 값 등...

---

## 🧪 간단한 Context 사용 예시

### 1. Context 생성하기

```
import React from "react";

// 기본값으로 "light"를 설정
const ThemeContext = React.createContext("light");

```

### 2. Context 제공하기 (Provider)

```
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

```

> value로 하위 컴포넌트에게 공유할 값을 넘겨준다.
> 

### 3. Context 사용하기 (Consumer 또는 Hook)

```
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {(theme) => <button className={theme}>버튼</button>}
    </ThemeContext.Consumer>
  );
}

```

---

## ⚡ 더 간단하게: useContext Hook

> 함수형 컴포넌트에서는 useContext()를 사용하면 훨씬 간단해요!
> 

```
import { useContext } from "react";

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>버튼</button>;
}

```

---

## 🔁 Context 흐름 요약

1. `React.createContext()`로 생성
2. `Provider`로 데이터 제공
3. 하위 컴포넌트에서 `useContext()` 또는 `Consumer`로 데이터 사용

---

## ⚠️ Context 사용 시 주의점

| 주의할 점 | 설명 |
| --- | --- |
| 리렌더링 주의 | Context의 `value`가 변경되면 하위 컴포넌트 전부 리렌더링 |
| 과도한 사용 ❌ | 모든 상태를 Context로 관리하면 오히려 복잡해짐 |
| props로 충분한 경우 | 단순한 데이터 전달이면 props가 더 효율적일 수 있음 |

---

## ✨ 언제 Context를 사용하면 좋을까?

- 로그인한 사용자 정보 (user)
- 테마 정보 (다크모드, 라이트모드)
- 언어 설정
- 장바구니 상태 (e-commerce)


---

# 🎨 CSS 기본 문법과 셀렉터

> CSS는 웹사이트를 꾸미는 언어
> 
> 
> HTML로 구조를 만들고, CSS로 **색깔, 크기, 배치, 애니메이션** 등을 지정할 수 있다.
> 

---

## ✅ CSS 기본 문법

```
선택자 {
  속성: 값;
}

```

### 예시:

```
h1 {
  color: blue;
  font-size: 24px;
}

```

- **선택자(selector)**: 어떤 HTML 요소에 스타일을 적용할지 선택
- **속성(property)**: 변경하고 싶은 스타일 항목 (ex. 색상, 글씨 크기 등)
- **값(value)**: 속성에 적용할 구체적인 값

---

## 📌 선택자(Selector) 종류

### 1️⃣ 태그 선택자 (Element Selector)

```
h1 {
  color: green;
}

```

→ 모든 `<h1>` 태그에 적용

---

### 2️⃣ 클래스 선택자 (Class Selector)

```
.title {
  font-weight: bold;
}

```

→ class 속성이 `"title"`인 요소에 적용

**사용 시 HTML에 class 이름을 부여해야 함**

```
<p class="title">중요한 문장</p>

```

---

### 3️⃣ ID 선택자 (ID Selector)

```
#main {
  background-color: yellow;
}

```

→ id 속성이 `"main"`인 요소에 적용

**주의: ID는 한 페이지에 하나만**

```
<div id="main">내용</div>

```

---

### 4️⃣ 그룹 선택자 (Grouping Selector)

```
h1, h2, p {
  margin: 0;
}

```

→ 여러 태그에 같은 스타일을 한 번에 적용

---

### 5️⃣ 전체 선택자 (Universal Selector)

```
* {
  box-sizing: border-box;
}

```

→ 모든 요소에 적용

초기화나 공통 스타일 설정 시 유용

---

### 6️⃣ 결합 선택자 (조합)

```
div.title {
  color: red;
}

```

→ `div` 태그 중에 class가 `"title"`인 요소에만 적용

```
#main .title {
  font-size: 18px;
}

```

→ id가 `"main"`인 요소 내부의 class `"title"` 요소에 적용

---

## 🎯 상태 선택자 (Pseudo-class)

> 엘리먼트의 특정 상태에 따라 스타일을 적용할 수 있다.
> 

| 선택자 | 설명 |
| --- | --- |
| `:hover` | 마우스 오버 시 |
| `:active` | 클릭 중일 때 |
| `:focus` | 포커스(입력창 선택) 상태 |
| `:first-child` | 부모의 첫 번째 자식 요소 |
| `:last-child` | 부모의 마지막 자식 요소 |

```
button:hover {
  background-color: skyblue;
}

```

---

## ✅ 텍스트 관련 속성 예시

```
p {
  font-size: 16px;
  color: #333;
  text-align: center;
}

```

---

## ✅ 박스 모델 관련 속성 예시

```
.box {
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid black;
  margin: 20px;
}

```

---

## 💡 정리

| 요소 | 설명 |
| --- | --- |
| 선택자 | 스타일 적용 대상을 지정 |
| 속성 | 어떤 스타일을 줄지 지정 |
| 값 | 구체적인 스타일 값 설정 |


---

# 📏 CSS 레이아웃 관련 속성 정리

> CSS 레이아웃 속성은 웹 페이지의 구조와 요소들의 배치 위치를 설정하는 데 사용된다.
> 
> 
> 한눈에 보기 쉽고, 구조가 깔끔한 웹사이트를 만들기 위한 핵심 도구
> 

---

## ✅ 1. `display`

> 요소의 표시 방식을 지정하는 속성
> 

### 자주 쓰이는 값

| 값 | 설명 |
| --- | --- |
| `block` | 블록 요소. 한 줄 전체를 차지함 (`div`, `p`, `h1` 등 기본값) |
| `inline` | 인라인 요소. 콘텐츠 크기만큼만 공간 차지 (`span`, `a` 등 기본값) |
| `none` | 요소를 숨김 (화면과 DOM에서 사라짐) |
| `flex` | **Flexbox 레이아웃 컨테이너**로 설정 |
| `inline-block` | 인라인처럼 배치되지만 블록처럼 width, height 조절 가능 |

```
.container {
  display: flex;
}

```

---

## ✅ 2. `visibility`

> 요소를 숨길지 말지 결정하지만, 공간은 유지됨
> 

| 값 | 설명 |
| --- | --- |
| `visible` | 기본값. 보임 |
| `hidden` | 보이지 않음. 하지만 해당 영역은 차지 |

```
.box {
  visibility: hidden;
}

```

---

## ✅ 3. `position`

> 요소를 어떤 기준으로 위치시킬지 설정하는 속성
> 

| 값 | 설명 |
| --- | --- |
| `static` | 기본값. 문서 흐름에 따름 |
| `relative` | 현재 위치 기준으로 이동 가능 |
| `absolute` | 가장 가까운 **position 지정된 조상** 기준으로 위치 |
| `fixed` | **브라우저 창 기준**으로 고정 |
| `sticky` | 스크롤 위치에 따라 고정/해제 전환 |

### 예시:

```
.box {
  position: absolute;
  top: 50px;
  left: 100px;
}

```

---

## ✅ 4. `width`, `height`

> 요소의 크기를 설정하는 속성
> 

```
.box {
  width: 300px;
  height: 150px;
}

```

- `auto` : 콘텐츠에 따라 자동 조절
- `%` : 부모 요소의 크기에 대한 백분율
- `min-width`, `max-width` : 최소/최대 크기 제한

---

## ✅ 5. `margin`, `padding`

> 요소 밖 여백(margin) 과 안쪽 여백(padding)
> 

```
.box {
  margin: 20px;
  padding: 10px;
}

```

### 방향별 속성

| 속성 | 설명 |
| --- | --- |
| `margin-top`, `padding-top` | 위쪽 여백 |
| `margin-right`, `padding-right` | 오른쪽 여백 |
| `margin-bottom`, `padding-bottom` | 아래쪽 여백 |
| `margin-left`, `padding-left` | 왼쪽 여백 |

---

## ✅ 6. Flexbox 기초

> Flexbox(플렉스 박스) 는 복잡한 레이아웃을 간단하게 만드는 CSS3의 핵심 기능
> 

```
.container {
  display: flex;
}

```

### 자주 사용하는 속성

| 속성 | 설명 |
| --- | --- |
| `flex-direction` | 아이템 정렬 방향 (`row`, `column`, `row-reverse`, `column-reverse`) |
| `justify-content` | **주 축(Main axis)** 정렬 (`start`, `center`, `space-between`, ...) |
| `align-items` | **교차 축(Cross axis)** 정렬 (`start`, `center`, `stretch`, ...) |

### 예시:

```
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

```



---

## ⭐️ 정리

- `display`: 요소의 기본 표시 유형 결정
- `position`: 화면에서 요소의 정확한 위치 조정
- `margin`, `padding`: 여백 조정
- `flex`: 다양한 레이아웃을 쉽게 구성
- `width`, `height`: 크기 설정

---


# 📦 Flexbox란?

> Flexbox(Flexible Box Layout) 는 CSS에서 1차원 레이아웃을 쉽게 구성하기 위한 도구
> 
- 복잡한 레이아웃을 단순한 코드로 구현 가능
- 요소들을 행(row) 또는 열(column) 방향으로 정렬하기에 적합

---

## ✅ 기본 구조

Flexbox를 사용하려면, 먼저 **부모 요소에 `display: flex`** 를 지정해야 한다.

```
.container {
  display: flex;
}

```

이렇게 하면 `.container`는 **Flex Container**, 내부 요소들은 **Flex Item**이 된다.

---

## 🔁 주요 용어 정리

| 용어 | 설명 |
| --- | --- |
| **Main Axis** | 주 축 (기본은 수평) |
| **Cross Axis** | 교차 축 (기본은 수직) |
| **Flex Container** | `display: flex`가 설정된 부모 요소 |
| **Flex Item** | 컨테이너 안에 있는 자식 요소들 |

---

## 🧭 1. `flex-direction`

> 아이템의 배치 방향을 지정한다.
> 

| 값 | 설명 |
| --- | --- |
| `row` | → 수평 (기본값) |
| `row-reverse` | ← 수평 역순 |
| `column` | ↓ 수직 |
| `column-reverse` | ↑ 수직 역순 |

```
.container {
  display: flex;
  flex-direction: row; /* 또는 column */
}

```

---

## 📍 2. `justify-content`

> Main Axis(주 축) 기준 정렬
> 

| 값 | 설명 |
| --- | --- |
| `flex-start` | 시작점 정렬 |
| `flex-end` | 끝점 정렬 |
| `center` | 중앙 정렬 |
| `space-between` | 양 끝 정렬 + 아이템 사이 동일 간격 |
| `space-around` | 아이템 **양쪽**에 동일 간격 |
| `space-evenly` | 아이템 **사이사이 포함한 간격**이 동일 |

```
.container {
  justify-content: center;
}

```

---

## 🧲 3. `align-items`

> Cross Axis(교차 축) 기준 정렬 (한 줄일 때)
> 

| 값 | 설명 |
| --- | --- |
| `stretch` | (기본값) 아이템을 컨테이너에 꽉 차게 늘림 |
| `flex-start` | 시작점 정렬 |
| `flex-end` | 끝점 정렬 |
| `center` | 중앙 정렬 |
| `baseline` | 텍스트 기준선 정렬 |

```
.container {
  align-items: stretch;
}

```

---

## 🔂 4. `flex-wrap`

> 아이템이 넘칠 경우 줄바꿈 여부를 설정
> 

| 값 | 설명 |
| --- | --- |
| `nowrap` | 줄바꿈 안 함 (기본값) |
| `wrap` | 자동 줄바꿈 |
| `wrap-reverse` | 반대 방향으로 줄바꿈 |

```
.container {
  flex-wrap: wrap;
}

```

---

## 🔧 5. `align-content`

> 여러 줄일 경우, 줄 전체에 대한 교차축 정렬 방식 지정
> 

```
.container {
  align-content: space-between;
}

```

> align-items는 "아이템" 정렬이고
> 
> 
> `align-content`는 "줄 전체" 정렬
> 

---

## 🎚 6. 개별 아이템 정렬 - `align-self`

> 특정 아이템만 개별적으로 교차축 정렬을 조정할 때 사용
> 

```
.item {
  align-self: flex-end;
}

```

---

## 🧪 Flex 속성 예제

```
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

```

```
<div class="container">
  <div class="item">Box 1</div>
  <div class="item">Box 2</div>
  <div class="item">Box 3</div>
</div>

```

---

## 💡 Flex 아이템 전용 속성

| 속성 | 설명 |
| --- | --- |
| `flex-grow` | 남은 공간을 얼마나 확장할지 |
| `flex-shrink` | 공간 부족 시 줄어드는 비율 |
| `flex-basis` | 아이템의 기본 크기 |

```
.item {
  flex: 1; /* flex-grow: 1, shrink: 1, basis: 0 */
}

```

---

## ⭐️ 정리

- Flexbox는 요소의 정렬과 배치를 **한 차원에서 효율적으로** 처리
- 축 개념(Main / Cross)이해 필요

<br>

---



# 🖼️ styled-components란?

> styled-components는 CSS-in-JS 방식의 오픈소스 라이브러리입니다.
> 
> 
> JavaScript 파일 안에서 CSS를 작성하고, 이를 **컴포넌트 형태**로 사용하는 것이 핵심
> 
- React와 매우 잘 어울리는 스타일링 방식
- 코드와 스타일이 함께 있으므로 **유지보수가 용이**

---

## ✨ 기본 사용법

```
import styled from 'styled-components';

const Title = styled.h1`
  color: #fff;
  background: #333;
  padding: 20px;
  border-radius: 8px;
`;

function App() {
  return <Title>Hello, styled-components!</Title>;
}

```

- `styled.h1` → HTML 태그를 기반으로 스타일 컴포넌트를 생성
- 백틱(```) 안에 **CSS 문법 그대로** 작성

---

## 🎯 props로 스타일 동적 제어

> styled-components는 props를 활용해 스타일도 동적으로 바꿀 수 있다.
> 

```
const Button = styled.button`
  background: ${(props) => (props.primary ? "blue" : "gray")};
  color: white;
  padding: 10px 20px;
  border: none;
`;

function App() {
  return (
    <><Button>Default</Button>
      <Button primary>Primary</Button>
    </>
  );
}

```

- `props.primary` 값에 따라 버튼 색상이 바뀜
- 조건부 스타일링을 **JS 로직**처럼 작성할 수 있음

---

## 📌 스타일 확장하기

> 기존 스타일드 컴포넌트를 재사용 및 확장할 수 있습니다.
> 

```
const Button = styled.button`
  padding: 10px;
  background: #ccc;
`;

const RoundButton = styled(Button)`
  border-radius: 20px;
`;

```

- `RoundButton`은 `Button`의 스타일을 **기반으로 확장**
- 공통 스타일을 분리할 때 매우 유용

---

## 📁 전역 스타일 설정 - createGlobalStyle

```
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #f5f5f5;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

function App() {
  return (
    <><GlobalStyle />
      <Main />
    </>
  );
}

```

- `GlobalStyle`을 통해 전체 앱에 공통 스타일 적용 가능
- `App` 컴포넌트 루트에서 한 번만 호출

---

## ⭐️ 정리

| 장점 | 설명 |
| --- | --- |
| 컴포넌트 기반 | 스타일도 컴포넌트로 관리 가능 |
| CSS 문법 그대로 | 따로 문법을 배울 필요 없음 |
| props 활용 | 조건부 스타일링 가능 |
| JS와의 통합 | 동적 로직 구현 가능 |
