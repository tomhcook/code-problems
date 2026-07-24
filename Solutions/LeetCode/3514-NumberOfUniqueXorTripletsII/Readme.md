# Number of Unique XOR Triplets II

Given an integer array `nums`, a XOR triplet is defined as the XOR of three elements `nums[i] XOR nums[j] XOR nums[k]` where `i <= j <= k`.

Return the number of unique XOR values that can be formed by these triplets.

## Difficulty: Medium

## How the Solution Works

Given the constraints ($N \le 1500$, $nums[i] \le 1500$):
1. **Bounded XOR Value:** The maximum value in `nums` is 1500. The next power of two is 2048. Since XORing numbers under 2048 results in a value under 2048, all possible XOR triplet values will be strictly less than 2048.
2. **Step 1 (Pairs):** We use a boolean array `s1` of size 2048 to track all possible XORs of two elements `nums[i] ^ nums[j]` for $i \le j$.
3. **Step 2 (Triplets):** We use another boolean array `s2` of size 2048 to track all possible XORs of three elements. For every XOR value `x` in `s1` that is possible, and for every `num` in `nums`, we set `s2[x ^ num] = True`.
4. **Result:** The sum of `True` values in `s2` is our answer.

## Complexity

- **Time Complexity:** $O(N^2 + N \cdot M)$ where $N$ is the length of `nums` and $M = 2048$ (the maximum possible XOR value).
- **Space Complexity:** $O(M)$ to store the boolean arrays.
