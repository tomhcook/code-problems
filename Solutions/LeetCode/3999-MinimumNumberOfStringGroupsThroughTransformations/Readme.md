# Minimum Number of String Groups Through Transformations

You are given an array of strings `words`. A transformation on a string `s` is defined by:
1. Extracting the subsequence of characters at even indices (`E`) and odd indices (`O`).
2. Independently cyclically shifting `E` and `O` by any number of positions to the right.
3. Reconstructing the string by placing the shifted characters back into their respective even/odd positions.

Two strings are equivalent if one can be transformed into the other by a single transformation. The goal is to partition the `words` into the minimum number of groups such that all strings in a group are equivalent.

## How the Solution Works

We can solve this problem in $O(N \cdot L)$ time with an **optimal approach**:
* For each word, we extract the characters at even indices (`E`) and odd indices (`O`) to form two separate subsequences.
* We find the lexicographically smallest cyclic rotation (canonical representation) for `E` and `O` independently (using Booth's algorithm or linear rotation comparisons).
* We combine the two canonical sequences into a unified key, e.g. `(canonical_E, canonical_O)`.
* By putting these keys in a hash set, the size of the set gives the minimum number of groups.

## Complexity

- **Time Complexity:** $O(N \cdot L)$ where $N$ is the number of words and $L$ is the max length of a word.
- **Space Complexity:** $O(N \cdot L)$ to store the canonical representations in a hash set.

⚡ **Optimal Approach**

[LeetCode Problem Link](https://leetcode.com/problems/minimum-number-of-string-groups-through-transformations/)
