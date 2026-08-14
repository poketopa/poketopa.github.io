---
title: "JS 챌린지 3일차 TIL"
description: "산술 연산자 Arithmetic Operators JavaScript에서 산술 연산자는 수학적인 계산을 수행하는 연산자입니다. 1. 기본 산술 연산자 산술 연산자는 숫자 값을 연산하는 데 사용되는 연산자입니다. 연산자 설명 예제 덧셈 5 + 3 // 8 뺄셈"
publishedAt: 2025-03-10
updatedAt: 2026-08-14
category: Development
tags: ["UDR","언더독레볼루션"]
source:
  platform: Velog
  id: 8ee7f445-5dba-4570-8d5c-da0771f09f4c
  url: https://velog.io/@lhs5427ll/JS-%EC%B1%8C%EB%A6%B0%EC%A7%80-3%EC%9D%BC%EC%B0%A8-TIL
draft: false
---
![](/images/velog/js-챌린지-3일차-til-01.webp)

## 산술 연산자 
JavaScript에서 산술 연산자는 수학적인 계산을 수행하는 연산자입니다.

### 1. 기본 산술 연산자
산술 연산자는 숫자 값을 연산하는 데 사용되는 연산자입니다.

#### 연산자	설명	예제
- \+	덧셈	5 + 3 // 8
- \-	뺄셈	5 - 3 // 2
- \*	곱셈	5 * 3 // 15
- /	나눗셈	5 / 2 // 2.5
- %	나머지 연산	5 % 2 // 1

```
let a = 5, b = 3;

console.log(a + b); // 8
console.log(a - b); // 2
console.log(a * b); // 15
console.log(a / b); // 1.666...
console.log(a % b); // 2 (5를 3으로 나눈 나머지)
```
- +, -, *, / 연산자는 일반적으로 사용하는 사칙연산과 동일하게 동작합니다.
- % (나머지 연산자)는 나누기 후 남는 값을 반환합니다.

### 2. 단항 연산자 
단항 연산자는 하나의 피연산자만을 가지는 연산자입니다.

```
let x = 5;

console.log(-x); // -5 (부호 변경)
console.log(+x); // 5 (변화 없음)
```
- - 연산자는 숫자의 부호를 바꿉니다.
- + 연산자는 숫자를 그대로 유지합니다.

### 3. 증감 연산자
증감 연산자는 변수 값을 증가시키거나 감소시킬 때 사용합니다.

전위(++a, --a) vs 후위(a++, a--) 연산자
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
- ++a → 먼저 1 증가하고 그 값을 반환
- a++ → 현재 값을 먼저 반환한 후 1 증가

### 4. Math 객체 활용하기

#### 1) 제곱과 제곱근
```
console.log(Math.pow(2, 3)); // 8 (2^3)
console.log(Math.sqrt(16));  // 4 (√16)
```
- Math.pow(a, b) → a의 b승을 반환
- Math.sqrt(x) → x의 제곱근을 반환

#### 2) 난수 생성
```
console.log(Math.random()); // 0과 1 사이의 랜덤한 숫자
```
- Math.random()은 0 이상 1 미만의 난수를 생성합니다.

## 함수 사용하기 
JavaScript에서 함수(Function)는 특정 작업을 수행하는 코드 블록입니다.

### 1. 함수란?
- 함수는 입력(인자)을 받아 특정 작업을 수행한 후 결과를 반환할 수도 있는 코드 블록이다.
- 한 번 정의하면 필요할 때 여러 번 호출할 수 있다.
- 함수를 사용하면 코드의 재사용성이 높아지고 유지보수가 쉬워진다.

### 2. 함수 정의하기
JavaScript에서 함수를 정의하는 기본적인 방법은 function 키워드를 사용하는 것입니다.

#### 기본적인 함수 정의
```
function sayHello() {
    console.log("안녕하세요!");
}
```
- function 키워드 뒤에 함수 이름을 적고, 괄호 ()와 중괄호 {} 안에 코드 블록을 작성한다.
- 함수 내부의 console.log() 명령어가 실행되면 "안녕하세요!"가 출력된다.

### 3. 함수 호출하기
정의된 함수를 실행하려면 함수 이름 뒤에 괄호 ()를 붙여 호출해야 합니다.

```
sayHello(); // "안녕하세요!" 출력
```
- 함수를 호출하면 함수 내부의 코드가 실행된다.

### 4. 함수에 인자 전달하기
함수는 입력값(인자, Parameter)을 받을 수 있습니다.

