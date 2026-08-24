# Check if Every Row and Column Contains All Numbers

An $n \times n$ matrix is valid if every row and every column contains all the integers from $1$ to $n$ (inclusive).

Given an $n \times n$ integer matrix `matrix`, return `true` if the matrix is valid. Otherwise, return `false`.

## How the Solution Works

We check each row and column of the $n \times n$ matrix to verify that it contains all integers from $1$ to $n$:
1. We iterate through each index $i$ from $0$ to $n - 1$.
2. For each $i$, we initialize two sets: one for the current row $i$ and one for the current column $i$.
3. We traverse the elements of the row and column using a secondary index $j$ from $0$ to $n - 1$.
4. We verify that each visited element is within the range $[1, n]$ and has not been seen yet in the current row/column.
5. If any validation fails, we immediately return `false`.
6. If we check all rows and columns successfully, we return `true`.

## Complexity

- **Time Complexity:** $O(N^2)$ where $N$ is the dimension of the matrix, as we must visit each of the $N^2$ elements in the matrix once.
- **Space Complexity:** $O(N)$ auxiliary space to store elements of a single row and column in hash sets during validation.

[LeetCode Problem Link](https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers/)
