# Balanced Parentheses with Minimum Edits

This problem was asked by Facebook.

Given a string of parentheses, find the balanced string that can be produced from it using the minimum number of insertions and deletions. If there are multiple solutions, return any of them. 

For example, given `"(()"`, you could return `"(())"`. Given `"))()("`, you could return `"()()()()"`.

## How the Solution Works

We can construct a balanced string with the minimum number of edits by tracking unmatched open parentheses:
* We traverse the string from left to right.
* If a closing parenthesis `)` is encountered and there is no unmatched open parenthesis `(`, we insert a `(` directly before it.
* If there is an unmatched `(`, we match it with the `)` and decrement our unmatched open counter.
* At the end of the string, if any unmatched open parentheses `(` remain, we append the corresponding number of closing parentheses `)` to the end.

## Complexity

- **Time Complexity:** $O(N)$ where $N$ is the length of the string, as we process each character exactly once.
- **Space Complexity:** $O(N)$ to build and return the balanced string.
