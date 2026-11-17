---
title: "Next Permutation (Baekjoon, Java)"
description: "Find the permutation immediately after the given permutation when permutations are arranged in ascending order. Incorrect idea: I tried generating every possible permutation using backtracking, but N can be as large as 10,000, meaning 10000! possible permutations. Naturally, that exceeds the time limit. Solution…"
publishedAt: 2025-09-27
updatedAt: 2026-08-14
category: Development
cover: /covers/baekjoon-thumbnail.png
tags: ["알고리즘"]
source:
  platform: Velog
  id: a5085871-9c1e-42e5-9e5b-a3d028dd747f
  url: https://velog.io/@lhs5427ll/%EB%8B%A4%EC%9D%8C-%EC%88%9C%EC%97%B4-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/10972

![](/images/velog/다음-순열-백준-java-01.webp)

Find the permutation immediately after the given permutation when permutations are arranged in ascending order.

### Incorrect idea
I tried generating every possible permutation using backtracking, but N can be as large as 10,000, meaning 10000! (factorial) possible permutations. Naturally, that exceeds the time limit.

### Solution idea
Let's make an example and work through it.
![](/images/velog/다음-순열-백준-java-02.webp)

Given 1 3 2 6 5 4, the next permutation is 1 3 4 2 5 6.

We can think of this in three steps.

### 1. Find the descending sequence at the end.
![](/images/velog/다음-순열-백준-java-03.webp)
Because we need the next permutation, we need to make the smallest possible change.

But numbers already in descending order represent the largest possible arrangement, so rearranging them cannot produce a larger one.

So examine the descending suffix from the end of the sequence and find where it ends.

![](/images/velog/다음-순열-백준-java-04.webp)
In this example, the number where the descending sequence ends is 2.

There are now larger numbers to the right of 2, so we can swap positions to produce a larger number (the following permutations).

Which number should we swap it with?

### 2. Find a number larger than the one we found
To produce the next permutation, we need to swap the number we found (2) with a larger number.

Since the goal is the very next permutation, find the smallest number greater than 2 in the descending suffix.

In this example, that is 4.

![](/images/velog/다음-순열-백준-java-05.webp)

### 3. Sort in ascending order
What does the permutation we have now mean?

1. We found the descending sequence that could not be rearranged to make a larger number because it was already the largest.
2. We swapped the number at the boundary of that descending sequence with the next larger number available in it.

![](/images/velog/다음-순열-백준-java-06.webp)
The state above represents the permutations we can produce next. We need to find the smallest among them.

To do that, sort the remaining elements in ascending order.

![](/images/velog/다음-순열-백준-java-07.webp)
The answer is 1 3 4 2 5 6.

#### Thoughts afterward
I thought I could solve any Silver problem, so it makes me a little sad when I occasionally struggle with one like this.

I should work harder on the fundamentals.

#### Code
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
