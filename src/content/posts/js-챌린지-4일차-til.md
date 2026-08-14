---
title: "JS 챌린지 4일차 TIL"
description: "배열 만들기 JavaScript에서 배열은 여러 개의 값을 하나의 변수에 저장할 수 있는 자료 구조입니다. 1. 배열이란? 배열은 값이 연속된 저장 공간에 저장되는 데이터 구조입니다. 각 값은 인덱스 Index 라고 하는 숫자를 이용해 접근할 수 있습니다. 배열과 객체 비교 데이터 구조 구성 방식 예제 객체 Obje…"
publishedAt: 2025-03-11
updatedAt: 2026-08-14
category: Development
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: 9c2caaaa-8558-4303-a41a-1ce78ecfd3ca
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-4%EC%9D%BC%EC%B0%A8-TIL
draft: false
---
![](/images/velog/js-챌린지-4일차-til-01.webp)

## 배열 만들기
JavaScript에서 배열은 여러 개의 값을 하나의 변수에 저장할 수 있는 자료 구조입니다.

### 1. 배열이란?
배열은 값이 연속된 저장 공간에 저장되는 데이터 구조입니다.
각 값은 인덱스(Index) 라고 하는 숫자를 이용해 접근할 수 있습니다.

### 배열과 객체 비교
데이터 구조	구성 방식	예제
객체 (Object)	키(key)와 값(value)	
```
{ name: "Alice", age: 25 }
```
배열 (Array)	인덱스(index)와 값(value)	
```
[1, 2, 3, 4, 5]
```
### 2. 배열 생성 방법
배열을 생성하는 방법은 여러 가지가 있습니다.
가장 일반적인 방법은 대괄호([]) 를 사용하는 것입니다.

#### 1) 빈 배열 생성
```
let arr = []; // 배열 생성
console.log(arr.length); // 0
```
배열을 선언할 때, 대괄호 []를 사용하면 빈 배열이 생성됩니다.
#### 2) 값을 포함한 배열 생성
```
let numbers = [1, 2, 3, 4, 5]; // 숫자를 포함한 배열
console.log(numbers.length); // 5
```
배열 내부에 쉼표(,) 를 사용하여 여러 개의 값을 저장할 수 있습니다.

#### 3) 다양한 자료형을 포함하는 배열
배열에는 모든 자료형 을 저장할 수 있으며, 서로 다른 타입을 함께 저장할 수도 있습니다.

```
let mixedArray = [100, "Hello", true, { name: "임현성" }, [1, 2, 3]];
```
숫자(Number), 문자열(String), 불리언(Boolean), 객체(Object), 배열(Array) 등 다양한 자료형을 포함할 수 있습니다.

### 3. 배열의 길이 확인하기
배열의 길이는 .length 속성을 사용하여 확인할 수 있습니다.

```
let arr = [10, 20, 30, 40, 50];
console.log(arr.length); // 5
```
.length 속성은 배열에 포함된 요소의 개수를 반환합니다.

### 4. 배열 요소에 접근하기
배열의 각 요소는 인덱스(Index) 를 사용하여 접근할 수 있습니다.
JavaScript의 배열은 0부터 시작하는 인덱스를 사용합니다.

#### 1) 배열 요소 읽기
```
let arr = [10, 20, 30, 40, 50];

console.log(arr[0]); // 10 (첫 번째 요소)
console.log(arr[2]); // 30 (세 번째 요소)
console.log(arr[4]); // 50 (다섯 번째 요소)
```
arr[0] → 첫 번째 요소에 접근
arr[2] → 세 번째 요소에 접근
arr[4] → 다섯 번째 요소에 접근

#### 2) 존재하지 않는 인덱스 접근
```
let arr = [1, 2, 3];
console.log(arr[4]); // undefined
```
존재하지 않는 인덱스에 접근하면 undefined 가 반환됩니다.

### 5. 배열과 문자열의 관계
배열과 문자열은 유사한 구조 를 가집니다.
문자열(String)도 문자들의 배열처럼 다룰 수 있습니다.

```
let str = "Hello";

console.log(str[0]); // "H"
console.log(str[4]); // "o"
console.log(str.length); // 5
```
문자열도 배열처럼 인덱스를 사용하여 개별 문자에 접근할 수 있습니다.
str[0] → 첫 번째 문자 "H"를 반환
str.length → 문자열의 길이 반환

## 배열 사용하기

### 1. 배열 요소 추가 및 삭제
배열의 앞뒤에서 요소를 추가하거나 제거하는 주요 메서드는 다음과 같습니다.

```
push()	배열 뒤에 요소 추가		arr.push(1);
pop()	배열 뒤에서 요소 제거	arr.pop();
unshift()	배열 앞에 요소 추가	arr.unshift(0);
shift()	배열 앞에서 요소 제거	arr.shift();
```
#### 1) 배열의 뒤에서 요소 추가/삭제
```
let arr = [1, 2, 3, 4, 5];

console.log(arr.pop()); // 5 (제거된 요소)
console.log(arr); // [1, 2, 3, 4] (5가 삭제됨)

arr.push(6);
console.log(arr); // [1, 2, 3, 4, 6] (6이 추가됨)
```
pop() → 배열의 마지막 요소 제거 및 반환
push(value) → 배열의 마지막에 요소 추가

