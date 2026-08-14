---
title: "JS 챌린지 5일차 TIL"
description: "while문 JavaScript에서 while문은 특정 조건이 만족되는 동안 코드를 반복적으로 실행하는 반복문입니다. 1. while문의 기본 개념 조건이 참 true 이면 코드 블록을 계속 실행합니다. 조건이 거짓 false 이 되면 반복을 중단하고 다음 코드로 이동합니다. 2. while문의 기본 문법 while…"
publishedAt: 2025-03-12
updatedAt: 2026-08-14
category: Development
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: 01e781da-6b2e-40b0-8775-8cfeec11a528
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-5%EC%9D%BC%EC%B0%A8-TIL
draft: false
---
![](/images/velog/js-챌린지-5일차-til-01.webp)

## while문
JavaScript에서 while문은 특정 조건이 만족되는 동안 코드를 반복적으로 실행하는 반복문입니다.


### 1. while문의 기본 개념
조건이 참(true)이면 코드 블록을 계속 실행합니다.
조건이 거짓(false)이 되면 반복을 중단하고 다음 코드로 이동합니다.
### 2. while문의 기본 문법
```
while (조건식) {
    // 조건이 true일 때 실행되는 코드
}
```
while(조건식)이 참이면 { } 안의 코드가 실행됩니다.


### 3. while문 활용
예제 1: 사용자 입력을 세 번 받을 때까지 반복
```
let count = 0;

while (count < 3) {
    let choice = prompt("입력 :");
    console.log(`입력값 : ${choice}`);
    count++; // 입력받을 때마다 count 증가
}
```
사용자가 3번 입력할 때까지 반복됩니다.
3번 입력을 받으면 count < 3이 거짓이 되어 반복문이 종료됩니다.

### 4. while문의 무한 루프와 종료
#### 1) 무한 루프 (Infinite Loop)
조건이 항상 참(true)이면 반복문이 영원히 실행됩니다.
이는 브라우저가 멈추거나 프로그램이 중단되는 원인이 될 수 있습니다.
```
while (true) {
    console.log("이 코드는 무한 반복됩니다.");
}
```
반드시 탈출 조건 (break)을 추가해야 함

#### 2) 반복문 종료 - break문 사용
break문을 만나면 즉시 반복문을 종료합니다.
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
#### 출력 결과:

```
1
2
3
4
5
```
#### 반복문 종료
count === 5일 때 break가 실행되어 반복문이 종료됩니다.
### 5. continue문
continue문을 사용하면 현재 반복을 건너뛰고 다음 반복을 실행합니다.

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
#### 출력 결과:

```
2
4
6
8
10
```
continue를 만나면 이후 코드를 실행하지 않고 다음 반복으로 넘어갑니다.
num % 2 !== 0 (홀수일 때) continue가 실행되므로 홀수는 출력되지 않습니다.


## do while문 (반복문)
do while문은 while문의 변형으로, 코드 블록을 최소 한 번 실행한 후 조건을 검사하는 반복문입니다.

### 1. do while문의 기본 개념
while문은 반복을 시작하기 전에 조건을 검사하여 참(true)인 경우에만 실행됩니다.
do while문은 반복을 시작하기 전에 조건을 검사하지 않고 일단 실행한 후 조건을 검사합니다.
### 2. do while문의 기본 문법
```
do {
    // 최소 한 번 실행되는 코드
} while (조건식);
```
do 블록 내부의 코드가 먼저 실행됩니다.
실행이 끝나면 while (조건식)을 검사하고, 조건이 참(true)이면 다시 실행됩니다.

### 3. do while문의 무한 루프와 종료
#### 1) 무한 루프 (Infinite Loop)
조건을 true로 설정하면 반복문이 영원히 실행됩니다.
반드시 탈출 조건(break)을 추가해야 합니다.
```
do {
    console.log("무한 루프 실행 중...");
} while (true); // 항상 true → 무한 루프 발생
```


## for in 문 
JavaScript에서 for in 문은 객체나 배열의 속성을 순회할 때 사용됩니다.