#### 인자를 받는 함수
```
function greet(name) {
    console.log("안녕하세요, " + name + "님!");
}

greet("홍길동"); // "안녕하세요, 홍길동님!" 출력
greet("철수");   // "안녕하세요, 철수님!" 출력
```
- 함수 정의 시 name이라는 인자를 받도록 설정했습니다.
- 함수를 호출할 때 "홍길동", "철수"를 입력값으로 전달하여 다른 결과를 얻을 수 있다.

### 5. 함수의 반환값
함수는 return 키워드를 사용하여 결과값을 반환할 수 있습니다.

#### 반환값이 있는 함수
```
function add(a, b) {
    return a + b; // 두 수의 합을 반환
}

let result = add(3, 5);
console.log(result); // 8 출력
```
- return 키워드를 사용하면 함수가 실행된 후 특정 값을 반환할 수 있다.
- 반환된 값은 result 변수에 저장되어 이후에도 사용할 수 있다.

### 6. 함수의 다양한 활용
#### 여러 개의 인자를 받는 함수
```
function multiply(x, y) {
    return x * y;
}

console.log(multiply(4, 5)); // 20 출력
```
- 함수는 여러 개의 인자를 받을 수 있으며, 인자는 콤마(,)로 구분한다.

### 7. 함수의 장점
- 코드의 재사용성 증가 – 한 번 정의하면 여러 번 사용할 수 있다.
- 코드의 가독성 향상 – 역할이 명확한 함수는 코드 이해를 쉽게 만든다.
- 유지보수 용이 – 특정 기능을 수정할 때 함수 내부만 변경하면 된다.

## 관계 연산자와 논리 연산자 
JavaScript에서 관계 연산자(Relational Operators)는 두 개의 값을 비교하여 참(true) 또는 거짓(false)을 반환하는 연산자입니다.

### 1. 관계 연산자
관계 연산자는 두 값을 비교하는 역할을 하며, 결과값은 항상 불리언(Boolean) 타입(true 또는 false)으로 반환됩니다.

#### 관계 연산자의 종류
연산자	설명	예제	결과
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
- ===을 사용하면 예상치 못한 타입 변환을 방지할 수 있어 더 안전한 비교를 할 수 있다.

### 2. 논리 연산자 
논리 연산자는 여러 개의 조건을 조합하여 복합적인 논리를 구현할 때 사용됩니다.

#### 논리 연산자의 종류
```
&& (AND) 두 조건이 모두 참이면 true	
(5 > 3) && (3 > 1)	true
|| (OR)	하나라도 참이면 true
! (NOT)	논리값을 반대로 변경	!(5 > 3) false
```
- && 연산자는 모든 조건이 참(true)이어야 결과가 true가 된다.
- || 연산자는 하나라도 참(true)이면 결과가 true가 된다.
- ! 연산자는 논리값을 반대로 변환한다.

```
let age = 25;
let height = 180;
```

## 연산자 우선순위와 괄호
JavaScript에서 연산자는 특정한 우선순위(Priority)를 가지고 있으며, 연산자의 종류에 따라 실행 순서가 결정됩니다.

### 1. 연산자의 우선순위란?
- 연산자는 기본적으로 우선순위가 높은 것부터 먼저 실행된다.
- 곱하기(*), 나누기(/), 나머지(%) 연산자는 덧셈(+), 뺄셈(-)보다 먼저 계산된다.
- 관계 연산자(비교 연산자)는 산술 연산보다 나중에 계산된다.
- 논리 연산자 중 &&(AND)가 ||(OR)보다 먼저 실행된다.

### 2. 기본 연산자 우선순위
```
1	()	괄호 (가장 우선)	(3 + 5) * 2 // 16
2	!	논리 NOT	!true // false
3	*, /, %	곱셈, 나눗셈, 나머지	10 / 2 * 3 // 15
4	+, -	덧셈, 뺄셈	5 + 3 - 2 // 6
5	<, <=, >, >=	관계(비교) 연산	5 > 3 // true
6	==, !=, ===, !==	동등 비교 연산	"5" == 5 // true
7	&&	논리 AND	true && false // false
```
- 괄호 ()를 사용하면 항상 가장 먼저 연산이 수행된다.
- 산술 연산(곱하기, 나누기, 나머지)은 덧셈, 뺄셈보다 먼저 실행된다.
- 비교 연산은 산술 연산보다 나중에 수행되며, 논리 연산(&&, ||)은 비교 연산보다 뒤에 실행된다.

### 3. 연산자 우선순위 예제
#### 기본 연산자 우선순위
```
let result = 10 + 2 * 3;
console.log(result); // 16 (곱셈이 먼저 수행됨)
```
- 2 * 3이 먼저 계산된 후 10 + 6이 수행됨.

