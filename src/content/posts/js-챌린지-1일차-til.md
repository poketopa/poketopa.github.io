---
title: "JS 챌린지 1일차 TIL"
description: "1. 실습 환경 만들기 실습 환경으로 크롬 브라우저와 텍스트 에디터를 활용합니다. 무료로 사용할 수 있으며, 크롬 브라우저에서 작성한 HTML과 JavaScript를 직접 실행할 수 있습니다. 1 기본 HTML 파일 만들기 기본 HTML 파일을 작성 2 파일 저장 index.html로 파일 저장 파일을 저장한 후,…"
publishedAt: 2025-03-08
updatedAt: 2026-08-14
category: Development
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: debd9d8e-9de2-4d51-9c85-1c7a50680825
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-1%EC%9D%BC%EC%B0%A8-TIL
draft: false
---
![](/images/velog/js-챌린지-1일차-til-01.webp)

## 1. 실습 환경 만들기
실습 환경으로 크롬 브라우저와 텍스트 에디터를 활용합니다. 
무료로 사용할 수 있으며, 크롬 브라우저에서 작성한 HTML과 JavaScript를 직접 실행할 수 있습니다.

#### 1) 기본 HTML 파일 만들기
기본 HTML 파일을 작성
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

#### 2) 파일 저장
- index.html로 파일 저장
파일을 저장한 후, 브라우저에서 실행하려면 파일을 드래그하여 크롬 창에 올려놓습니다.

-  script.js로 파일 저장
HTML 파일에서 JavaScript 파일을 불러오려면 script 태그를 사용합니다.

```
<head>
    <script src="script.js"></script>
</head>
```
  

##   Developer Console 사용하기
개발자 콘솔은 크롬, Firefox, Safari, Edge 등 대부분의 브라우저에서 제공되며, JavaScript 실행 결과를 확인하고 디버깅할 때 활용할 수 있습니다.

#### 1) 개발자 도구 열기

1. 단축키 사용
Windows: F12 또는 Ctrl + Shift + I
Mac: Cmd + Option + I
2. 메뉴에서 접근
크롬 우측 상단 ⋮ (설정 버튼) 클릭
도구 더보기 → 개발자 도구 선택

#### 2) JavaScript 코드 작성

```
console.log("Hello developer console");
```

#### 3) JavaScript 파일 작성 및 실행
HTML과 연결된 JavaScript 파일을 만들어 실행합니다.

- script.js 파일 작성
```
console.log("Hello developer console");
console.log(2);
console.log(3);
```
- HTML에서 JavaScript 로드
```
<head>
    <script src="script.js"></script>
</head>
```

#### 4) 실행 방법
크롬 브라우저 개발자 도구(Console 탭)를 확인합니다.
console.log()의 출력 결과를 확인합니다.

- 실행하면 "Hello, Developer Console!", 2, 3이 순차적으로 출력된다.

- 개발자 도구에서 직접 JavaScript 실행
개발자 도구의 Console 탭에서는 직접 JavaScript를 실행할 수도 있다.

- Console에서 실행
1) 개발자 도구(Console 탭)에서 다음 명령어 입력
2) Enter 키를 누르면 결과 출력
```
	console.log(4);
```

- alert() 함수 실행 가능
```
alert("Hello, JavaScript!");
```
  
##   console.log()
console.log()는 JavaScript에서 데이터를 출력하는 가장 기본적인 방법입니다.
이 함수는 브라우저의 개발자 도구(Developer Console)에 메시지를 출력할 때 사용됩니다.

#### 사용법
```
console.log("HelloWorld"); // 문자열 출력
console.log(10); // 숫자 출력
console.log(true); // boolean 값 출력
```
실행하면 개발자 도구의 Console 탭에 결과가 표시됩니다.

#### 여러 개의 값 출력하기
```
console.log("Age:", 25, "City:", "Seoul");
```
- 여러 개의 값을 쉼표(,)로 구분하여 출력할 수 있습니다.

  
## 변수 선언과 초기화
변수(Variable)는 프로그램 실행 중 데이터를 저장하고 읽을 수 있는 가상의 공간입니다.
자바스크립트에서 변수는 데이터를 저장하고 활용하는 데 필수적인 요소입니다.

#### 1. 변수란?
- 변수는 데이터를 저장하는 메모리 공간입니다.