### 1. for in 문 기본 문법
```
for (변수 in 객체) {
    // 각 속성(키)에 대해 실행할 코드
}
```

### 2. 배열에서의 for in 사용
배열에서 사용하면?
```
let fruits = ["abc", "def", "ghi"];

for (let index in fruits) {
    console.log(index + ": " + fruits[index]);
}
```
#### 출력 결과:

0: abc
1: def
2: ghi
index에는 배열의 인덱스(0, 1, 2, ...)가 들어갑니다.

### 3. 객체에서 for in 사용
객체의 모든 속성(키)을 출력하는 예제입니다.

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
#### 출력 결과:

name: 임현성
age: 25
job: 개발자

4. 언제 for in을 사용할까?
- 객체의 속성을 순회할 때 사용
- 배열보다는 객체에 적합 (for...of가 배열에 더 적절)
- 속성 존재 여부 확인할 때 in 연산자 활용 가능


## 변수의 Scope (스코프)
JavaScript에서 스코프(Scope)란 변수가 어디까지 유효한지를 결정하는 범위를 의미합니다.

### 1. JavaScript의 스코프 개념
JavaScript에서는 함수 단위의 스코프를 따릅니다. 이를 함수 스코프라고 합니다.

변수가 선언된 함수 내부에서만 접근 가능
함수 외부에서는 내부 변수에 접근 불가능
```
function example() {
    let localVar = "나는 함수 안에서만 유효해!";
    console.log(localVar); // 정상 출력
}

console.log(localVar); // 오류! 함수 밖에서 접근 불가능
```
### 2. 함수 스코프(Function Scope)
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

### 3. 전역 스코프(Global Scope)
전역 변수는 코드 어디서든 접근 가능합니다.

```
let globalVar = "나는 어디서든 접근 가능!";

function myFunction() {
    console.log(globalVar); // 함수 내부에서도 접근 가능
}

myFunction();
console.log(globalVar); // 함수 외부에서도 접근 가능
```
메모리 낭비 발생 가능
전역 변수 사용을 최소화하고, 가능하면 const나 let을 함수 내부에서 사용을 권장합니다.

### 4. 스코프 체인
변수를 찾을 때 안에서 바깥쪽으로 검색하는 스코프 체인이 적용됩니다.

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
#### 현재 함수에서 변수를 찾는다.
#### 없으면 부모 함수에서 찾는다.
#### 부모에도 없으면 전역에서 찾는다.
#### 전역에서도 없으면 오류 발생

## 변수의 Shadowing
JavaScript에서 변수 섀도잉(Shadowing)은 같은 이름의 변수가 서로 다른 스코프에서 선언될 때 발생하는 현상을 의미합니다.

### 1. 변수 Shadowing이란?
Shadowing이란?

함수 내부에서 같은 이름의 변수를 다시 선언하면, 외부 변수는 가려지고 내부 변수만 사용됩니다.
```
let value = 10; // 전역 변수

function shadowExample() {
    let value = 5; // 같은 이름의 지역 변수 선언 (전역 변수 가려짐)
    console.log("함수 내부:", value);
}

shadowExample();
console.log("함수 외부:", value);
```
#### 출력 결과:

```
함수 내부: 5
함수 외부: 10
```

### 2. Shadowing이 발생하는 이유
#### 1) 같은 이름의 변수가 다른 스코프에서 선언됨
```
let value = 10; // 전역 변수

function example() {
    let value = 20; // 지역 변수 (전역 변수 가림)
    console.log(value); // 20 (지역 변수 사용)
}

example();
console.log(value); // 10 (전역 변수 그대로 유지)
```
#### 2) 내부에서 let, const로 변수를 재선언하는 경우
```
let value = "전역 변수";

function example() {
    console.log(value); // ❌ 오류 발생! (TDZ)
    let value = "지역 변수"; // 같은 이름의 지역 변수 선언 (전역 변수 가림)
}
example();
```

### 3. Shadowing을 피하는 방법
#### 1) 변수 이름을 다르게 설정하기
전역 변수와 지역 변수를 다르게 설정하여 혼동을 방지


