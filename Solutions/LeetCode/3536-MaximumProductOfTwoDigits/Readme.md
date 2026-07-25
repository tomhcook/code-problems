# Maximum Product of Two Digits

Given a positive integer `n`, return the maximum product that can be obtained by multiplying any two digits found within `n`. You are permitted to use the same digit twice if it appears more than once in the number.

## How the Solution Works

To find the maximum product of any two digits in `n`:
1. We extract the digits of `n` by continuously taking `n % 10` and dividing `n` by 10.
2. We keep track of the two largest digits (`max1` and `max2`) seen during the traversal.
3. The maximum product will simply be the product of these two largest digits.

## Complexity

- **Time Complexity:** $O(\log_{10}(n))$ since we process each digit of `n` exactly once, which corresponds to the number of digits in `n`.
- **Space Complexity:** $O(1)$ auxiliary space as we only store the two largest digits.

[LeetCode Problem Link](https://leetcode.com/problems/maximum-product-of-two-digits/)
