# Palindrome Pairs

Given a list of unique words, find all pairs of distinct indices `(i, j)` in the given list, so that the concatenation of the two words, i.e., `words[i] + words[j]` is a palindrome.

## How the Solution Works

A brute-force solution checks all pairs, which takes $O(N^2 \cdot L)$ time (where $N$ is the number of words and $L$ is the maximum length of a word). This is too slow for the constraints ($N \le 5000$).

An optimal approach uses a **Hash Map** to store each word and its index, allowing $O(1)$ lookup time:
1. We populate a hash map mapping each word to its index.
2. For each word `words[i]`, we split it into all possible prefixes and suffixes `word[:j]` and `word[j:]` for $j \in [0, L]$.
3. For each split:
   * **Case 1:** If the prefix is a palindrome, we check if the reverse of the suffix exists in our hash map. If it does (and is not `i`), then `reversed(suffix) + word` (i.e. `words[idx] + words[i]`) forms a palindrome.
   * **Case 2:** If the suffix is a palindrome, we check if the reverse of the prefix exists in our hash map. If it does (and is not `i`), then `word + reversed(prefix)` (i.e. `words[i] + words[idx]`) forms a palindrome. To avoid double-counting the full-word reverse pairs (which are handled when the prefix is empty in Case 1), we only apply Case 2 when the suffix is non-empty (`j < L`).

## Complexity

- **Time Complexity:** $O(N \cdot L^2)$ where $N$ is the number of words and $L$ is the maximum length of a word. For each of the $N$ words, we perform $L$ splits, and checking for palindrome and slicing takes $O(L)$ time.
- **Space Complexity:** $O(N \cdot L)$ to store all words and their indices in the hash map.

[LeetCode Problem Link](https://leetcode.com/problems/palindrome-pairs/)
