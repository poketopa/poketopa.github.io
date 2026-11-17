---
title: "React Week 2 Notes"
description: "💡 Conditional Rendering. In React, displaying different UI depending on the situation is called “conditional rendering.” JavaScript conditionals let us dynamically change what a component renders. ✅ Using conditional rendering: React can render different components or JSX elements according to conditions, much like an if statement…"
publishedAt: 2025-04-06
updatedAt: 2026-08-14
category: Development
cover: /covers/react-thumbnail.png
tags: ["React"]
source:
  platform: Velog
  id: f3c054fa-1aa1-4b93-898f-dde164f6e312
  url: https://velog.io/@lhs5427ll/React-2%EC%A3%BC%EC%B0%A8-%EC%A0%95%EB%A6%AC
draft: false
---
# 💡 Conditional Rendering

> In React, displaying different UI depending on the situation is called “conditional rendering.”
>

Essentially, JavaScript conditionals let us dynamically change what a component renders.

---

## ✅ Using conditional rendering

React can **render different components or JSX elements** according to conditions, much like an **if statement**.

> For example, depending on login status, a screen can show “Welcome!” or “Please log in.”
>

---

## 🔍 Conditional rendering approaches

### 1. Using an `if` statement

```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  if (isLoggedIn) {
    return <h1>환영합니다!</h1>;
  }
  return <h1>로그인 해주세요.</h1>;
}

```

- The most intuitive approach: return a component according to a condition.
- Readable when there are multiple complex conditions.

---

### 2. Using `ternary operator` (inline conditions)

```
function Greeting(props) {
  return (
    <h1>
      {props.isLoggedIn ? '환영합니다!' : '로그인 해주세요.'}
    </h1>
  );
}

```

- Enables **short, clean code** for simple conditions.
- Can be used directly inside JSX.

---

### 3. Using the `&&` operator

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

- Use this to render JSX **only when a condition is true**.
- If `unreadMessages.length > 0` is true, `<h2>` is rendered.

---

## ❗ Note: `false`, `null`, and `undefined` are not rendered

```
return <div>{false}</div>; // 화면에 아무것도 렌더링되지 않음

```

- In JSX, `false`, `null`, `undefined`, and `true` are ignored and do not appear onscreen..

---

## ✨ Example: toggling login buttons

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

- Each button click changes the **state**,
- causing **a different component to be conditionally rendered**.

---

## ⭐️ Summary

| Approach | Description | Characteristics |
| --- | --- | --- |
| `if` statement | Branch on conditions outside JSX | Suitable for complex conditions |
| `ternary operator` | Branch on conditions inside JSX | Handles simple conditions |
| `&& operator` | Render only when true | Convenient for conditional output |

> ✍️ Conditional rendering is essential for improving the user experience.
>

<br>

---

# 💡 Lists and Keys

> React uses list rendering to display multiple data items repeatedly onscreen.
>

Each item must have a **unique key** to distinguish it.

---

## ✅ What is list rendering?

JavaScript's `map()` function can **render the data in an array repeatedly**.

### 📌 Example: displaying an array onscreen

```
const numbers = [1, 2, 3, 4, 5];

const listItems = numbers.map((number) =>
  <li>{number}</li>
);

return <ul>{listItems}</ul>;

```

> Use map() to convert array elements into li elements, then output them as JSX.
>

---

## 🔐 What is a key?

> A unique value distinguishing each item in a list.
>

React uses keys to identify which items have changed, been added, or been removed.

```
const numbers = [1, 2, 3, 4, 5];

const listItems = numbers.map((number) =>
  <li key={number}>{number}</li>
);

```

- Here, `key={number}` uniquely identifies each item.
- Missing or duplicate keys cause **warning messages** and may reduce performance.

---

## ❗ Can I use an index as a key?

```
const listItems = items.map((item, index) =>
  <li key={index}>{item}</li>
);

```

