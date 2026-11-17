---
title: "JS Challenge Day 3 TIL"
description: "Arithmetic Operators. In JavaScript, arithmetic operators perform mathematical calculations. 1. Basic arithmetic operators. Arithmetic operators are used to operate on numeric values. Operator / Description / Example: Addition 5 + 3 // 8; Subtraction"
publishedAt: 2025-03-10
updatedAt: 2026-08-14
category: Development
cover: /covers/javascript-thumbnail.png
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: 8ee7f445-5dba-4570-8d5c-da0771f09f4c
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-3%EC%9D%BC%EC%B0%A8-TIL
draft: false
---

![](/images/velog/js-챌린지-3일차-til-01.webp)

## Arithmetic operators
In JavaScript, arithmetic operators perform mathematical calculations.

### 1. Basic arithmetic operators
Arithmetic operators are used to operate on numeric values.

#### Operator / Description / Example
- \+ Addition 5 + 3 // 8
- \- Subtraction 5 - 3 // 2
- \* Multiplication 5 * 3 // 15
- / Division 5 / 2 // 2.5
- % Remainder 5 % 2 // 1

```
let a = 5, b = 3;

console.log(a + b); // 8
console.log(a - b); // 2
console.log(a * b); // 15
console.log(a / b); // 1.666...
console.log(a % b); // 2 (5를 3으로 나눈 나머지)
```
- The +, -, *, / operators work like the usual four arithmetic operations.
- % (the remainder operator) returns the value left over after division.

### 2. Unary operators
Unary operators have just one operand.

```
let x = 5;

console.log(-x); // -5 (부호 변경)
console.log(+x); // 5 (변화 없음)
```
- The - operator changes a number's sign.
- The + operator leaves a number unchanged.

### 3. Increment and decrement operators
Increment and decrement operators increase or decrease a variable's value.

Prefix (++a, --a) vs postfix (a++, a--) operators
```
let a = 1;

console.log(++a); // 2 (먼저 증가 후 출력)
console.log(a);   // 2
```

```
let b = 1;
console.log(b++); // 1 (출력 후 증가)
console.log(b);   // 2
```
- ++a → increment by 1 first, then return that value
- a++ → return the current value first, then increment by 1

### 4. Using the Math object

#### 1) Powers and square roots
```
console.log(Math.pow(2, 3)); // 8 (2^3)
console.log(Math.sqrt(16));  // 4 (√16)
```
- Math.pow(a, b) → returns a to the power of b
- Math.sqrt(x) → returns the square root of x

#### 2) Generating random numbers
```
console.log(Math.random()); // 0과 1 사이의 랜덤한 숫자
```
- Math.random() generates a random number greater than or equal to 0 and less than 1.

## Using functions
In JavaScript, a function is a block of code that performs a particular task.

### 1. What is a function?
- A function is a block of code that accepts input (arguments), performs a task, and may return a result.
- Once defined, it can be called repeatedly as needed.
- Functions improve code reuse and make maintenance easier.

### 2. Defining functions
The basic way to define a function in JavaScript is to use the function keyword.

#### Basic function definition
```
function sayHello() {
    console.log("안녕하세요!");
}
```
- Write the function name after the function keyword, then parentheses () and a code block inside braces {}.
- When console.log() inside the function runs, it prints "안녕하세요!" (Hello!).

### 3. Calling functions
To execute a defined function, call it by adding parentheses () after its name.

```
sayHello(); // "안녕하세요!" 출력
```
- Calling a function executes the code inside it.

### 4. Passing arguments to functions
Functions can receive input values (arguments, parameters).

#### A function that receives an argument
```
function greet(name) {
    console.log("안녕하세요, " + name + "님!");
}

greet("홍길동"); // "안녕하세요, 홍길동님!" 출력
greet("철수");   // "안녕하세요, 철수님!" 출력
```
- The function is defined to receive an argument called name.
- Passing "홍길동" (Hong Gil-dong) and "철수" (Cheol-su) as inputs when calling the function produces different results.

### 5. Function return values
Functions can return a result using the return keyword.

#### A function with a return value
```
function add(a, b) {
    return a + b; // 두 수의 합을 반환
}

let result = add(3, 5);
console.log(result); // 8 출력
```
- The return keyword lets a function return a particular value after execution.
- The returned value is stored in the result variable and can be used later.

### 6. Other uses of functions
#### A function with multiple arguments
```
function multiply(x, y) {
    return x * y;
}

console.log(multiply(4, 5)); // 20 출력
```
- Functions can receive multiple arguments, separated by commas (,).

### 7. Benefits of functions
- Greater code reuse – define once and use repeatedly.
- Better code readability – a function with a clear role makes code easier to understand.
- Easier maintenance – changing a particular feature only requires changing the function's internals.

