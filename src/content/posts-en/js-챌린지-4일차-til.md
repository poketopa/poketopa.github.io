---
title: "JS Challenge Day 4 TIL"
description: "Creating arrays. In JavaScript, an array is a data structure that stores multiple values in a single variable. 1. What is an array? An array stores values in consecutive storage spaces. Each value can be accessed using a number called an index. Comparing arrays and objects. Data structure, organization, example. Object…"
publishedAt: 2025-03-11
updatedAt: 2026-08-14
category: Development
cover: /covers/javascript-thumbnail.png
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: 9c2caaaa-8558-4303-a41a-1ce78ecfd3ca
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-4%EC%9D%BC%EC%B0%A8-TIL
draft: false
---

![](/images/velog/js-챌린지-4일차-til-01.webp)

## Creating arrays
In JavaScript, an array is a data structure that stores multiple values in a single variable.

### 1. What is an array?
An array is a data structure that stores values in consecutive storage spaces.
Each value can be accessed using a number called an index.

### Comparing arrays and objects
Data structure	Organization	Example
Object	Keys and values	
```
{ name: "Alice", age: 25 }
```
Array	Indices and values	
```
[1, 2, 3, 4, 5]
```
### 2. Ways to create arrays
There are several ways to create an array.
The most common is to use square brackets ([]).

#### 1) Creating an empty array
```
let arr = []; // 배열 생성
console.log(arr.length); // 0
```
Using square brackets [] when declaring an array creates an empty array.
#### 2) Creating an array with values
```
let numbers = [1, 2, 3, 4, 5]; // 숫자를 포함한 배열
console.log(numbers.length); // 5
```
Multiple values can be stored within an array using commas (,).

#### 3) An array containing various data types
Arrays can store any data type, and different types can be stored together.

```
let mixedArray = [100, "Hello", true, { name: "임현성" }, [1, 2, 3]];
```
They can contain various types, including Number, String, Boolean, Object, and Array.

### 3. Checking an array's length
Use the .length property to check an array's length.

```
let arr = [10, 20, 30, 40, 50];
console.log(arr.length); // 5
```
The .length property returns the number of elements in the array.

### 4. Accessing array elements
Each array element can be accessed using an index.
JavaScript arrays use zero-based indices.

#### 1) Reading array elements
```
let arr = [10, 20, 30, 40, 50];

console.log(arr[0]); // 10 (첫 번째 요소)
console.log(arr[2]); // 30 (세 번째 요소)
console.log(arr[4]); // 50 (다섯 번째 요소)
```
arr[0] → Access the first element
arr[2] → Access the third element
arr[4] → Access the fifth element

#### 2) Accessing a nonexistent index
```
let arr = [1, 2, 3];
console.log(arr[4]); // undefined
```
Accessing a nonexistent index returns undefined.

### 5. The relationship between arrays and strings
Arrays and strings have similar structures.
Strings can also be treated like arrays of characters.

```
let str = "Hello";

console.log(str[0]); // "H"
console.log(str[4]); // "o"
console.log(str.length); // 5
```
As with arrays, individual characters in a string can be accessed by index.
str[0] → Returns the first character, "H"
str.length → Returns the string's length

## Using arrays

### 1. Adding and removing array elements
The main methods for adding or removing elements at either end of an array are as follows.

```
push()	배열 뒤에 요소 추가		arr.push(1);
pop()	배열 뒤에서 요소 제거	arr.pop();
unshift()	배열 앞에 요소 추가	arr.unshift(0);
shift()	배열 앞에서 요소 제거	arr.shift();
```
#### 1) Adding/removing elements at the end
```
let arr = [1, 2, 3, 4, 5];

console.log(arr.pop()); // 5 (제거된 요소)
console.log(arr); // [1, 2, 3, 4] (5가 삭제됨)

arr.push(6);
console.log(arr); // [1, 2, 3, 4, 6] (6이 추가됨)
```
pop() → Remove and return the last element
push(value) → Add an element to the end

#### 2) Adding/removing elements at the beginning
```
let arr = [1, 2, 3, 4];

console.log(arr.shift()); // 1 (제거된 요소)
console.log(arr); // [2, 3, 4] (1이 삭제됨)

arr.unshift(0);
console.log(arr); // [0, 2, 3, 4] (0이 앞에 추가됨)
```
shift() → Remove and return the first element
unshift(value) → Add an element to the beginning

