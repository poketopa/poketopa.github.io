---
title: "가장 긴 증가하는 부분 수열 2 (백준, Java)"
description: "문제는 간단하다. 수열에서 오름차순으로 증가하는 부분 수열 중 가장 긴 수열의 길이 수열 요소의 개수 를 구해야 한다. DP를 사용하여 간단한 점화식을 세울 수 있다. 💡 아이디어 각 인덱"
publishedAt: 2025-03-15
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: c8e2071f-fc50-4d39-a444-fa7ee4ed445b
  url: https://velog.io/@lhs5427ll/Temp-Title
draft: false
---
https://www.acmicpc.net/problem/12015

![](/images/velog/가장-긴-증가하는-부분-수열-2-백준-java-01.webp)

문제는 간단하다.

수열에서 오름차순으로 증가하는 부분 수열 중 가장 긴 수열의 길이 (수열 요소의 개수)를 구해야 한다.


DP를 사용하여 간단한 점화식을 세울 수 있다.


## 💡 아이디어

**각 인덱스를 확인하며 이전 인덱스보다 큰 값이라면 이전 인덱스의 dp값에 +1을 한다**

```
dp[i] = Math.max(dp[i], dp[j] + 1);

for(int i=0;i<dp.length;i++){
            for(int j=0;j<i;j++){
                if(arr[j]<arr[i]){
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
```
그러나, 문제 조건에서 배열의 크기가 최대 1,000,000로 주어지기 때문에 2중 for문을 사용한다면 **시간초과가 발생**한다.

- (보통 코테에서 10억 번 이상의 연산을 하면 시간초과가 발생한다. 크기가 100,000 이상일 때 이중 for문을 사용하면 100,000 x 100,000 = 10억 으로 시간초과 발생)


그러므로 더 효율적인 방법이 필요하다


예를들어

**{10, 20, 30, 15, 20, 30, 50, 40, 45 ,60}** 라는 배열이 있다고 생각해본다.


여기서 길이가 가장 긴 부분 수열은 

**{10, 15, 20, 30, 40, 45, 60} **이다.


처음 10, 20, 30을 확인했을 때 {10, 20, 30} 수열이 만들어진다. 그러나 다음 15를 확인할 때 {10, 20, 30} 수열과 {10, 15} 수열이 만들어지게 된다. 두 가지 수열을 모두 후보군으로 생각하며 다음 인덱스를 탐험하기 위한 아이디어가 필요하다.


먼저 병렬적으로 생각하여 다음 인덱스를 탐험한다면

**{10, 20, 30, 50, 60}**

**{10, 15, 20, 30, 50} **

**{10, 15, 20, 30, 40, 45, 60} **

위 처럼 여러 후보군이 생길 수 있다.

​

아이디어는 해당 병렬 후보군을 하나의 배열로 합치는 것이다.

첫 번째 인덱스는 모두 10이고, 다음 인덱스를 볼 때, 20과 15가 존재한다. 이 때, 작은 요소로 해당 인덱스를 덮어씌운다. 이후도 같은 방법으로 진행하면

​

{10}

{10, 20} // 마지막 요소(10)보다 새로운 값(20)이 크므로 뒤로 추가

{10, 20, 30} // 마지막 요소(20)보다 새로운 값(30)이 크므로 뒤로 추가

{10, 15, 30}

이 때, 마지막 요소(30)보다 새로운 값(15)이 작으므로 배열에서 적절한 위치에 대치한다 (20 -> 15) 

이것으로 현재 수열은 {10, 20, 30} 수열과 {10, 15} 수열을 병렬적으로 모두 가지고 있는 상태가 된다.

이후에 큰 값이 들어오면 {10, 20, 30} 수열 뒤에 추가되는 것으로 간주되고, 작은 값이 들어오면 새로운 수열이 병렬적으로 생성되는 것이다.


(새로운 요소가 마지막 요소보다 작을 때, 해당 요소가 들어갈 인덱스를 찾기 위해 이진 탐색 (Binary Search)를 사용한다.)

## 💻 소스 코드

```
import java.io.*;
import java.util.*;

public class Main{
    public static void main(String[] args)throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //StringTokenizer st = new StringTokenizer(br.readLine());

        int input = Integer.valueOf(br.readLine());
        int[] arr = new int[input];
        int[] dp = new int[input];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for(int i=0;i<arr.length;i++){
            arr[i] = Integer.valueOf(st.nextToken());
        }

        List<Integer> list = new ArrayList<>();
        list.add(arr[0]);

        for(int i=1;i<arr.length;i++){
            binarySearch(list, arr, arr[i]);
            // 끝보다 크면 추가
        }
        System.out.println(list.size());
    }

    private static void binarySearch(List<Integer> list, int[] arr, int target){
        if(target > list.get(list.size()-1)){
            list.add(target);
        }
        else{
            int start = 0;
            int end = list.size()-1;
            int mid = 0;
            // 이분탐색
            while(start<=end){
                mid = (start + end) / 2;
                if(target == list.get(mid)){
                    list.set(mid, target);
                    return;
                }
                else if(list.get(mid)<target){
                    start = mid + 1;
                }
                else if(list.get(mid)>target){
                    end = mid - 1;
                }
            }
            list.set(start, target);
        }
    }
}
```