- Using `index` as a key is **not recommended**. ❌
- Reason: when list order changes or items are added/removed, index values change, potentially causing incorrect synchronization.

> Use a unique ID as the key whenever possible.
>

---

## ⭐️ Summary

| Concept | Description |
| --- | --- |
| List rendering | Repeated rendering using `map()` |
| key | A value uniquely identifying each item |
| Good key values | Unique IDs (avoid indices) |

---

# 💡 Forms and Controlled Components

> Forms are HTML elements used to receive user input,
>
>
> and the approach in which React **directly controls** input values is called a **controlled component**.
>

---

## ✅ Why use controlled components?

In conventional HTML, the **DOM directly managed** form elements such as `<input>`, `<textarea>`, and `<select>`.

But in React, **controlling input values through state (controlled components)**

lets us track entered values in real time and flexibly change behavior according to conditions.

---

## ✍️ Basic controlled component example

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

- `value={name}`: connects the input value to state.
- `onChange={handleChange}`: updates state with each input change.
- Controls the input value through `useState` (controlled).

---

## ✅ Controlling different form elements

### 📌 Controlling a textarea

```
<textarea value={message} onChange={(e) => setMessage(e.target.value)} />

```

### 📌 Controlling a select

```
<select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
</select>

```

- The select's `value` is also connected to state.
- Different input elements can be controlled in the same way.

---

## ❗ Things to watch out for

- Assigning `value` to an input without `onChange` creates **a field that cannot be edited**.
- Always use `value` and `onChange` together.

---

## ✅ Example: receiving user information

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

- Manage several inputs as an object in state.
- Use the `name` attribute to distinguish fields.

---

## ⭐️ Summary

| Concept | Description |
| --- | --- |
| Controlled component | React state controls form element values |
| value | Connects a state value to an input or other element |
| onChange | Updates state when input changes |
| Benefits | Tracks input, controls conditions, enables real-time validation |

---

# 💡 Sharing State (State Lifting)

> Sharing state is a pattern for multiple child components using the same state:
>
>
> **lift that state into a common parent component** and manage it there.
>

---

## ✅ Why share state (state lifting)?

In React, components have **independent state**.

But sometimes **multiple components need to share the same data**.

Creating that state separately in each child component causes ❌ inconsistent data.

→ Solution: **lift state into a common parent component**.

---

## 🔍 Simple example: synchronizing two inputs

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

- The `Calculator` component owns the state,
- and `TemperatureInput` **receives it through props to display and update it**.
- Moving state into the parent this way is called **state lifting**.

---

## ⭐️ Key points

| Concept | Description |
| --- | --- |
| Sharing state | Multiple components use the same state |
| Lifting State Up | Move state into a common parent for management |
| Benefits | Synchronizes data and clarifies flow |
| Drawback | Somewhat increases coupling between components |

---

## ✅ When should we lift state?

- **When two or more child components need the same data**.
- **When child components need to share state with each other**.
- Example: a component showing a filtered list and a search input.

---

- `SearchInput`: enters a search term.
- `List`: displays filtered results.
- The parent `FilterableList` manages their common state, `filterText`.

---

# 💡 Component Composition and Inheritance

> React combines components through composition,
>
>
> preferring it over **inheritance**.
>

---

## ✅ React recommends composition over inheritance

- While class-based object-oriented languages often use **inheritance**,

    most problems in React can be solved through **component composition**.

- Composition enables **more flexible, reusable structures**.

---

## 🔗 Types of component composition

React mainly uses the following **two composition patterns** to combine components.

### 1. Containment (including children)

> Receive child elements through props.children and render them.
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

✅ With **props.children**,

parent components can freely pass any elements as children.

---

### 2. Specialization (changing only some content)

> Reuse a general component for a specific purpose.
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

✅ Suitable when you want to **keep the general structure**

and **change only the content**.

---

## ⭐️ Composition and inheritance compared

| Aspect | Composition | Inheritance |
| --- | --- | --- |
| Usage | Recommended in React ✅ | Rarely used ❌ |
| Benefits | Flexible and composable | High code coupling |
| Examples | children, props | Class inheritance with extends, etc. |