### 2. Sorting arrays

Method	Description	Example
```
reverse()	배열의 순서를 뒤집음	
arr.reverse();

sort()	배열을 오름차순 정렬 
arr.sort();
```
#### 1) reverse() – Reversing an array
```
let arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
```
Reverses the array's order.

#### 2) sort() – Sorting an array
```
let arr = [5, 3, 1, 4, 2];
arr.sort();
console.log(arr); // [1, 2, 3, 4, 5]
```
By default, sort() performs string sorting.
To sort numbers correctly, use a comparison function.
```
let numbers = [10, 5, 20, 15];
numbers.sort((a, b) => a - b);
console.log(numbers); // [5, 10, 15, 20]
```
Using (a, b) => a - b sorts numbers in ascending order.

### 3. Combining arrays (concat)
Use concat() to combine multiple arrays into one.

```
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4, 5, 6]
```
concat() returns a new array without changing the existing arrays.

### 4. Finding array elements
Use indexOf() and lastIndexOf() to find the index of a particular element in an array.

Method	Description	Example
```
indexOf(value)	배열에서 첫 번째로 등장하는 위치 반환	
arr.indexOf(2);

lastIndexOf(value)	배열에서 마지막으로 등장하는 위치 반환	
arr.lastIndexOf(2);
```

#### 1) indexOf() – Finding the first occurrence
```
let arr = [1, 2, 3, 2, 4, 5];

console.log(arr.indexOf(2)); // 1 (첫 번째 2의 위치)
```
Returns the index of the element's first occurrence in the array.

#### 2) lastIndexOf() – Finding the last occurrence
```
console.log(arr.lastIndexOf(2)); // 3 (마지막 2의 위치)
```
Returns the index of the element's last occurrence in the array.

### 5. Converting strings to arrays (split)
Use split() to divide a string at a particular separator and convert it into an array.

```
let str = "1,2,3,4,5";
let arr = str.split(",");
console.log(arr); // ["1", "2", "3", "4", "5"]
```
split(",") → Split the string at commas (,) and convert it into an array.
split() makes it easy to convert CSV data into arrays.

#### 1) Splitting at spaces
```
let sentence = "Hello World";
let words = sentence.split(" ");
console.log(words); // ["Hello", "World"]
```
Splits the string at spaces " " to create an array of words.

#### 2) Splitting after removing specific characters
You can also use regular expressions to split at specific characters.

```
let text = "hello;world,red blue";
let fruits = text.split(/[;, ]+/);
console.log(fruits); // ["hello", "world", "red", "blue"]
```
/[;, ]+/ → Split at semicolons (;), commas (,), and spaces ( )
Regular expressions let you handle multiple separators at once.

## Comments

### 1. Why comments matter
They improve code readability and make maintenance easier.
They help readers understand the code's purpose.

### 2. Types of comments
JavaScript supports two kinds of comments: single-line and multiline.

#### Comment type	Usage	Description

```
한 줄 주석	// 주석 내용	한 줄만 주석 처리할 때 사용
여러 줄 주석	/* 주석 내용 */	여러 줄을 주석 처리할 때 사용
```
### 3. Single-line comments (//)
A single-line comment comments out the text after // on that line only.

```
// 변수 선언
let name = "임현성"; // 사용자의 이름을 저장

console.log(name); // 콘솔에 이름 출력
```
Text after // is treated as a comment and is not executed.
It is mainly used to explain what code does.
### 4. Multiline comments (/* */)
Use /* */ to comment out multiple lines at once.

```
/*
이 프로그램은 사용자의 이름을 입력받아
그 이름을 출력하고, 이름의 길이를 표시하는 프로그램입니다.
*
```
```
/```
let name = "홍길동";
console.log("당신의 이름은 " + name + "입니다.");
console.log(name + "님의 이름은 " + name.length + "글자입니다.");
\```
```

Because they can comment out multiple lines at once, they are useful when a long explanation is needed.

## if statements (conditionals)
In JavaScript, an if statement is a control statement that runs particular code only when a condition is true.

### 1. The basic idea of if
With an if statement, you can test a condition and run a particular block of code only if that condition is true.
A conditional expression always evaluates to a Boolean value (true or false).
If it is true, the code block runs; if false, it does not.