#### 2) 배열의 앞에서 요소 추가/삭제
```
let arr = [1, 2, 3, 4];

console.log(arr.shift()); // 1 (제거된 요소)
console.log(arr); // [2, 3, 4] (1이 삭제됨)

arr.unshift(0);
console.log(arr); // [0, 2, 3, 4] (0이 앞에 추가됨)
```
shift() → 배열의 첫 번째 요소 제거 및 반환
unshift(value) → 배열의 첫 번째에 요소 추가

### 2. 배열 정렬하기

메서드	설명	예제
```
reverse()	배열의 순서를 뒤집음	
arr.reverse();

sort()	배열을 오름차순 정렬 
arr.sort();
```
#### 1) reverse() – 배열 뒤집기
```
let arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
```
배열을 역순으로 뒤집습니다.

#### 2) sort() – 배열 정렬
```
let arr = [5, 3, 1, 4, 2];
arr.sort();
console.log(arr); // [1, 2, 3, 4, 5]
```
sort()는 기본적으로 문자열 정렬 을 수행합니다.
숫자를 올바르게 정렬하려면 비교 함수 를 사용해야 합니다.
```
let numbers = [10, 5, 20, 15];
numbers.sort((a, b) => a - b);
console.log(numbers); // [5, 10, 15, 20]
```
(a, b) => a - b 를 사용하면 숫자 오름차순 정렬 이 됩니다.

### 3. 배열 합치기 (concat)
여러 개의 배열을 하나로 합칠 때 concat() 메서드를 사용합니다.

```
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4, 5, 6]
```
concat() 메서드는 기존 배열을 변경하지 않고 새로운 배열을 반환합니다.

### 4. 배열 요소 찾기
배열에서 특정 요소가 위치한 인덱스를 찾을 때 indexOf()와 lastIndexOf()를 사용합니다.

메서드	설명	예제
```
indexOf(value)	배열에서 첫 번째로 등장하는 위치 반환	
arr.indexOf(2);

lastIndexOf(value)	배열에서 마지막으로 등장하는 위치 반환	
arr.lastIndexOf(2);
```

#### 1) indexOf() – 첫 번째 등장 위치 찾기
```
let arr = [1, 2, 3, 2, 4, 5];

console.log(arr.indexOf(2)); // 1 (첫 번째 2의 위치)
```
배열에서 처음 등장하는 요소의 인덱스 를 반환합니다.

#### 2) lastIndexOf() – 마지막 등장 위치 찾기
```
console.log(arr.lastIndexOf(2)); // 3 (마지막 2의 위치)
```
배열에서 마지막으로 등장하는 요소의 인덱스 를 반환합니다.

### 5. 문자열을 배열로 변환하기 (split)
문자열을 특정 구분자를 기준으로 나누어 배열로 변환할 때 split() 을 사용합니다.

```
let str = "1,2,3,4,5";
let arr = str.split(",");
console.log(arr); // ["1", "2", "3", "4", "5"]
```
split(",") → 쉼표(,)를 기준으로 문자열을 나누어 배열로 변환 합니다.
split()을 활용하면 CSV 데이터를 쉽게 배열로 변환할 수 있습니다.

#### 1) 공백 기준으로 나누기
```
let sentence = "Hello World";
let words = sentence.split(" ");
console.log(words); // ["Hello", "World"]
```
공백 " " 을 기준으로 문자열을 나누어 단어 배열을 생성합니다.

#### 2) 특정 문자 제거 후 나누기
정규 표현식을 사용하여 특정 문자들을 기준으로 나누는 것 도 가능합니다.

```
let text = "hello;world,red blue";
let fruits = text.split(/[;, ]+/);
console.log(fruits); // ["hello", "world", "red", "blue"]
```
/[;, ]+/ → 세미콜론(;), 콤마(,), 공백( )을 기준으로 문자열을 나눔
정규 표현식을 사용하면 여러 개의 구분자를 한 번에 처리할 수 있습니다.

## 주석

### 1. 주석의 중요성
코드의 가독성을 높이고 유지보수를 쉽게 만듭니다.
코드의 목적을 쉽게 이해할 수 있도록 돕습니다.

### 2. 주석의 종류
JavaScript에서는 한 줄 주석 과 여러 줄 주석 두 가지 방식으로 주석을 사용할 수 있습니다.

#### 주석 유형	사용법	설명

```
한 줄 주석	// 주석 내용	한 줄만 주석 처리할 때 사용
여러 줄 주석	/* 주석 내용 */	여러 줄을 주석 처리할 때 사용
```
### 3. 한 줄 주석 (//)
한 줄 주석은 // 이후의 내용을 해당 줄에서만 주석 처리 합니다.

