---
title: "JS Challenge Day 5 TIL"
description: "while loops. In JavaScript, a while loop repeatedly executes code while a particular condition is satisfied. 1. Basic concept: keep executing the code block while the condition is true. When it becomes false, stop looping and move to the next code. 2. Basic syntax…"
publishedAt: 2025-03-12
updatedAt: 2026-08-14
category: Development
cover: /covers/javascript-thumbnail.png
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: 01e781da-6b2e-40b0-8775-8cfeec11a528
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-5%EC%9D%BC%EC%B0%A8-TIL
draft: false
---
![](/images/velog/js-챌린지-5일차-til-01.webp)

## while loops
In JavaScript, a while loop repeatedly executes code while a particular condition is satisfied.

### 1. Basic concept of a while loop
Keep executing the code block while the condition is true.
When the condition becomes false, stop looping and move to the next code.
### 2. Basic syntax of a while loop
```
while (조건식) {
    // 조건이 true일 때 실행되는 코드
}
```
If the condition in while(condition) is true, the code inside { } runs.

### 3. Using while loops
Example 1: repeat until receiving user input three times.
```
let count = 0;

while (count < 3) {
    let choice = prompt("입력 :");
    console.log(`입력값 : ${choice}`);
    count++; // 입력받을 때마다 count 증가
}
```
The loop repeats until the user has entered input three times.
After three inputs, count < 3 becomes false and the loop ends.

### 4. Infinite while loops and termination
#### 1) Infinite loop
If the condition is always true, the loop runs forever.
This can freeze the browser or stop the program.
```
while (true) {
    console.log("이 코드는 무한 반복됩니다.");
}
```
An exit condition (break) must be added.

#### 2) Ending a loop with break
Encountering break immediately terminates the loop.
```
let count = 1;

while (true) {
    console.log(count);
    if (count === 5) {
        break;
    }
    count++;
}
console.log("반복문 종료");
```
#### Output:

```
1
2
3
4
5
```
#### Loop termination
When count === 5, break executes and the loop ends.
### 5. continue statements
A continue statement skips the current iteration and runs the next one.

```
let num = 0;

while (num < 10) {
    num++;

    if (num % 2 !== 0) {
        continue; // 홀수는 건너뛰고 다음 반복으로 넘어감
    }

    console.log(num); // 짝수만 출력
}
```
#### Output:

```
2
4
6
8
10
```
Upon encountering continue, execution skips the remaining code and moves to the next iteration.
Because continue executes when num % 2 !== 0 (an odd number), odd numbers are not printed.

## do while loops
A do while loop is a variation of while that executes the code block at least once before checking the condition.

### 1. Basic concept of a do while loop
A while loop checks the condition before starting and only runs if it is true.
A do while loop runs first without checking the condition, then checks it afterward.
### 2. Basic syntax of a do while loop
```
do {
    // 최소 한 번 실행되는 코드
} while (조건식);
```
The code inside the do block runs first.
After it finishes, while (condition) is checked, and the code runs again if the condition is true.

### 3. Infinite do while loops and termination
#### 1) Infinite loop
Setting the condition to true makes the loop run forever.
An exit condition (break) must be added.
```
do {
    console.log("무한 루프 실행 중...");
} while (true); // 항상 true → 무한 루프 발생
```

## for in loops
In JavaScript, a for in loop is used to iterate over the properties of an object or array.

### 1. Basic syntax of a for in loop
```
for (변수 in 객체) {
    // 각 속성(키)에 대해 실행할 코드
}
```

### 2. Using for in with arrays
What happens with an array?
```
let fruits = ["abc", "def", "ghi"];

for (let index in fruits) {
    console.log(index + ": " + fruits[index]);
}
```
#### Output:

0: abc
1: def
2: ghi
index receives the array's indices (0, 1, 2, …).

### 3. Using for in with objects
An example printing all properties (keys) of an object.

```
let person = {
    name: "임현성",
    age: 25,
    job: "개발자"
};

for (let key in person) {
    console.log(key + ": " + person[key]);
}
```
#### Output:

name: Lim Hyeon-seong
age: 25
job: developer

4. When should we use for in?
- Use it to iterate over object properties.
- Better suited to objects than arrays (for...of is more appropriate for arrays).
- The in operator can check whether a property exists.

## Variable scope
In JavaScript, scope is the range within which a variable is valid.

### 1. The concept of scope in JavaScript
JavaScript follows function-level scope. This is called function scope.

A variable can only be accessed inside the function where it is declared.
Internal variables cannot be accessed from outside the function.
```
function example() {
    let localVar = "나는 함수 안에서만 유효해!";
    console.log(localVar); // 정상 출력
}

console.log(localVar); // 오류! 함수 밖에서 접근 불가능
```
### 2. Function scope
```
function outer() {
    let a = "A"; // 함수 outer 내부에서만 접근 가능
    
    function inner() {
        let b = "B"; // 함수 inner 내부에서만 접근 가능
        console.log(a); // outer의 변수는 inner에서 접근 가능
    }

    inner();
    console.log(b); // inner의 변수는 outer에서 접근 불가능
}
```

### 3. Global scope
Global variables can be accessed anywhere in the code.

```
let globalVar = "나는 어디서든 접근 가능!";

function myFunction() {
    console.log(globalVar); // 함수 내부에서도 접근 가능
}

myFunction();
console.log(globalVar); // 함수 외부에서도 접근 가능
```
Possible memory waste.
Minimize global variables and, where possible, use const or let inside functions.

### 4. Scope chain
When looking up a variable, the scope chain searches from inside to outside.

