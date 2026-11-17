---
title: "JS Challenge Day 2 TIL"
description: "The Number type. In JavaScript, Number represents numeric data, including integers and real numbers. 1. The Number type: JavaScript handles all numbers as one type without distinguishing integers from real numbers."
publishedAt: 2025-03-09
updatedAt: 2026-08-14
category: Development
cover: /covers/javascript-thumbnail.png
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: 3d226f92-d7e5-4523-aeba-164cefeae17d
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-2%EC%9D%BC%EC%B0%A8-TIL
draft: false
---

![](/images/velog/js-챌린지-2일차-til-01.webp)

## The Number type
In JavaScript, Number represents numeric data, including integers and real numbers.

### 1. The Number type
JavaScript handles all numbers as one type without distinguishing integers from real numbers.

#### Example number declarations
```
let a = 100; // 정수
let b = 3.14; // 실수
let c = 1.2e-3; // 지수 표기법 (0.0012)
```
- JavaScript represents numbers using 64-bit floating point.
- It can represent integers exactly in the range -2⁶³ to 2⁶³ - 1.

### 2. Converting strings to numbers
User input is handled as a String by default.
Even numeric input is stored as a string, so it must be converted to a number for calculations.

#### Receiving a string and checking its type
```
let input = prompt("입력"); 
console.log(input, typeof input);
```
- Running this code shows that the user's input is stored as a string.

### 3. Converting numbers with parseInt() and parseFloat()
In JavaScript, parseInt() and parseFloat() can convert strings to numbers.

#### Converting to an integer (parseInt())
```
let number = parseInt(number);
console.log(number, typeof number);
```
- parseInt() discards the fractional part and converts to an integer.

#### Converting to a real number (parseFloat())
```
let heightFloat = parseFloat(height);
console.log(heightFloat, typeof heightFloat); 
```
- parseFloat() converts to a real number, including the fractional part.

#### Conversion examples
```
let strNum = "123.4";
console.log(parseInt(strNum)); // 123 (정수 변환)
console.log(parseFloat(strNum)); // 123.4 (실수 변환)
```
### 4. Not-a-number values (NaN) and infinity (Infinity)
#### NaN (Not a Number)
```
let number = parseInt("안녕100"); 
console.log(number); // NaN (숫자로 변환 불가)
```
- If the input string cannot be converted to a number, NaN (Not a Number) is returned.
- NaN represents a numeric value on which calculations cannot be performed.

#### Infinity and -Infinity
```
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
```
- These values represent infinity and can occur when calculating excessively large values.

## The String type
In JavaScript, String is used to represent text data.

### 1. Declaring strings
In JavaScript, strings can be enclosed in double quotes ("") or single quotes ('').

#### Example string declarations
```
let a = "Hello, World!"; // 쌍따옴표 사용
let b = 'hello, world!'; // 따옴표 사용
```
- Double quotes ("") and single quotes ('') can both define strings in the same way.

### 2. Cautions when using quotation marks in strings
- Mixing double and single quotes can cause an error.

```
let error = "오류 발생'; // 에러 발생
let c = "Hello 'Hello'."; // 가능
let d = 'Hello "hello"world'; // 가능
```
- To use the same kind of quotation mark inside a string, use an "escape character."

### 3. The escape character (\)
Using the escape character (\) lets you output special characters literally within a string.