## Relational and logical operators
In JavaScript, relational operators compare two values and return true or false.

### 1. Relational operators
Relational operators compare two values, and always return a Boolean value (true or false).

#### Types of relational operators
Operator / Description / Example / Result
```
>	크다	5 > 3	true
<	작다	5 < 3	false
>=	크거나 같다	5 >= 5	true
<=	작거나 같다	3 <= 2	false
==	값이 같다	"5" == 5	true (타입 변환됨)
!=	값이 다르다	"5" != 5	false (타입 변환됨)
===	값과 타입이 같다	"5" === 5	false
!==	값과 타입이 다르다	"5" !== 5	true
```

```
let a = 5, b = "5";

console.log(a == b);  // true (자동 형 변환)
console.log(a === b); // false (타입까지 비교)

console.log(a != b);  // false (자동 형 변환)
console.log(a !== b); // true (타입까지 비교)
```
- Using === prevents unexpected type conversions, allowing safer comparisons.

### 2. Logical operators
Logical operators combine multiple conditions to implement more complex logic.

#### Types of logical operators
```
&& (AND) 두 조건이 모두 참이면 true	
(5 > 3) && (3 > 1)	true
|| (OR)	하나라도 참이면 true
! (NOT)	논리값을 반대로 변경	!(5 > 3) false
```
- The && operator returns true only when all conditions are true.
- The || operator returns true if at least one condition is true.
- The ! operator reverses a Boolean value.

```
let age = 25;
let height = 180;
```

## Operator precedence and parentheses
JavaScript operators have a particular precedence, and the operator type determines the order of evaluation.

### 1. What is operator precedence?
- By default, operators with higher precedence are evaluated first.
- Multiplication (*), division (/), and remainder (%) are calculated before addition (+) and subtraction (-).
- Relational operators (comparison operators) are evaluated after arithmetic operations.
- Among logical operators, && (AND) is evaluated before || (OR).

### 2. Basic operator precedence
```
1	()	괄호 (가장 우선)	(3 + 5) * 2 // 16
2	!	논리 NOT	!true // false
3	*, /, %	곱셈, 나눗셈, 나머지	10 / 2 * 3 // 15
4	+, -	덧셈, 뺄셈	5 + 3 - 2 // 6
5	<, <=, >, >=	관계(비교) 연산	5 > 3 // true
6	==, !=, ===, !==	동등 비교 연산	"5" == 5 // true
7	&&	논리 AND	true && false // false
```
- Parentheses () always cause an operation to be evaluated first.
- Arithmetic operations (multiplication, division, remainder) are evaluated before addition and subtraction.
- Comparisons are evaluated after arithmetic, and logical operations (&&, ||) after comparisons.

### 3. Operator precedence examples
#### Basic operator precedence
```
let result = 10 + 2 * 3;
console.log(result); // 16 (곱셈이 먼저 수행됨)
```
- 2 * 3 is evaluated first, then 10 + 6.

#### Changing evaluation order with parentheses
```
let result = (10 + 2) * 3;
console.log(result); // 36
```
- Parentheses cause 10 + 2 to be evaluated first, followed by * 3.

### 4. Logical operator precedence
Logical operators are evaluated after relational operators.
In particular, && (AND) is evaluated before || (OR).

#### && is evaluated before ||
```
let result = true || false && false;
console.log(result); // true
```
- false && false → false
- true || false → true

### 5. Using parentheses in complex conditions

#### Logical operations with parentheses
```
let height = 180;
let age = 25;
```

### 6. Parentheses for readability
Even when you know operator precedence, using explicit parentheses is good for readability.

#### Comparing two expressions
First version (without parentheses)
```
let result1 = age >= 20 && age < 30 || height >= 180;
```

Second version (with parentheses)
```
let result2 = (age >= 20 && age < 30) || (height >= 180);
```
- The two expressions produce the same result, but the second is more intuitive.
- More than relying on operator precedence, it is important to express logic clearly with appropriate parentheses.

## Concatenating strings
When handling strings in JavaScript, we often combine multiple strings into one (string concatenation).

### 1. Checking a string's length
In JavaScript, a string's .length property gives its length (number of characters).

#### Checking string length
```
let str = "Hello";
console.log(str.length); // 5
```
- "Hello" consists of five characters, so its length property returns 5.

### 2. Ways to concatenate strings
#### Using concat()
The most basic way to concatenate strings is with the .concat() method.

```
let str1 = "Hello";
let str2 = " World";

let result = str1.concat(str2);
console.log(result); // "Hello World"
```
-The .concat() method can join two strings into one.

- It can also join multiple strings at once.

```
let result2 = str1.concat(str2, "!");
console.log(result2); // "Hello World!"
```
- .concat() returns a new string without changing the original.

#### Concatenating with the + operator
JavaScript also allows string concatenation with the + operator.

