# Two Sum

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

## How the Solution Works

We can solve this problem in $O(N)$ time by using a hash map to keep track of numbers we have already seen along with their indices:
* We traverse the array from left to right.
* For each number, we calculate the `remaining` complement needed to reach the `target` (`target - num`).
* We check if this complement exists in our hash map:
  * If it does, we return the indices of the complement and the current number.
  * If it does not, we add the current number and its index to the hash map.

## Complexity

- **Time Complexity:** $O(N)$ where $N$ is the number of elements in the array, as we traverse the list of numbers only once and hash map lookups take $O(1)$ time on average.
- **Space Complexity:** $O(N)$ to store the numbers and their indices in the hash map.