```
let globalVar = "전역 변수";

function outer() {
    let outerVar = "외부 함수 변수";

    function inner() {
        let innerVar = "내부 함수 변수";
        console.log(innerVar); // 내부에서 선언된 변수 접근
        console.log(outerVar); // 부모 함수 변수 접근
        console.log(globalVar); // 전역 변수 접근
    }

    inner();
}

outer();
```
#### Look for the variable in the current function.
#### If absent, look in the parent function.
#### If absent there, look in the global scope.
#### If absent globally, raise an error.

## Variable shadowing
In JavaScript, variable shadowing occurs when variables with the same name are declared in different scopes.

### 1. What is variable shadowing?
What is shadowing?

When a variable of the same name is redeclared inside a function, the outer variable is hidden and only the inner one is used.
```
let value = 10; // 전역 변수

function shadowExample() {
    let value = 5; // 같은 이름의 지역 변수 선언 (전역 변수 가려짐)
    console.log("함수 내부:", value);
}

shadowExample();
console.log("함수 외부:", value);
```
#### Output:

```
함수 내부: 5
함수 외부: 10
```

### 2. Why shadowing occurs
#### 1) Variables of the same name declared in different scopes
```
let value = 10; // 전역 변수

function example() {
    let value = 20; // 지역 변수 (전역 변수 가림)
    console.log(value); // 20 (지역 변수 사용)
}

example();
console.log(value); // 10 (전역 변수 그대로 유지)
```
#### 2) Redeclaring a variable inside with let or const
```
let value = "전역 변수";

function example() {
    console.log(value); // ❌ 오류 발생! (TDZ)
    let value = "지역 변수"; // 같은 이름의 지역 변수 선언 (전역 변수 가림)
}
example();
```

### 3. Avoiding shadowing
#### 1) Use different variable names
Give global and local variables different names to prevent confusion.

#### 2) Modify a variable directly without redeclaring it
Modifying an existing variable directly instead of declaring a new one avoids shadowing.

#### 3) Use block scope (let, const)
Using var increases the possibility of shadowing because it does not follow block scope.
With let and const, variables can remain valid only inside the block ({}).

## Methods and this
In JavaScript, a function within an object is called a method.

```
1. 메서드(Method)란?
```
A function stored as an object's property value is called a method.
```
let obj = {
    name: "Object1",
    sayHello: function () {
        console.log("Hello");
    }
};
```
#### 2. What is the this keyword?
this is a keyword referring to the object to which the currently executing function belongs.
The value of this changes depending on the object calling the method.

```
let obj = {
    name: "Object1",
    sayName: function () {
        console.log(this.name);
    }
};
```

### 4. Things to watch out for with this
#### 1) this points to window in a standalone function call

```
function showThis() {
    console.log(this);
}

showThis(); // window (전역 객체)
```

#### 2) The this problem in nested functions
```
let obj = {
    name: "Object1",
    outerFunc: function () {
        function innerFunc() {
            console.log(this.name); // undefined
        }
        innerFunc();
    }
};

obj.outerFunc();
```
Inside the inner function, this refers to the global object, so name becomes undefined.

#### Solution: use self or an arrow function

## Closures
### 1. What is a closure?
A closure is the concept of a function remembering its variable environment (scope) at the time it was declared and retaining access to that environment even after the function has executed.

### 2. Basic concept of closures
In JavaScript, a new execution context is created each time a function runs.
Normally, variables declared inside a function disappear (garbage collection) when execution ends,
but closures let us retain variable values afterward.

### 3. Closure example
```
function makeCounter(initValue) {
    let count = initValue; // count 변수는 함수 내부에 선언됨

    function increase() {
        count++; // count 값을 증가
        console.log(count);
    }

    return increase; // 내부 함수 반환 (클로저 생성)
}
```

```
// 클로저 생성
let counter1 = makeCounter(0);
let counter2 = makeCounter(10);

counter1(); // 1
counter1(); // 2

counter2(); // 11
counter2(); // 12
```
### 4. How closures work
#### 1) Without a closure
Normally, variables declared inside a function disappear after the function runs.

```
function normalFunction() {
    let num = 0;
    num++;
    console.log(num);
}

normalFunction(); // 1
normalFunction(); // 1 (num이 매번 초기화됨)
```
Because num disappears when the function finishes, it is initialized to 1 each time.

#### 2) With a closure
Returning the inner function preserves count even after the function finishes.

```
function makeCounter() {
    let count = 0; // 클로저 내부에서 유지되는 변수

    return function () {
        count++;
        console.log(count);
    };
}

let counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```
The count variable remains after the function finishes.

### 5. Why use closures?
#### Data protection
Closures prevent direct external access to variables, allowing manipulation only through methods.
They can implement private variables.

#### Use in event handlers
Closures let event handlers retain a particular value (state).
```
function createButton(label) {
    let count = 0;
    let button = document.createElement("button");
    button.innerText = label;
    
    button.addEventListener("click", function () {
        count++;
        console.log(label + " 버튼 클릭 수: " + count);
    });

    document.body.appendChild(button);
}

createButton("버튼 A");
createButton("버튼 B");
```

## Practice code

#### while loop — exercise (1)
> ![](/images/velog/js-챌린지-5일차-til-02.webp)

#### while loop — exercise (2)
> ![](/images/velog/js-챌린지-5일차-til-03.webp)

#### for loop — exercise
> ![](/images/velog/js-챌린지-5일차-til-04.webp)

#### for in loop — exercise (1)
> ![](/images/velog/js-챌린지-5일차-til-05.webp)

#### for in loop — exercise (2)
> ![](/images/velog/js-챌린지-5일차-til-06.webp)

#### Variable shadowing — exercise
> ![](/images/velog/js-챌린지-5일차-til-07.webp)

#### Calculating an average
> ![](/images/velog/js-챌린지-5일차-til-08.webp)