---

# 💡 What Is the Context API?

> Context is a React feature that lets us share data (state) throughout a component tree.
>

React uses **one-way data flow** by default.

That is, data passes from parent → child through `props`.

But as the component tree gets deeper,

**passing everything through props each time becomes cumbersome and inefficient**.

→ This is where the **Context API** comes in.

---

## ✅ When should we use Context?

> When multiple components need the same data.
>

For example:

- User login information (user).
- Current UI theme (dark / light).
- Selected language (locale).
- Site settings, etc.

---

## 🧪 A simple Context example

### 1. Creating a Context

```
import React from "react";

// 기본값으로 "light"를 설정
const ThemeContext = React.createContext("light");

```

### 2. Providing a Context (Provider)

```
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

```

> Pass the value to share with child components through value.
>

### 3. Using a Context (Consumer or Hook)

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

## ⚡ Simpler still: the useContext Hook

> In function components, useContext() makes this much simpler!
>

```
import { useContext } from "react";

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>버튼</button>;
}

```

---

## 🔁 Context flow summary

1. Create with `React.createContext()`.
2. Provide data through a `Provider`.
3. Use the data in child components through `useContext()` or `Consumer`.

---

## ⚠️ Things to watch out for with Context

| Caution | Description |
| --- | --- |
| Re-rendering | When Context's `value` changes, all child components re-render |
| Overuse ❌ | Managing all state with Context makes things more complex |
| When props suffice | Props may be more efficient for simple data passing |

---

## ✨ Good uses for Context

- Logged-in user information (user).
- Theme information (dark mode, light mode).
- Language settings.
- Shopping cart state (e-commerce).

---

# 🎨 Basic CSS Syntax and Selectors

> CSS is a language for styling websites.
>
>
> HTML creates the structure, and CSS specifies **colors, sizes, positioning, animations**, and so on.
>

---

## ✅ Basic CSS syntax

```
선택자 {
  속성: 값;
}

```

### Example:

```
h1 {
  color: blue;
  font-size: 24px;
}

```

- **Selector**: chooses which HTML elements receive the style.
- **Property**: the style aspect to change (e.g., color or font size).
- **Value**: the specific value applied to a property.

---

## 📌 Types of selectors

### 1️⃣ Element selector

```
h1 {
  color: green;
}

```

→ Applies to all `<h1>` tags.

---

### 2️⃣ Class selector

```
.title {
  font-weight: bold;
}

```

→ Applies to elements whose class attribute is `"title"`.

**Assign a class name in the HTML to use it.**

```
<p class="title">중요한 문장</p>

```

---

### 3️⃣ ID selector

```
#main {
  background-color: yellow;
}

```

→ Applies to elements whose id attribute is `"main"`.

**Note: only one instance of an ID per page.**

```
<div id="main">내용</div>

```

---

### 4️⃣ Grouping selector

```
h1, h2, p {
  margin: 0;
}

```

→ Applies the same style to multiple tags at once.

---

### 5️⃣ Universal selector

```
* {
  box-sizing: border-box;
}

```

→ Applies to all elements.

Useful for resets or shared styles.

---

### 6️⃣ Combined selectors (combinations)

```
div.title {
  color: red;
}

```

→ Applies only to `div` elements with the class `"title"`.

```
#main .title {
  font-size: 18px;
}

```

→ Applies to elements with class `"title"` inside an element whose id is `"main"`.

---

## 🎯 State selectors (pseudo-classes)

> Apply styles according to an element's particular state.
>

| Selector | Description |
| --- | --- |
| `:hover` | On mouse hover |
| `:active` | While being clicked |
| `:focus` | When focused (input selected) |
| `:first-child` | The parent's first child element |
| `:last-child` | The parent's last child element |

```
button:hover {
  background-color: skyblue;
}

```

---

## ✅ Examples of text properties