#### 2. 변수 선언하기
자바스크립트에서는 변수를 선언할 때 let, const, var 키워드를 사용합니다.

```
let a; // 변수 선언 (값은 없음)
let b, c, d; // 여러 개의 변수 선언
```
- 변수 선언만 하면 값이 할당되지 않아 undefined 상태입니다.

#### 3. 변수 초기화(값 할당)
변수를 선언한 후, 초기값을 할당하여 사용할 수 있습니다.

```
let a = 10; // 변수 선언과 동시에 값 할당
let b = 20, c = 30; // 여러 개의 변수를 한 번에 초기화
```

## 변수의 활용
변수의 값을 읽고 활용하는 방법, 그리고 사용자로부터 입력을 받는 방법

#### 1. 변수의 값을 출력하기
변수에 저장된 값을 출력하려면 변수 이름을 그대로 사용하면 됩니다.

- alert()로 값 출력
```
let message = "Hello, World!";
alert(message);
```
변수 message에 저장된 값이 alert()을 통해 출력됩니다.

#### 2. console.log()로 출력하기
console.log()를 활용하면 개발자 도구(Console)에서 값을 출력할 수 있습니다.

```
let message = "Hello, World!";
console.log(message); // 개발자 도구에서 출력됨
```
alert()과 달리 화면에 영향을 주지 않고 개발자 도구의 콘솔에서만 확인 가능합니다.

#### 3. 사용자 입력 받기 (prompt())
사용자로부터 입력을 받을 때는 prompt() 함수를 사용할 수 있습니다.

```
let name = prompt("이름을 입력");
console.log(name + "님 안녕하세요.");
```
#### 실행 과정
1) 사용자가 입력 창(prompt)을 통해 이름을 입력
2) 입력한 값이 name 변수에 저장
2) console.log()를 이용해 출력 ("홍길동님, 안녕하세요.")

- prompt() 함수는 사용자의 입력을 문자열 형태로 저장합니다.
- 입력된 값과 문자열을 연결(+ 연산자 사용)하여 메시지를 출력할 수 있습니다.
  
## 기본 자료형
JavaScript에서 변수에 저장할 수 있는 값의 종류를 자료형(Data Type)이라고 합니다.

#### 1. JavaScript의 기본 자료형
JavaScript에서 변수에 저장할 수 있는 대표적인 자료형은 다음과 같습니다.

#### 자료형	설명	예제
Number	숫자형 (정수, 실수 포함)	100, 3.14
String	문자열형 (문자 데이터)	"안녕하세요"
Boolean	불리언형 (참/거짓)	true, false

#### 2. 자료형 예제
다음은 각각의 자료형을 사용하는 코드 예제입니다.

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
typeof 연산자를 사용하면 변수의 자료형을 확인할 수 있습니다.

#### 3. typeof 연산자로 자료형 확인하기
JavaScript에서 변수의 자료형을 확인할 때는 typeof를 사용합니다.

```
let message = "Hello, World!";
console.log(typeof message); // "string"

let age = 25;
console.log(typeof age); // "number"

let isAdult = true;
console.log(typeof isAdult); // "boolean"
```
typeof는 변수의 타입을 문자열로 반환합니다.

#### 4. 개발자 도구(Console)에서 직접 확인하기
개발자 도구(Console)에서 직접 변수의 값을 확인할 수도 있습니다.

```
let x = 42;
x;
```
콘솔에서 변수 이름만 입력하면 해당 변수의 값이 출력됩니다.

- console.log(x);를 사용하지 않아도, 콘솔에서 직접 변수 이름을 입력하면 자동으로 값이 출력됩니다.

## 실습코드

#### console.log - 실습
> ![](/images/velog/js-챌린지-1일차-til-02.webp)

#### 변수 - 실습
> ![](/images/velog/js-챌린지-1일차-til-03.webp)

#### 변수의 활용 - 실습
> ![](/images/velog/js-챌린지-1일차-til-04.webp)

#### 기본자료형 - 실습(1)
> ![](/images/velog/js-챌린지-1일차-til-05.webp)

#### 기본자료형 - 실습(2)
> ![](/images/velog/js-챌린지-1일차-til-06.webp)

#### 기본자료형 - 실습(3)
> ![](/images/velog/js-챌린지-1일차-til-07.webp)