#### 2) 변수를 재선언하지 않고 직접 변경하기
새로운 변수를 선언하는 대신 기존 변수를 직접 변경하면 Shadowing을 피할 수 있음

#### 3) 블록 스코프 활용 (let, const)
var를 사용하면 블록 스코프를 따르지 않아 Shadowing이 발생할 가능성이 높습니다.
let과 const를 사용하면 블록({}) 내부에서만 유효하게 유지할 수 있습니다.


## Method와 this
JavaScript에서는 객체(Object) 내에 함수를 메서드(Method)라고 합니다.

```
1. 메서드(Method)란?
```
객체의 속성 값으로 함수를 저장하면 메서드(Method)라고 부릅니다.
```
let obj = {
    name: "Object1",
    sayHello: function () {
        console.log("Hello");
    }
};
```
#### 2. this 키워드란?
this는 현재 실행 중인 함수가 속한 객체를 가리키는 키워드입니다.
메서드를 호출하는 객체에 따라 this의 값이 달라집니다.

```
let obj = {
    name: "Object1",
    sayName: function () {
        console.log(this.name);
    }
};
```

### 4. this 사용 시 주의할 점
#### 1) 단독 함수 호출 시 this가 window를 가리킴

```
function showThis() {
    console.log(this);
}

showThis(); // window (전역 객체)
```

#### 2) 중첩 함수에서 this 문제
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
내부 함수에서는 this가 전역 객체를 참조하므로 name이 undefined가 됩니다.

#### 해결 방법: self 또는 arrow function 사용


## 클로저(Closure)
### 1. 클로저란?
클로저(Closure)는 함수가 선언될 때의 변수 환경(스코프)을 기억하고, 함수가 실행된 이후에도 해당 환경에 접근할 수 있는 개념입니다.

### 2. 클로저의 기본 개념
JavaScript에서는 함수가 실행될 때마다 새로운 실행 컨텍스트가 생성됩니다.
일반적으로 함수 내부에서 선언된 변수는 함수 실행이 끝나면 소멸(garbage collection)되지만,
클로저를 사용하면 함수 실행이 끝난 이후에도 변수 값을 유지할 수 있습니다.

### 3. 클로저의 예제
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
### 4. 클로저의 동작 원리
#### 1) 클로저가 없을 때
일반적으로 함수 내부에서 선언된 변수는 함수가 실행된 후 소멸됩니다.

```
function normalFunction() {
    let num = 0;
    num++;
    console.log(num);
}

normalFunction(); // 1
normalFunction(); // 1 (num이 매번 초기화됨)
```
num 변수는 함수 실행이 끝나면 사라지므로, 매번 1로 초기화됩니다.

#### 2) 클로저가 있을 때
내부 함수가 반환되면서, 함수 실행 이후에도 count 변수가 유지됩니다.

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
count 변수가 함수 실행 이후에도 유지됩니다.

### 5. 클로저를 사용하는 이유
#### 데이터 보호
클로저를 이용하면 외부에서 직접 변수에 접근할 수 없고, 오직 메서드를 통해서만 조작 가능
변수 은닉(Private Variable) 기능을 구현할 수 있음

#### 이벤트 핸들러에서 활용
클로저를 사용하면 이벤트 핸들러에서 특정 값(상태)을 유지할 수 있음
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

## 실습 코드

#### while문 - 실습(1)
> ![](/images/velog/js-챌린지-5일차-til-02.webp)

#### while문 - 실습(2)
> ![](/images/velog/js-챌린지-5일차-til-03.webp)

#### for문 - 실습
> ![](/images/velog/js-챌린지-5일차-til-04.webp)

#### for in문 - 실습(1)
> ![](/images/velog/js-챌린지-5일차-til-05.webp)

#### for in문 - 실습(2)
> ![](/images/velog/js-챌린지-5일차-til-06.webp)

#### 변수의 shadowing - 실습
> ![](/images/velog/js-챌린지-5일차-til-07.webp)

#### 평균 구하기
> ![](/images/velog/js-챌린지-5일차-til-08.webp)