```
let str1 = "Hello";
let str2 = " World";

let result = str1 + str2;
console.log(result); // "Hello World"
```
- The + operator is the most commonly used approach because it is more concise than concat().

- Strings and numbers can also be joined with +.

```
let num = 3.14;
console.log("파이는 " + num + " 입니다."); // "파이는 3.14 입니다."
```
- Adding a number to a string with + automatically converts the number to a string and joins them.

### 3. Concatenating multiple strings
#### Joining multiple strings at once
The + operator can also join multiple strings.

```
let str1 = "Hello";
let str2 = " World";
let str3 = "!";

let result = str1 + str2 + str3;
console.log(result); // "Hello World!"
```
- Repeated use of + can join multiple strings into one.

## Working with strings
Let us look at how to extract particular characters and substrings from a string.

### 1. Getting a particular character
JavaScript provides ways to get the character at a particular position in a string.

#### Using charAt()
This retrieves the character at a particular position (index) in a string.

```
let str = "JavaScript";
console.log(str.charAt(0)); // "J"
console.log(str.charAt(4)); // "S"
```
- .charAt(index) returns the character at index.
- An index outside the string's length returns an empty string ("").

#### Using bracket ([]) notation
JavaScript also lets you retrieve a particular character using brackets ([]), as with arrays.

```
let str = "JavaScript";
console.log(str[0]); // "J"
console.log(str[4]); // "S"
```
- Similar to .charAt(), but a nonexistent index returns undefined.

```
console.log(str[100]); // undefined
```
- Bracket notation ([]) is generally more intuitive and more widely used.

### 2. Extracting substrings
You can also take and use just part of a string.

#### substring(start, end)
A way to extract a particular range from a string.

```
let str = "JavaScript";
console.log(str.substring(0, 4)); // "Java"
console.log(str.substring(4, 10)); // "Script"
```
- Extracts from the first index up to, but not including, the second.
- str.substring(2, 5) → returns the string from indices 2 through 4
- Omitting the second argument extracts from that position to the end.

```
console.log(str.substring(5)); // "cript"
```
#### slice(start, end)
slice() resembles substring(), but allows negative indices.

```
let str = "JavaScript";
console.log(str.slice(0, 4)); // "Java"
console.log(str.slice(-6)); // "Script"
```
- Negative values let you extract from the end of the string.
- slice(-6) extracts from the sixth character from the end through the end.

#### substr(start, length)
substr() extracts a specified number of characters from a particular position.

```
let str = "JavaScript";
console.log(str.substr(0, 4)); // "Java"
console.log(str.substr(4, 6)); // "Script"
```
- The first argument is the starting position, and the second is the number of characters to take.
- substr() is not recommended in modern JavaScript.
- Use slice() or substring() instead.

### 3. Finding a particular word
A way to check where a particular word occurs in a string.

#### The indexOf() method
```
let str = "Hello, JavaScript!";
console.log(str.indexOf("JavaScript")); // 7
console.log(str.indexOf("Python")); // -1 (존재하지 않음)
```
- If the string exists, returns the index of its first occurrence.
- Returns -1 if it does not exist.

#### The lastIndexOf() method
lastIndexOf() searches backward and returns the first position found.

```
let str = "Hello, JavaScript, JavaScript!";
console.log(str.lastIndexOf("JavaScript")); // 19
```
- indexOf() searches from the front; lastIndexOf() searches from the back.

### 4. Checking whether a string contains something
#### The includes() method
Checks whether a string contains a particular word.

```
let str = "Hello, JavaScript!";
console.log(str.includes("JavaScript")); // true
console.log(str.includes("Python")); // false
```
- Returns true or false to indicate only whether it exists.

#### startsWith() & endsWith()

```
let str = "JavaScript is fun";
console.log(str.startsWith("Java")); // true
console.log(str.endsWith("fun")); // true
console.log(str.endsWith("is")); // false
```
- startsWith() → checks whether it starts with a particular string
- endsWith() → checks whether it ends with a particular string

## Practice code

#### Arithmetic operators - Practice
> ![](/images/velog/js-챌린지-3일차-til-02.webp)

#### Using functions - Practice
> ![](/images/velog/js-챌린지-3일차-til-03.webp)

#### Relational operators - Practice (1)
> ![](/images/velog/js-챌린지-3일차-til-04.webp)

#### Relational operators - Practice (2)
> ![](/images/velog/js-챌린지-3일차-til-05.webp)

#### Concatenating strings - Practice
> ![](/images/velog/js-챌린지-3일차-til-06.webp)

#### Working with strings - Practice (1)
> ![](/images/velog/js-챌린지-3일차-til-07.webp)

#### Working with strings - Practice (2)
> ![](/images/velog/js-챌린지-3일차-til-08.webp)
