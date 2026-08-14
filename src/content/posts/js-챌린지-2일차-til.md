---
title: "JS 챌린지 2일차 TIL"
description: "Number 자료형 JavaScript에서 Number 숫자 자료형은 정수와 실수를 포함한 숫자 데이터를 표현하는 자료형입니다. 1. Number 자료형 JavaScript의 Number 자료형은 정수와 실수를 구분하지 않고 모든 숫자를 하나의 타입으로 다룹니다."
publishedAt: 2025-03-09
updatedAt: 2026-08-14
category: Development
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: 3d226f92-d7e5-4523-aeba-164cefeae17d
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-2%EC%9D%BC%EC%B0%A8-TIL
draft: false
---
![](/images/velog/js-챌린지-2일차-til-01.webp)

## Number 자료형
JavaScript에서 Number(숫자) 자료형은 정수와 실수를 포함한 숫자 데이터를 표현하는 자료형입니다.


### 1. Number 자료형
JavaScript의 Number 자료형은 정수와 실수를 구분하지 않고 모든 숫자를 하나의 타입으로 다룹니다.

#### 숫자 선언 예제
```
let a = 100; // 정수
let b = 3.14; // 실수
let c = 1.2e-3; // 지수 표기법 (0.0012)
```
- 자바스크립트에서는 64비트 부동소수점 방식으로 숫자를 표현합니다.
- -2⁶³ ~ 2⁶³ - 1 범위까지 정수를 정확하게 표현할 수 있습니다.

### 2. 문자열을 숫자로 변환하기
사용자 입력은 기본적으로 문자열(String)로 처리됩니다.
숫자를 입력해도 문자열로 저장되므로, 연산을 위해 숫자로 변환해야 합니다.

#### 문자열을 입력받고 자료형 확인하기
```
let input = prompt("입력"); 
console.log(input, typeof input);
```
- 위 코드를 실행하면 사용자가 입력한 값이 문자열로 저장되는 것을 확인할 수 있습니다.

### 3. parseInt()와 parseFloat()로 숫자 변환
JavaScript에서는 parseInt()와 parseFloat()을 사용하여 문자열을 숫자로 변환할 수 있습니다.

#### 정수 변환 (parseInt())
```
let number = parseInt(number);
console.log(number, typeof number);
```
- parseInt()는 소수점 이하를 버리고 정수로 변환합니다.

#### 실수 변환 (parseFloat())
```
let heightFloat = parseFloat(height);
console.log(heightFloat, typeof heightFloat); 
```
- parseFloat()는 소수점까지 포함하여 실수로 변환합니다.

#### 변환 예제
```
let strNum = "123.4";
console.log(parseInt(strNum)); // 123 (정수 변환)
console.log(parseFloat(strNum)); // 123.4 (실수 변환)
```
### 4. 숫자가 아닌 값(NaN)과 무한대(Infinity)
#### NaN (Not a Number)
```
let number = parseInt("안녕100"); 
console.log(number); // NaN (숫자로 변환 불가)
```
- 숫자로 변환할 수 없는 문자열이 입력되면 NaN (Not a Number)가 반환됩니다.
- NaN은 연산이 불가능한 숫자값을 의미합니다.

#### Infinity와 -Infinity
```
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
```
- 무한대를 나타내는 값으로, 너무 큰 값을 계산할 때 발생할 수 있습니다.

## String 자료형
JavaScript에서 String(문자열) 자료형은 텍스트 데이터를 표현하는 데 사용됩니다.

### 1. 문자열 선언 방법
JavaScript에서 문자열은 쌍따옴표("") 또는 따옴표('')로 감싸서 표현할 수 있습니다.

#### 문자열 선언 예제
```
let a = "Hello, World!"; // 쌍따옴표 사용
let b = 'hello, world!'; // 따옴표 사용
```
- 쌍따옴표("")와 따옴표('')는 동일하게 문자열을 정의할 수 있습니다.

### 2. 문자열에서 따옴표 사용 시 주의할 점
- 쌍따옴표와 따옴표를 혼용할 경우 오류가 발생할 수 있습니다.

```
let error = "오류 발생'; // 에러 발생
let c = "Hello 'Hello'."; // 가능
let d = 'Hello "hello"world'; // 가능
```
-  문자열 안에서 같은 종류의 따옴표를 사용하고 싶다면 "이스케이프 문자"를 활용해야 합니다.

### 3. 이스케이프 문자 (\)
이스케이프 문자(\)를 사용하면 문자열 안에서 특수 문자를 그대로 출력할 수 있습니다.