```
p {
  font-size: 16px;
  color: #333;
  text-align: center;
}

```

---

## ✅ Examples of box model properties

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

## 💡 Summary

| Element | Description |
| --- | --- |
| Selector | Specifies the target of a style |
| Property | Specifies which style to apply |
| Value | Sets the specific style value |

---

# 📏 CSS Layout Properties

> CSS layout properties define a web page's structure and the positions of its elements.
>
>
> Essential tools for creating websites with clear, easy-to-read structures.
>

---

## ✅ 1. `display`

> Specifies how an element is displayed.
>

### Common values

| Value | Description |
| --- | --- |
| `block` | Block element; takes up the whole line (default for `div`, `p`, `h1`, etc.) |
| `inline` | Inline element; occupies only the space needed for its content (default for `span`, `a`, etc.) |
| `none` | Hides the element (disappears from the screen and DOM) |
| `flex` | Creates a **Flexbox layout container** |
| `inline-block` | Positioned like an inline element, but width and height can be set as with a block |

```
.container {
  display: flex;
}

```

---

## ✅ 2. `visibility`

> Determines whether an element is hidden, while preserving its space.
>

| Value | Description |
| --- | --- |
| `visible` | Default; visible |
| `hidden` | Invisible, but still occupies its area |

```
.box {
  visibility: hidden;
}

```

---

## ✅ 3. `position`

> Specifies the reference used to position an element.
>

| Value | Description |
| --- | --- |
| `static` | Default; follows document flow |
| `relative` | Can move relative to its current position |
| `absolute` | Positioned relative to the nearest **positioned ancestor** |
| `fixed` | Fixed relative to the **browser window** |
| `sticky` | Switches between fixed and unfixed according to scroll position |

### Example:

```
.box {
  position: absolute;
  top: 50px;
  left: 100px;
}

```

---

## ✅ 4. `width`, `height`

> Set an element's size.
>

```
.box {
  width: 300px;
  height: 150px;
}

```

- `auto`: adjusts automatically to content.
- `%`: a percentage of the parent element's size.
- `min-width`, `max-width`: constrain minimum/maximum size.

---

## ✅ 5. `margin`, `padding`

> Space outside (margin) and inside (padding) an element.
>

```
.box {
  margin: 20px;
  padding: 10px;
}

```

### Directional properties

| Property | Description |
| --- | --- |
| `margin-top`, `padding-top` | Top spacing |
| `margin-right`, `padding-right` | Right spacing |
| `margin-bottom`, `padding-bottom` | Bottom spacing |
| `margin-left`, `padding-left` | Left spacing |

---

## ✅ 6. Flexbox basics

> Flexbox is a core CSS3 feature that simplifies complex layouts.
>

```
.container {
  display: flex;
}

```

### Common properties

| Property | Description |
| --- | --- |
| `flex-direction` | Item direction (`row`, `column`, `row-reverse`, `column-reverse`) |
| `justify-content` | **Main-axis** alignment (`start`, `center`, `space-between`, ...) |
| `align-items` | **Cross-axis** alignment (`start`, `center`, `stretch`, ...) |

### Example:

```
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

```

---

## ⭐️ Summary

- `display`: determines an element's basic display type.
- `position`: adjusts its precise position onscreen.
- `margin`, `padding`: adjust spacing.
- `flex`: easily creates various layouts.
- `width`, `height`: set size.

---

# 📦 What Is Flexbox?

> Flexbox (Flexible Box Layout) makes it easy to create one-dimensional layouts in CSS.
>
- Implements complex layouts with simple code.
- Suitable for arranging elements in rows or columns.

---

## ✅ Basic structure

To use Flexbox, first set **`display: flex` on the parent element**.

```
.container {
  display: flex;
}

```

This makes `.container` a **flex container**, and the elements inside it **flex items**.

---

## 🔁 Key terms