```
// 변수 선언
let name = "임현성"; // 사용자의 이름을 저장

console.log(name); // 콘솔에 이름 출력
```
// 뒤에 작성된 내용은 주석으로 처리 되어 실행되지 않습니다.
주로 코드의 역할을 설명하는 데 사용됩니다.
### 4. 여러 줄 주석 (/* */)
여러 줄 주석은 /* */을 사용하여 여러 줄을 한 번에 주석 처리할 수 있습니다.

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

여러 줄을 한꺼번에 주석 처리할 수 있어 긴 설명 이 필요할 때 유용합니다.

## if문 (조건문)
JavaScript에서 if문 은 특정 조건이 참(true) 일 경우에만 특정 코드를 실행하도록 하는 제어문입니다.

### 1. if문의 기본 개념
if문을 사용하면 조건을 검사하여 해당 조건이 참일 경우에만 특정 코드 블록을 실행 할 수 있습니다.
조건식 은 항상 불리언(Boolean) 값 (true 또는 false)으로 평가됩니다.
조건식이 true면 해당 코드 블록이 실행되고, false이면 실행되지 않습니다.

### 2. if문의 기본 문법

```
if (조건식) {
    // 조건이 true일 때 실행될 코드
}
```

### 3. if-else 문
if문 만 사용하면 조건이 참일 때만 실행되므로, 거짓일 경우 실행할 코드가 필요할 때 else 문 을 사용합니다.
else 는 if 문과 함께 사용되며, if 문의 조건이 false일 때 실행됩니다.
문법
```
if (조건식) {
    // 조건이 true일 때 실행
} else {
    // 조건이 false일 때 실행
}
```

### 4. else if 문 (다중 조건 검사)
여러 개의 조건을 검사할 때는 else if 문 을 사용합니다.
if 문의 조건이 false일 때, 추가적인 조건을 검사할 수 있습니다.
순차적으로 조건을 검사 하며, 첫 번째로 true가 되는 조건만 실행됩니다.
문법

```
if (조건식1) {
    // 조건식1이 true일 때 실행
} else if (조건식2) {
    // 조건식1이 false이고, 조건식2가 true일 때 실행
} else {
    // 모든 조건이 false일 때 실행
}
```

### 5. 중첩 if문 (if문 안에 if문)
if문 안에 또 다른 if문을 넣을 수도 있습니다.
특정 조건이 충족될 때 추가적인 조건을 검사 하고 싶을 때 사용합니다.

### 6. 조건식에서 논리 연산자 사용
if문에서 논리 연산자 (&&, ||, !) 를 사용하여 복합적인 조건을 검사할 수 있습니다.

예제: 논리 연산자 사용

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
JavaScript에서 switch문은 특정 값에 따라 여러 개의 경우(case) 중 하나를 선택하여 실행할 때 사용됩니다.

### 1. switch문의 기본 개념
switch문은 하나의 표현식을 평가한 후, 해당 값과 일치하는 case를 실행 합니다.
여러 개의 if-else if 문을 더 간결하게 표현할 수 있습니다.

### 2. switch문의 기본 문법

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
switch(값) 안의 값을 검사하여 일치하는 case를 실행합니다.
break;를 사용하면 실행 후 switch문을 빠져나옵니다.
default는 모든 case에 해당하지 않을 경우 실행되는 코드 입니다.

### 3. break를 사용하지 않은 경우
break문을 생략하면 다음 case도 연달아 실행 됩니다.

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
출력 결과:

```
카페라떼 - 3500원
카푸치노 - 4000원
잘못된 선택입니다.
```
case 2: 가 실행된 후 break가 없으므로 case 3: 과 default: 까지 모두 실행됩니다.
이를 "fall-through(연쇄 실행)" 이라고 합니다.


### 4. default 문의 역할
default 는 모든 case와 일치하지 않는 경우 실행 됩니다.
if-else 문의 else와 동일한 역할을 합니다.
예제: default 활용

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
출력 결과:

```
올바른 요일을 입력하세요.
```
day = 10 은 어떤 case에도 일치하지 않으므로 default 문이 실행됩니다.

## 실습 코드

#### 배열 만들기 - 실습(1)
> ![](/images/velog/js-챌린지-4일차-til-02.webp)

#### 배열 만들기 - 실습(2)
> ![](/images/velog/js-챌린지-4일차-til-03.webp)

#### 배열 사용하기 - 실습
> ![](/images/velog/js-챌린지-4일차-til-04.webp)

#### 주석 - 실습
> ![](/images/velog/js-챌린지-4일차-til-05.webp)

#### if문 - 실습(1)
> ![](/images/velog/js-챌린지-4일차-til-06.webp)

#### if문 - 실습(2)
> ![](/images/velog/js-챌린지-4일차-til-07.webp)

#### if문 - 실습(3)
> ![](/images/velog/js-챌린지-4일차-til-08.webp)

#### switch문 - 실습
> ![](/images/velog/js-챌린지-4일차-til-09.webp)