#### 이스케이프 문자 활용 예제
```
let e = "helo : \"world\"";
console.log(e); // hello : "world"
```
- 역슬래시(\)를 사용하여 따옴표(", ')를 문자 그대로 표현할 수 있습니다.

#### 여러 가지 이스케이프 문자
문자	설명
\"	쌍따옴표 삽입
\'	따옴표 삽입
\\	역슬래시(\) 삽입
\n	줄 바꿈(New Line)
### 4. 문자열 안에서 줄 바꾸기 (\n)
"\n"을 사용하면 문자열 내에서 줄 바꿈(Line Break)을 할 수 있습니다.

#### 줄 바꿈 예제
```
let multiLine = "Hello,\nJavaScript!";
console.log(multiLine);
```
- 실행하면 다음과 같이 출력됩니다.

Hello,
JavaScript!
### 5. 문자열을 콘솔에 출력하기
```
let message = "Hello, World";
console.log(message);
```
- 개발자 도구(Console)에서 값을 확인할 수 있습니다.
- 문자열을 console.log()로 출력하면 따옴표 없이 표시됩니다.

## Object(객체) 자료형
JavaScript에서 Object(객체) 자료형은 여러 개의 데이터를 하나의 구조로 저장하는 자료형입니다.

### 1. 객체(Object)란?
- 객체는 여러 개의 속성(프로퍼티)을 가지는 데이터 구조입니다.
- 속성(Property)은 "이름: 값" 형태로 저장됩니다.
- 각 속성의 값에는 모든 자료형(숫자, 문자열, 불리언, 또 다른 객체 등)이 올 수 있습니다.

### 2. 객체 생성하기
객체를 생성하는 가장 기본적인 방법은 중괄호 {}를 사용하는 것입니다.

#### 빈 객체 생성
let emptyObject = {}; // 빈 객체 생성
console.log(emptyObject); // {}
console.log(typeof emptyObject); // "object"
- typeof 연산자를 사용하면 객체의 자료형은 항상 "object"로 출력됩니다.

### 3. 속성을 포함한 객체 생성
객체는 이름과 값을 가진 속성(Property)들의 집합입니다.

#### 사람 정보를 저장하는 객체

```
let person = {
    name: "홍길동",
    age: 20,
    height: 180
};
console.log(person);
```
- name, age, height가 객체의 속성(프로퍼티)입니다.
- 속성 값으로 문자열(String), 숫자(Number) 등 다양한 자료형을 저장할 수 있습니다.

### 4. 객체 속성 접근하기
객체 속성에 접근하는 방법은 점 표기법(.)과 대괄호 표기법([]) 두 가지가 있습니다.

#### 점 표기법 (.) 사용
```
console.log(person.name); // "홍길동"
console.log(person.age); // 20
```
- 점 표기법을 사용하면 객체.속성명 형태로 값을 가져올 수 있습니다.

#### 대괄호 표기법 ([]) 사용
```
console.log(person["name"]); // "홍길동"
console.log(person["age"]); // 20
```
- 대괄호 표기법을 사용할 경우, 속성명을 문자열로 전달해야 합니다.
- 변수를 사용하여 동적으로 속성에 접근할 때 유용합니다.

#### 5. 객체 속성 변경하기
객체의 속성 값은 변수를 변경하는 것처럼 업데이트할 수 있습니다.

#### 속성 값 변경
```
person.name = "김철수"; // 점 표기법으로 변경
person["age"] = 25; // 대괄호 표기법으로 변경

console.log(person);
```
- 기존 속성 값이 새로운 값으로 덮어씌워집니다.

#### 6. 객체에 새로운 속성 추가하기
새로운 속성을 추가하려면 존재하지 않는 속성 이름을 사용하여 값을 할당하면 됩니다.

#### 새로운 속성 추가
```
person.job = "개발자"; // 점 표기법으로 추가
person["city"] = "서울"; // 대괄호 표기법으로 추가

console.log(person);
```
- 기존 객체에 새로운 속성을 쉽게 추가할 수 있습니다.

## undefined와 null
JavaScript에서는 값이 없는 상태를 나타내는 두 가지 특별한 자료형이 있습니다:
- undefined
- null

### 1. undefined란?
undefined는 값이 할당되지 않은 변수나 정의되지 않은 속성에 접근할 때 자동으로 부여되는 값입니다.

#### 변수를 선언만 하고 초기화하지 않은 경우
```
let a;
console.log(a); // undefined
console.log(typeof a); // "undefined"
```
- 변수를 선언했지만 초기값을 할당하지 않으면 기본적으로 undefined 값이 들어갑니다.

#### 객체에서 존재하지 않는 속성에 접근할 경우
```
let obj = { x: 10, y: 20 };
console.log(obj.x); // 10 (정상 출력)
console.log(obj.z); // undefined (정의되지 않은 속성)
console.log(typeof obj.z); // "undefined"
```
- 존재하지 않는 속성에 접근하면 undefined 값이 반환됩니다.

### 2. null이란?
null은 개발자가 의도적으로 변수를 "비어 있음" 상태로 설정하는 값입니다.

#### null 값 할당하기
```
let emptyValue = null;
console.log(emptyValue); // null
console.log(typeof emptyValue); // "object" (자바스크립트의 오래된 버그)
```
- null은 값이 없음을 명시적으로 나타내기 위해 개발자가 직접 할당해야 합니다.
- typeof null이 "object"로 출력되는 것은 자바스크립트 초기 설계 오류로, 여전히 유지되고 있습니다.

### 3. undefined vs null 차이점
#### undefined	
- 의미	값이 없는 상태 (자동 할당)
- 값 할당
- 사용 사례

#### null
- 개발자가 명시적으로 "빈 값"을 지정
- 시스템이 자동 할당	개발자가 직접 할당
- 변수 선언만 하고 초기화하지 않음	특정 변수의 값을 비울 때 사용

### 차이점 예제
```
let a; // undefined 자동 할당
let b = null; // 개발자가 명시적으로 null 할당
```

```
console.log(a); // undefined
console.log(b); // null
```
- undefined는 값이 할당되지 않은 상태를 의미하고,
- null은 의도적으로 "값 없음"을 표현하는 것입니다.

## 실습 코드

#### Number - 실습(1)
> ![](/images/velog/js-챌린지-2일차-til-02.webp)

#### Number - 실습(2)
> ![](/images/velog/js-챌린지-2일차-til-03.webp)

#### String - 실습(1)
> ![](/images/velog/js-챌린지-2일차-til-04.webp)

#### String - 실습(2)
> ![](/images/velog/js-챌린지-2일차-til-05.webp)

#### Object - 실습(1)
> ![](/images/velog/js-챌린지-2일차-til-06.webp)

#### Object - 실습(2)
> ![](/images/velog/js-챌린지-2일차-til-07.webp)

#### undefined와 null - 실습
> ![](/images/velog/js-챌린지-2일차-til-08.webp)