#### Examples using the escape character
```
let e = "helo : \"world\"";
console.log(e); // hello : "world"
```
- A backslash (\) lets you represent quotation marks (", ') literally.

#### Various escape sequences
Character	Description
\"	Insert a double quote
\'	Insert a single quote
\\	Insert a backslash (\)
\n	New line
### 4. Line breaks inside strings (\n)
Using "\n" creates a line break within a string.

#### Line-break example
```
let multiLine = "Hello,\nJavaScript!";
console.log(multiLine);
```
- Running it produces the following output.

Hello,
JavaScript!
### 5. Printing strings to the console
```
let message = "Hello, World";
console.log(message);
```
- You can check values in the developer tools (Console).
- When a string is printed with console.log(), it is displayed without quotation marks.

## The Object type
In JavaScript, Object stores multiple pieces of data in a single structure.

### 1. What is an Object?
- An object is a data structure with multiple properties.
- Properties are stored in the form "name: value."
- A property's value can be of any type (number, string, Boolean, another object, and so on).

### 2. Creating objects
The most basic way to create an object is using curly braces {}.

#### Creating an empty object
let emptyObject = {}; // Create an empty object
console.log(emptyObject); // {}
console.log(typeof emptyObject); // "object"
- With the typeof operator, an object's type is always printed as "object."

### 3. Creating an object with properties
An object is a collection of properties with names and values.

#### An object storing information about a person

```
let person = {
    name: "홍길동",
    age: 20,
    height: 180
};
console.log(person);
```
- name, age, and height are properties of the object.
- Property values can store various types, including String and Number.

### 4. Accessing object properties
There are two ways to access object properties: dot notation (.) and bracket notation ([]).

#### Using dot notation (.)
```
console.log(person.name); // "홍길동"
console.log(person.age); // 20
```
- Dot notation retrieves a value in the form object.propertyName.

#### Using bracket notation ([])
```
console.log(person["name"]); // "홍길동"
console.log(person["age"]); // 20
```
- With bracket notation, the property name must be passed as a string.
- This is useful when accessing properties dynamically using a variable.

#### 5. Changing object properties
An object's property values can be updated like variables.

#### Changing a property value
```
person.name = "김철수"; // 점 표기법으로 변경
person["age"] = 25; // 대괄호 표기법으로 변경

console.log(person);
```
- The existing property value is overwritten by the new value.

#### 6. Adding new properties to an object
To add a property, assign a value using a property name that does not yet exist.

#### Adding a new property
```
person.job = "개발자"; // 점 표기법으로 추가
person["city"] = "서울"; // 대괄호 표기법으로 추가

console.log(person);
```
- New properties can easily be added to an existing object.

## undefined and null
JavaScript has two special types representing the absence of a value:
- undefined
- null

### 1. What is undefined?
undefined is automatically assigned to a variable without an assigned value or when accessing an undefined property.

#### Declaring a variable without initializing it
```
let a;
console.log(a); // undefined
console.log(typeof a); // "undefined"
```
- If a variable is declared without an initial value, it contains undefined by default.

#### Accessing a nonexistent property of an object
```
let obj = { x: 10, y: 20 };
console.log(obj.x); // 10 (정상 출력)
console.log(obj.z); // undefined (정의되지 않은 속성)
console.log(typeof obj.z); // "undefined"
```
- Accessing a nonexistent property returns undefined.

### 2. What is null?
null is a value a developer uses to intentionally set a variable to an "empty" state.

#### Assigning null
```
let emptyValue = null;
console.log(emptyValue); // null
console.log(typeof emptyValue); // "object" (자바스크립트의 오래된 버그)
```
- Developers must explicitly assign null to indicate the absence of a value.
- typeof null printing "object" is an early JavaScript design error that is still retained.

### 3. Differences between undefined and null
#### undefined
- Meaning: no value (automatically assigned)
- Value assignment
- Use cases

#### null
- The developer explicitly specifies an "empty value"
- Automatically assigned by the system	Assigned directly by the developer
- A variable is declared but not initialized	Used to empty a particular variable's value

### Examples of the difference
```
let a; // undefined 자동 할당
let b = null; // 개발자가 명시적으로 null 할당
```

```
console.log(a); // undefined
console.log(b); // null
```
- undefined means no value has been assigned,
- While null intentionally expresses "no value."

## Practice code

#### Number - Exercise (1)
> ![](/images/velog/js-챌린지-2일차-til-02.webp)

#### Number - Exercise (2)
> ![](/images/velog/js-챌린지-2일차-til-03.webp)

#### String - Exercise (1)
> ![](/images/velog/js-챌린지-2일차-til-04.webp)

#### String - Exercise (2)
> ![](/images/velog/js-챌린지-2일차-til-05.webp)

#### Object - Exercise (1)
> ![](/images/velog/js-챌린지-2일차-til-06.webp)

#### Object - Exercise (2)
> ![](/images/velog/js-챌린지-2일차-til-07.webp)

#### undefined and null - Exercise
> ![](/images/velog/js-챌린지-2일차-til-08.webp)