### 2. Basic if syntax

```
if (조건식) {
    // 조건이 true일 때 실행될 코드
}
```

### 3. if-else statements
An if statement alone runs only when its condition is true. Use else when you need code to run when it is false.
else is used with if and runs when the if condition is false.
Syntax
```
if (조건식) {
    // 조건이 true일 때 실행
} else {
    // 조건이 false일 때 실행
}
```

### 4. else if statements (testing multiple conditions)
Use else if to test multiple conditions.
When an if condition is false, an additional condition can be tested.
Conditions are checked sequentially, and only the first one that is true runs.
Syntax

```
if (조건식1) {
    // 조건식1이 true일 때 실행
} else if (조건식2) {
    // 조건식1이 false이고, 조건식2가 true일 때 실행
} else {
    // 모든 조건이 false일 때 실행
}
```

### 5. Nested if statements (an if inside an if)
You can put another if statement inside an if statement.
Use this when you want to test an additional condition after a particular condition is met.

### 6. Using logical operators in conditions
Logical operators (&&, ||, !) can be used in if statements to test compound conditions.

Example: using logical operators

```
let age = 25;
let isStudent = true;

if (age >= 18 && isStudent) {
    console.log("대학생입니다.");
}

if (age < 18 || isStudent) {
    console.log("학생 할인 가능");
}

if (!isStudent) {
    console.log("학생이 아닙니다.");
}
```
```
age >= 18 && isStudent → 둘 다 true 이므로 "대학생입니다." 출력
age < 18 || isStudent → 하나만 true여도 실행되므로 "학생 할인 가능" 출력
!isStudent → isStudent 가 true이므로 false가 되어 실행되지 않음
```

## switch
In JavaScript, switch selects and runs one of several cases based on a particular value.

### 1. The basic idea of switch
A switch statement evaluates an expression, then runs the case matching that value.
It can express multiple if-else if statements more concisely.

### 2. Basic switch syntax

```
switch (값) {
    case 값1:
        // 값이 값1과 일치할 경우 실행되는 코드
        break;
    case 값2:
        // 값이 값2와 일치할 경우 실행되는 코드
        break;
    default:
        // 위의 case에 해당하지 않는 모든 경우 실행
}
```
Checks the value in switch(value) and runs the matching case.
Using break; exits the switch statement after execution.
default runs when none of the cases match.

### 3. Without break
If break is omitted, the next case runs too.

```
let choice = 2;

switch (choice) {
    case 1:
        console.log("아메리카노 - 3000원");
    case 2:
        console.log("카페라떼 - 3500원");
    case 3:
        console.log("카푸치노 - 4000원");
    default:
        console.log("잘못된 선택입니다.");
}
```
Output:

```
카페라떼 - 3500원
카푸치노 - 4000원
잘못된 선택입니다.
```
After case 2: runs, there is no break, so case 3: and default: both run as well.
This is called "fall-through."

### 4. The role of default
default runs when no case matches.
It plays the same role as else in an if-else statement.
Example: using default

```
let day = 10;

switch (day) {
    case 1:
        console.log("월요일");
        break;
    case 2:
        console.log("화요일");
        break;
    case 3:
        console.log("수요일");
        break;
    default:
        console.log("올바른 요일을 입력하세요.");
}
```
Output:

```
올바른 요일을 입력하세요.
```
Because day = 10 does not match any case, default runs.

## Practice code

#### Creating arrays - Exercise (1)
> ![](/images/velog/js-챌린지-4일차-til-02.webp)

#### Creating arrays - Exercise (2)
> ![](/images/velog/js-챌린지-4일차-til-03.webp)

#### Using arrays - Exercise
> ![](/images/velog/js-챌린지-4일차-til-04.webp)

#### Comments - Exercise
> ![](/images/velog/js-챌린지-4일차-til-05.webp)

#### if statements - Exercise (1)
> ![](/images/velog/js-챌린지-4일차-til-06.webp)

#### if statements - Exercise (2)
> ![](/images/velog/js-챌린지-4일차-til-07.webp)

#### if statements - Exercise (3)
> ![](/images/velog/js-챌린지-4일차-til-08.webp)

#### switch statements - Exercise
> ![](/images/velog/js-챌린지-4일차-til-09.webp)
