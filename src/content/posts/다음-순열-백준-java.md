---
title: "다음 순열 (백준, Java)"
description: "수열을 오름차순으로 정렬할 때, 주어진 수열 다음 차례의 수열을 구하는 문제이다. 틀린 아이디어 백트래킹을 이용하여 가능한 수열을 모두 만들어보려고 했으나, N의 크기가 최대 10,000이므로 가능한 수열의 경우의 수만 10000! 팩토리얼 이었다. 당연히 시간초과가 발생한다. 풀이..."
publishedAt: 2025-09-27
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: a5085871-9c1e-42e5-9e5b-a3d028dd747f
  url: https://velog.io/@lhs5427ll/%EB%8B%A4%EC%9D%8C-%EC%88%9C%EC%97%B4-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/10972

![](/images/velog/다음-순열-백준-java-01.webp)

수열을 오름차순으로 정렬할 때, 주어진 수열 다음 차례의 수열을 구하는 문제이다.

### 틀린 아이디어
백트래킹을 이용하여 가능한 수열을 모두 만들어보려고 했으나, N의 크기가 최대 10,000이므로 가능한 수열의 경우의 수만 10000!(팩토리얼) 이었다. 당연히 시간초과가 발생한다.

### 풀이 아이디어
예시 문제를 만들어 확인해보자.
![](/images/velog/다음-순열-백준-java-02.webp)

1 3 2 6 5 4 라는 수열이 주어질 때 다음 수열은 1 3 4 2 5 6이 된다. 

이는 3개의 단계로 나누어서 생각할 수 있다.

### 1. 숫자 끝의 내림차순을 확인한다.
![](/images/velog/다음-순열-백준-java-03.webp)
주어진 수열의 다음 수열을 찾아야 하므로, 최대한 작은 수를 바꿔야 한다.

그러나 내림차순으로 정렬된 숫자들은 이미 가장 큰 수 이므로 자리를 바꿔 더 큰 숫자를 만들 수 없다.

그러므로, 숫자 끝에서부터 내림차순으로 정렬된 배열을 확인하여 내림차순이 끝나는 곳을 찾는다.

![](/images/velog/다음-순열-백준-java-04.webp)
이 예시에서 내림차순이 끝나는 숫자는 2이다.

이제 2의 오른쪽에는 더 큰 숫자들이 존재하므로 자리를 바꿔 더 큰 숫자(다음 배열들)을 만들 수 있게 된다.

어떤 숫자와 바꿔야 할까?

### 2. 찾은 숫자보다 큰 숫자 찾기
다음 배열이 되려면 찾은 숫자(2) 보다 더 큰 숫자와 위치를 바꿔야 한다.

문제에서는 바로 다음 수열을 찾는 것이 목적이므로, 내림차순된 숫자 중 2보다 큰 바로 다음 숫자를 찾는다.

예시에서는 4인 것을 알 수 있다.

![](/images/velog/다음-순열-백준-java-05.webp)

### 3. 오름차순 정렬
현재 만들어진 수열의 의미는 무엇일까?

1. 이미 가장 큰 숫자라서 자리를 바꿀 수 없는 내림차순을 찾았다.
2. 내림차순이 끝나는 위치의 숫자와 내림차순에서 찾을 수 있는 다음으로 큰 숫자의 위치를 바꾸었다.

![](/images/velog/다음-순열-백준-java-06.webp)
위 상태가 다음으로 만들 수 있는 수열들이다. 그리고 이 중에서 가장 작은 수열을 구해야 한다.

이를 위해 나머지 요소들을 오름차순으로 정렬한다.

![](/images/velog/다음-순열-백준-java-07.webp)
답은 1 3 4 2 5 6이다.

#### 후기
실버 문제들은 다 풀 수 있을 거라 생각했는데 가끔 이런 문제에 고전할 때면 좀 슬프다.

좀 더 열심히 기본에 충실하자.

#### 코드
``` java
public class Main {
	static boolean flag = false;
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		//StringTokenizer st = new StringTokenizer(br.readLine());

		int input = Integer.parseInt(br.readLine());
		int[] number = new int[input];
		StringTokenizer st = new StringTokenizer(br.readLine());
		for(int i=0;i<input;i++) number[i] = Integer.parseInt(st.nextToken());

		int prev = -1;
		int index = input-1;
		// 뒤에서부터 확인, 역방향으로 오름차순을 확인하며 아닌 구간을 확인한다
		while(number[index] > prev){
			prev = number[index];
			index--;
			if(index == -1){
				System.out.print("-1");
				return;
			}
		}


		// 아닌 곳을 기준으로 해당 숫자보다 큰 숫자를 찾아 스왑
		List<Integer> list = new ArrayList<>();
		for(int i=index +1;i<input;i++) list.add(number[i]);
		Collections.sort(list);
		for(int i=0;i<list.size();i++){
			if(number[index] < list.get(i)){
				int temp = number[index];
				number[index] = list.get(i);
				list.set(i, temp);
				break;
			}
		}

		// 나머지 부분을 정렬
		for(int i=0;i<list.size();i++){
			number[index+1+i] = list.get(i);
		}

		for(int i=0;i<input;i++){
			System.out.print(number[i] + " ");
		}
	}
}	
```
