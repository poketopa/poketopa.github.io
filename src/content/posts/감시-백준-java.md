---
title: "감시 (백준, Java)"
description: "브루트포스 / 백트래킹을 이용한 문제다. 풀이 아이디어를 떠올리기 보다는 구현 중에 실수하지 않는 것에 신경을 많이 써야 했다. 풀고 나니 내 코드가 뭔가.. 아름답다 라는 생각이 들어 남긴다. 잘 푼건 아니고 그냥 코드가 예쁘다는 생각이 들었다"
publishedAt: 2025-09-18
updatedAt: 2026-08-14
category: Development
tags: ["알고리즘"]
source:
  platform: Velog
  id: 814f685b-9d30-49d3-8eba-a5bec4509b88
  url: https://velog.io/@lhs5427ll/%EA%B0%90%EC%8B%9C-%EB%B0%B1%EC%A4%80-Java
draft: false
---
https://www.acmicpc.net/problem/15683

브루트포스 / 백트래킹을 이용한 문제다.

풀이 아이디어를 떠올리기 보다는 구현 중에 실수하지 않는 것에 신경을 많이 써야 했다.

풀고 나니 내 코드가 뭔가.. 아름답다 라는 생각이 들어 남긴다. (잘 푼건 아니고 그냥 코드가 예쁘다는 생각이 들었다)

``` java
public class Main {
	static int min = Integer.MAX_VALUE;

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		//StringTokenizer st = new StringTokenizer(br.readLine());

		StringTokenizer st = new StringTokenizer(br.readLine());
		int row = Integer.parseInt(st.nextToken());
		int column = Integer.parseInt(st.nextToken());
		int[][] map = new int[row][column];
		List<int[]> list = new ArrayList<>();
		for (int i = 0; i < row; i++) {
			StringTokenizer st2 = new StringTokenizer(br.readLine());
			for (int j = 0; j < column; j++) {
				map[i][j] = Integer.parseInt(st2.nextToken());
				if (0 < map[i][j] && map[i][j] < 6)
					list.add(new int[] {i, j, map[i][j]});
			}
		}
		List<int[]> stack = new ArrayList<>();
		dfs(0, map, list, stack);
		System.out.print(min);
	}

	public static void dfs(int index, int[][] map, List<int[]> list, List<int[]> stack) {
		if (stack.size() == list.size()) {
			int[][] newMap = new int[map.length][map[0].length];
			for (int i = 0; i < map.length; i++) {
				for (int j = 0; j < map[0].length; j++)
					newMap[i][j] = map[i][j];
			}
			for (int i = 0; i < stack.size(); i++) {
				int y = stack.get(i)[0];
				int x = stack.get(i)[1];
				if (stack.get(i)[2] == 1) {
					if (stack.get(i)[3] == 0) {
						direction(newMap, y, x, "RIGHT");
					} else if (stack.get(i)[3] == 1) {
						direction(newMap, y, x, "DOWN");
					} else if (stack.get(i)[3] == 2) {
						direction(newMap, y, x, "LEFT");
					} else {
						direction(newMap, y, x, "UP");
					}
				} else if (stack.get(i)[2] == 2) {
					if (stack.get(i)[3] == 0) {
						direction(newMap, y, x, "RIGHT");
						direction(newMap, y, x, "LEFT");
					} else if (stack.get(i)[3] == 1) {
						direction(newMap, y, x, "UP");
						direction(newMap, y, x, "DOWN");
					}
				} else if (stack.get(i)[2] == 3) {
					if (stack.get(i)[3] == 0) {
						direction(newMap, y, x, "UP");
						direction(newMap, y, x, "RIGHT");
					} else if (stack.get(i)[3] == 1) {
						direction(newMap, y, x, "RIGHT");
						direction(newMap, y, x, "DOWN");
					} else if (stack.get(i)[3] == 2) {
						direction(newMap, y, x, "DOWN");
						direction(newMap, y, x, "LEFT");
					} else {
						direction(newMap, y, x, "LEFT");
						direction(newMap, y, x, "UP");
					}
				} else if (stack.get(i)[2] == 4) {
					if (stack.get(i)[3] == 0) {
						direction(newMap, y, x, "LEFT");
						direction(newMap, y, x, "UP");
						direction(newMap, y, x, "RIGHT");
					} else if (stack.get(i)[3] == 1) {
						direction(newMap, y, x, "UP");
						direction(newMap, y, x, "RIGHT");
						direction(newMap, y, x, "DOWN");
					} else if (stack.get(i)[3] == 2) {
						direction(newMap, y, x, "RIGHT");
						direction(newMap, y, x, "DOWN");
						direction(newMap, y, x, "LEFT");
					} else {
						direction(newMap, y, x, "DOWN");
						direction(newMap, y, x, "LEFT");
						direction(newMap, y, x, "UP");
					}
				} else {
					direction(newMap, y, x, "UP");
					direction(newMap, y, x, "RIGHT");
					direction(newMap, y, x, "DOWN");
					direction(newMap, y, x, "LEFT");
				}
			}
			int count = 0;
			for (int i = 0; i < newMap.length; i++) {
				for (int j = 0; j < newMap[0].length; j++) {
					if (newMap[i][j] == 0)
						count++;
				}
			}
			min = Math.min(min, count);
			return;
		}

		if (list.get(index)[2] == 1) {
			for (int i = 0; i < 4; i++) {
				stack.add(new int[] {list.get(index)[0], list.get(index)[1], 1, i});
				dfs(index + 1, map, list, stack);
				stack.remove(stack.size() - 1);
			}
		} else if (list.get(index)[2] == 2) {
			for (int i = 0; i < 2; i++) {
				stack.add(new int[] {list.get(index)[0], list.get(index)[1], 2, i});
				dfs(index + 1, map, list, stack);
				stack.remove(stack.size() - 1);
			}
		} else if (list.get(index)[2] == 3) {
			for (int i = 0; i < 4; i++) {
				stack.add(new int[] {list.get(index)[0], list.get(index)[1], 3, i});
				dfs(index + 1, map, list, stack);
				stack.remove(stack.size() - 1);
			}
		} else if (list.get(index)[2] == 4) {
			for (int i = 0; i < 4; i++) {
				stack.add(new int[] {list.get(index)[0], list.get(index)[1], 4, i});
				dfs(index + 1, map, list, stack);
				stack.remove(stack.size() - 1);
			}
		} else {
			stack.add(new int[] {list.get(index)[0], list.get(index)[1], 5, 0});
			dfs(index + 1, map, list, stack);
			stack.remove(stack.size() - 1);
		}
	}

	public static void direction(int[][] map, int y, int x, String direction) {
		if (direction.equals("UP")) {
			while (y > 0 && map[y - 1][x] != 6) {
				if (map[y - 1][x] == 0) {
					map[y - 1][x] = -1;
				}
				y--;
			}
		} else if (direction.equals("RIGHT")) {
			while (x + 1 < map[0].length && map[y][x + 1] != 6) {
				if (map[y][x + 1] == 0) {
					map[y][x + 1] = -1;
				}
				x++;
			}
		} else if (direction.equals("DOWN")) {
			while (y + 1 < map.length && map[y + 1][x] != 6) {
				if (map[y + 1][x] == 0) {
					map[y + 1][x] = -1;
				}
				y++;
			}
		} else {
			while (x > 0 && map[y][x - 1] != 6) {
				if (map[y][x - 1] == 0) {
					map[y][x - 1] = -1;
				}
				x--;
			}
		}
	}
}

```