#### 괄호를 사용하여 연산 순서 변경
```
let result = (10 + 2) * 3;
console.log(result); // 36
```
- 괄호를 사용하여 10 + 2를 먼저 계산한 후 * 3을 수행함.

### 4. 논리 연산자 우선순위
논리 연산자는 관계 연산자보다 나중에 실행됩니다.
특히 &&(AND) 연산자가 ||(OR)보다 먼저 실행됩니다.

#### &&가 ||보다 먼저 실행됨
```
let result = true || false && false;
console.log(result); // true
```
- false && false → false
- true || false → true

### 5. 복잡한 조건에서 괄호 사용하기

#### 괄호를 사용한 논리 연산 예제
```
let height = 180;
let age = 25;
```

### 6. 가독성을 위한 괄호 사용
연산자 우선순위를 숙지하고 있어도, 가독성을 높이기 위해 괄호를 명확하게 사용하는 것이 좋다.

#### 두 개의 식을 비교
첫 번째 코드 (괄호 없음)
```
let result1 = age >= 20 && age < 30 || height >= 180;
```

두 번째 코드 (괄호 사용)
```
let result2 = (age >= 20 && age < 30) || (height >= 180);
```
- 두 식은 같은 결과를 출력하지만, 두 번째 코드가 더 직관적이다.
- 연산자 우선순위를 활용하는 것보다 괄호를 적절히 사용하여 논리를 명확하게 표현하는 것이 중요하다.

## 문자열(String) 이어붙이기
JavaScript에서 문자열을 다룰 때, 여러 개의 문자열을 하나로 합치는 작업(문자열 연결, Concatenation)을 자주 수행합니다.

### 1. 문자열의 길이 확인하기
JavaScript에서는 문자열의 .length 속성을 사용하여 문자열의 길이(문자의 개수)를 확인할 수 있습니다.

#### 문자열 길이 확인
```
let str = "Hello";
console.log(str.length); // 5
```
- "Hello"는 문자 5개로 이루어져 있으므로 length 속성의 결과는 5입니다.

### 2. 문자열을 이어붙이는 방법
#### concat() 메서드 활용하기
문자열을 이어붙일 때 가장 기본적인 방법은 .concat() 메서드를 사용하는 것입니다.

```
let str1 = "Hello";
let str2 = " World";

let result = str1.concat(str2);
console.log(result); // "Hello World"
```
-.concat() 메서드를 사용하면 두 개의 문자열을 하나로 연결할 수 있습니다.

- 여러 개의 문자열을 한 번에 연결할 수도 있습니다.

```
let result2 = str1.concat(str2, "!");
console.log(result2); // "Hello World!"
```
- .concat() 메서드는 원본 문자열을 변경하지 않고 새로운 문자열을 반환합니다.

#### + 연산자로 문자열 연결
JavaScript에서는 + 연산자를 사용하여 문자열을 연결할 수도 있습니다.

```
let str1 = "Hello";
let str2 = " World";

let result = str1 + str2;
console.log(result); // "Hello World"
```
- + 연산자는 concat()보다 코드가 간결하여 가장 많이 사용되는 방법입니다.

- 문자열과 숫자도 + 연산자로 연결 가능합니다.

```
let num = 3.14;
console.log("파이는 " + num + " 입니다."); // "파이는 3.14 입니다."
```
- 숫자를 문자열과 + 연산하면 자동으로 문자열로 변환되어 연결됩니다.

### 3. 여러 개의 문자열 이어붙이기
#### 여러 문자열을 한 번에 연결하기
여러 개의 문자열을 연결할 때도 + 연산자를 활용할 수 있습니다.

```
let str1 = "Hello";
let str2 = " World";
let str3 = "!";

let result = str1 + str2 + str3;
console.log(result); // "Hello World!"
```
- +연산자를 연속으로 사용하면 여러 개의 문자열을 하나로 연결할 수 있습니다.

## 문자열(String) 다루기
문자열에서 특정 문자를 추출하거나, 부분 문자열을 구하는 방법 등을 살펴보겠습니다.

### 1. 문자열에서 특정 문자 가져오기
JavaScript에서는 문자열 내 특정 위치의 문자를 가져올 수 있는 방법이 있습니다.

#### charAt() 메서드 사용
문자열에서 특정 위치(index)의 문자를 가져오는 방법입니다.

```
let str = "JavaScript";
console.log(str.charAt(0)); // "J"
console.log(str.charAt(4)); // "S"
```
- .charAt(index)는 index 번째 문자를 반환합니다.
- 문자열의 길이를 벗어난 index를 입력하면 빈 문자열("")이 반환됩니다.

