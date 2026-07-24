# Add Two Numbers

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

## How the Solution Works

We can solve this problem in $O(N)$ time with an **in-place** optimal approach:
* We traverse both linked lists node-by-node, adding corresponding digits along with a `carry` from the previous sum.
* **In-place Optimization (Memory Efficient)**: Instead of allocating memory for a new list ($O(N)$ auxiliary space), we reuse the nodes of the input list `l1` to store the sum values. 
* If `l1` is shorter than `l2`, we dynamically redirect the traversal pointer to reuse the remaining nodes of `l2`.
* We allocate a new node only in the rare case of a final carry overflow at the end (e.g. $99 + 1 = 100$). This ensures we avoid extra garbage collection and keep the memory footprint extremely low.

## Complexity

- **Time Complexity:** $O(N)$ where $N = \max(\text{len}(l1), \text{len}(l2))$, as we traverse the nodes of the lists at most once.
- **Space Complexity:** $O(N)$ to represent the return value list, but **$O(1)$ Auxiliary Space** because we reuse the input nodes in-place rather than allocating a new list.

⚡ **Optimal Approach** (Minimal Memory Footprint)

[LeetCode Problem Link](https://leetcode.com/problems/add-two-numbers/)
