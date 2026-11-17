---
title: "JS Challenge Day 1 TIL"
description: "1. Setting up the practice environment. We will use Chrome and a text editor. Both are free, and you can run your HTML and JavaScript directly in Chrome. 1) Create a basic HTML file. Write a basic HTML file. 2) Save the files. Save as index.html. After saving the file,…"
publishedAt: 2025-03-08
updatedAt: 2026-08-14
category: Development
cover: /covers/javascript-thumbnail.png
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: debd9d8e-9de2-4d51-9c85-1c7a50680825
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-1%EC%9D%BC%EC%B0%A8-TIL
draft: false
---

![](/images/velog/js-챌린지-1일차-til-01.webp)

## 1. Setting up the practice environment
We will use Chrome and a text editor for practice.
Both are free, and you can run your HTML and JavaScript directly in Chrome.

#### 1) Create a basic HTML file
Write a basic HTML file
```
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    This is a basic HTML page
</body>
</html>
```

#### 2) Save the files
- Save the file as index.html
After saving, drag the file into the Chrome window to run it in the browser.

- Save the file as script.js
Use a script tag to load a JavaScript file from the HTML file.

```
<head>
    <script src="script.js"></script>
</head>
```

##   Using the Developer Console
Most browsers, including Chrome, Firefox, Safari, and Edge, provide a developer console that lets you check JavaScript output and debug code.

#### 1) Open developer tools

1. Use a keyboard shortcut
Windows: F12 or Ctrl + Shift + I
Mac: Cmd + Option + I
2. Open from the menu
Click ⋮ (the settings button) in the upper-right corner of Chrome
Select More tools → Developer tools

#### 2) Write JavaScript code

```
console.log("Hello developer console");
```

#### 3) Write and run a JavaScript file
Create and run a JavaScript file linked to HTML.

- Write script.js
```
console.log("Hello developer console");
console.log(2);
console.log(3);
```
- Load JavaScript from HTML
```
<head>
    <script src="script.js"></script>
</head>
```

#### 4) How to run it
Check Chrome's developer tools (Console tab).
Check the output from console.log().

- Running it prints "Hello, Developer Console!", 2, and 3 in that order.

- Run JavaScript directly in developer tools
You can also run JavaScript directly in the Console tab of developer tools.

- Run in the Console
1) Enter the following commands in developer tools (Console tab)
2) Press Enter to display the result
```
	console.log(4);
```

- You can run alert() too
```
alert("Hello, JavaScript!");
```

##   console.log()
console.log() is the most basic way to output data in JavaScript.
This function prints messages to the browser's developer tools (Developer Console).

#### Usage
```
console.log("HelloWorld"); // 문자열 출력
console.log(10); // 숫자 출력
console.log(true); // boolean 값 출력
```
Running it displays the result in the Console tab of developer tools.

#### Printing multiple values
```
console.log("Age:", 25, "City:", "Seoul");
```
- Multiple values can be separated by commas (,) and printed.

## Declaring and initializing variables
A variable is a virtual space where data can be stored and read while a program runs.
Variables are essential to storing and using data in JavaScript.

#### 1. What is a variable?
- A variable is a memory space that stores data.

#### 2. Declaring variables
JavaScript uses the let, const, and var keywords to declare variables.

```
let a; // 변수 선언 (값은 없음)
let b, c, d; // 여러 개의 변수 선언
```
- Declaring a variable without assigning a value leaves it undefined.

#### 3. Initializing variables (assigning values)
After declaring a variable, you can assign an initial value and use it.

```
let a = 10; // 변수 선언과 동시에 값 할당
let b = 20, c = 30; // 여러 개의 변수를 한 번에 초기화
```

## Using variables
How to read and use variable values, and how to receive user input

#### 1. Printing a variable's value
To print a stored value, simply use the variable's name.

- Print a value with alert()
```
let message = "Hello, World!";
alert(message);
```
The value stored in message is displayed through alert().

#### 2. Printing with console.log()
console.log() lets you print values in developer tools (Console).

```
let message = "Hello, World!";
console.log(message); // 개발자 도구에서 출력됨
```
Unlike alert(), it does not affect the screen and is visible only in the developer tools console.

#### 3. Receiving user input (prompt())
Use prompt() to receive user input.

```
let name = prompt("이름을 입력");
console.log(name + "님 안녕하세요.");
```
#### Execution flow
1) The user enters a name in the input dialog (prompt)
2) The entered value is stored in the name variable
2) Print using console.log() ("Hello, Hong Gil-dong.")

- prompt() stores user input as a string.
- You can concatenate the input value with a string (using +) to print a message.

## Basic data types
In JavaScript, the kinds of values that can be stored in variables are called data types.

#### 1. JavaScript's basic data types
The main data types that can be stored in JavaScript variables are as follows.

#### Type	Description	Example
Number	Numeric type (including integers and real numbers)	100, 3.14
String	String type (text data)	"Hello"
Boolean	Boolean type (true/false)	true, false

#### 2. Data type examples
The following code examples use each data type.

```
let a = 100;      // Number (숫자형)
let b = 3.14;     // Number (실수도 숫자형)
let c = "안녕하세요"; // String (문자열)
let d = true;     // Boolean (참)
let e = false;    // Boolean (거짓)
```

```
console.log(a, typeof a); // 100 "number"
console.log(c, typeof c); // "안녕하세요" "string"
console.log(d, typeof d); // true "boolean"
```
The typeof operator lets you check a variable's data type.

#### 3. Checking data types with typeof
In JavaScript, use typeof to check a variable's data type.

```
let message = "Hello, World!";
console.log(typeof message); // "string"

let age = 25;
console.log(typeof age); // "number"

let isAdult = true;
console.log(typeof isAdult); // "boolean"
```
typeof returns the variable's type as a string.

#### 4. Checking directly in developer tools (Console)
You can also check a variable's value directly in developer tools (Console).

```
let x = 42;
x;
```
Entering only a variable's name in the console prints its value.

- Even without console.log(x);, entering the variable name directly in the console automatically prints its value.

## Practice code

#### console.log - Exercise
> ![](/images/velog/js-챌린지-1일차-til-02.webp)

#### Variables - Exercise
> ![](/images/velog/js-챌린지-1일차-til-03.webp)

#### Using variables - Exercise
> ![](/images/velog/js-챌린지-1일차-til-04.webp)

#### Basic data types - Exercise (1)
> ![](/images/velog/js-챌린지-1일차-til-05.webp)

#### Basic data types - Exercise (2)
> ![](/images/velog/js-챌린지-1일차-til-06.webp)

#### Basic data types - Exercise (3)
> ![](/images/velog/js-챌린지-1일차-til-07.webp)