| Term | Description |
| --- | --- |
| **Main Axis** | Main axis (horizontal by default) |
| **Cross Axis** | Cross axis (vertical by default) |
| **Flex Container** | Parent with `display: flex` |
| **Flex Item** | Child elements inside the container |

---

## 🧭 1. `flex-direction`

> Specifies the direction in which items are arranged.
>

| Value | Description |
| --- | --- |
| `row` | → Horizontal (default) |
| `row-reverse` | ← Reverse horizontal |
| `column` | ↓ Vertical |
| `column-reverse` | ↑ Reverse vertical |

```
.container {
  display: flex;
  flex-direction: row; /* 또는 column */
}

```

---

## 📍 2. `justify-content`

> Alignment along the main axis.
>

| Value | Description |
| --- | --- |
| `flex-start` | Align to the start |
| `flex-end` | Align to the end |
| `center` | Center |
| `space-between` | Flush to both ends + equal spacing between items |
| `space-around` | Equal spacing on **both sides** of each item |
| `space-evenly` | Equal spacing **including every gap** |

```
.container {
  justify-content: center;
}

```

---

## 🧲 3. `align-items`

> Alignment along the cross axis (for a single line).
>

| Value | Description |
| --- | --- |
| `stretch` | Default; stretch items to fill the container |
| `flex-start` | Align to the start |
| `flex-end` | Align to the end |
| `center` | Center |
| `baseline` | Align text baselines |

```
.container {
  align-items: stretch;
}

```

---

## 🔂 4. `flex-wrap`

> Specifies whether overflowing items wrap onto another line.
>

| Value | Description |
| --- | --- |
| `nowrap` | No wrapping (default) |
| `wrap` | Wrap automatically |
| `wrap-reverse` | Wrap in the opposite direction |

```
.container {
  flex-wrap: wrap;
}

```

---

## 🔧 5. `align-content`

> Specifies cross-axis alignment of entire lines when there are multiple lines.
>

```
.container {
  align-content: space-between;
}

```

> align-items aligns “items,”
>
>
> while `align-content` aligns “entire lines.”
>

---

## 🎚 6. Individual item alignment — `align-self`

> Adjusts cross-axis alignment for a particular item individually.
>

```
.item {
  align-self: flex-end;
}

```

---

## 🧪 Flex property example

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

## 💡 Properties specific to flex items

| Property | Description |
| --- | --- |
| `flex-grow` | How much to expand into remaining space |
| `flex-shrink` | Shrink ratio when space is insufficient |
| `flex-basis` | The item's base size |

```
.item {
  flex: 1; /* flex-grow: 1, shrink: 1, basis: 0 */
}

```

---

## ⭐️ Summary

- Flexbox handles alignment and positioning **efficiently in one dimension**.
- Understanding the main and cross axes is necessary.

<br>

---

# 🖼️ What Is styled-components?

> styled-components is an open-source CSS-in-JS library.
>
>
> Its core idea is to write CSS inside JavaScript files and use it **as components**.
>
- A styling approach that works very well with React.
- Keeping code and styles together makes **maintenance easy**.

---

## ✨ Basic usage

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

- `styled.h1` → creates a styled component based on an HTML tag.
- Write **ordinary CSS syntax** inside backticks (```).

---

## 🎯 Controlling styles dynamically with props

> styled-components can use props to change styles dynamically, too.
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

- Button colors change according to `props.primary`.
- Write conditional styling like **JavaScript logic**.

---

## 📌 Extending styles

> Existing styled components can be reused and extended.
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

- `RoundButton` **extends** the styles of `Button`.
- Very useful for extracting shared styles.

---

## 📁 Global styles — createGlobalStyle

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

- `GlobalStyle` applies shared styles across the app.
- Invoke it only once at the root of the `App` component.

---

## ⭐️ Summary

| Benefit | Description |
| --- | --- |
| Component-based | Styles can be managed as components |
| Ordinary CSS syntax | No need to learn separate syntax |
| Use of props | Conditional styling is possible |
| Integration with JS | Dynamic logic is possible |