#### 대괄호([]) 표기법 사용
JavaScript에서는 배열처럼 대괄호([])를 이용해 특정 문자를 가져올 수도 있습니다.

```
let str = "JavaScript";
console.log(str[0]); // "J"
console.log(str[4]); // "S"
```
- .charAt()과 유사하지만, 존재하지 않는 index를 입력하면 undefined가 반환됩니다.

```
console.log(str[100]); // undefined
```
- 일반적으로 대괄호 표기법([])이 더 직관적이고 많이 사용됩니다.

### 2. 부분 문자열 추출하기
문자열의 일부만 잘라서 사용할 수도 있습니다.

#### substring(start, end)
문자열에서 특정 범위의 문자열을 추출하는 방법입니다.

```
let str = "JavaScript";
console.log(str.substring(0, 4)); // "Java"
console.log(str.substring(4, 10)); // "Script"
```
- 첫 번째 인덱스부터 두 번째 인덱스 '전'까지 문자열을 추출합니다.
- str.substring(2, 5) → index 2 ~ 4까지의 문자열을 반환
- 두 번째 인자를 생략하면 해당 위치부터 끝까지 가져옵니다.

```
console.log(str.substring(5)); // "cript"
```
#### slice(start, end)
slice()는 substring()과 유사하지만, 음수 인덱스를 사용할 수 있습니다.

```
let str = "JavaScript";
console.log(str.slice(0, 4)); // "Java"
console.log(str.slice(-6)); // "Script"
```
- 음수를 사용하면 문자열 끝에서부터 가져올 수 있습니다.
- slice(-6)은 문자열 끝에서 6번째 문자부터 끝까지 추출합니다.

#### substr(start, length)
substr() 메서드는 특정 위치에서 지정한 길이만큼 문자열을 추출합니다.

```
let str = "JavaScript";
console.log(str.substr(0, 4)); // "Java"
console.log(str.substr(4, 6)); // "Script"
```
- 첫 번째 인자는 시작 위치, 두 번째 인자는 가져올 문자 개수를 의미합니다.
- substr()은 최신 JavaScript에서 사용이 권장되지 않습니다.
- slice() 또는 substring()을 대신 사용하세요.

### 3. 문자열에서 특정 단어 찾기
문자열 내에서 특정 단어가 어디에 있는지 확인하는 방법입니다.

#### indexOf() 메서드
```
let str = "Hello, JavaScript!";
console.log(str.indexOf("JavaScript")); // 7
console.log(str.indexOf("Python")); // -1 (존재하지 않음)
```
- 문자열이 존재하면 첫 번째 등장 위치의 인덱스를 반환합니다.
- 존재하지 않으면 -1을 반환합니다.

#### lastIndexOf() 메서드
lastIndexOf()는 뒤에서부터 검색하여 첫 번째로 발견되는 위치를 반환합니다.

```
let str = "Hello, JavaScript, JavaScript!";
console.log(str.lastIndexOf("JavaScript")); // 19
```
- indexOf()는 앞에서부터 검색, lastIndexOf()는 뒤에서부터 검색합니다.

### 4. 문자열 포함 여부 확인
#### includes() 메서드
문자열이 특정 단어를 포함하고 있는지 여부를 확인합니다.

```
let str = "Hello, JavaScript!";
console.log(str.includes("JavaScript")); // true
console.log(str.includes("Python")); // false
```
- true 또는 false를 반환하여 존재 여부만 확인할 수 있습니다.

#### startsWith() & endsWith()

```
let str = "JavaScript is fun";
console.log(str.startsWith("Java")); // true
console.log(str.endsWith("fun")); // true
console.log(str.endsWith("is")); // false
```
- startsWith() → 특정 문자열로 시작하는지 확인
- endsWith() → 특정 문자열로 끝나는지 확인

## 실습 코드

#### 산술연산자 - 실습
> ![](/images/velog/js-챌린지-3일차-til-02.webp)

#### 함수 사용하기 - 실습
> ![](/images/velog/js-챌린지-3일차-til-03.webp)

#### 관계연산자 - 실습(1)
> ![](/images/velog/js-챌린지-3일차-til-04.webp)

#### 관계연산자 - 실습(2)
> ![](/images/velog/js-챌린지-3일차-til-05.webp)

#### String 이어 붙이기 - 실습
> ![](/images/velog/js-챌린지-3일차-til-06.webp)

#### String 다루기 - 실습(1)
> ![](/images/velog/js-챌린지-3일차-til-07.webp)

#### String 다루기 - 실습(2)
> ![](/images/velog/js-챌린지-3일차-til-08.webp)
