class Solution:
    def palindromePairs(self, words: list[str]) -> list[list[int]]:
        word_to_idx = {w: i for i, w in enumerate(words)}
        res = []
        
        for i, word in enumerate(words):
            n = len(word)
            for j in range(n + 1):
                pref = word[:j]
                suff = word[j:]
                if pref == pref[::-1]:
                    rev_suff = suff[::-1]
                    if rev_suff in word_to_idx and word_to_idx[rev_suff] != i:
                        res.append([word_to_idx[rev_suff], i])
                if suff != "" and suff == suff[::-1]:
                    rev_pref = pref[::-1]
                    if rev_pref in word_to_idx and word_to_idx[rev_pref] != i:
                        res.append([i, word_to_idx[rev_pref]])
        return res

if __name__ == '__main__':
    sol = Solution()
    test_cases = [
        (["abcd", "dcba", "lls", "s", "sssll"], [[0, 1], [1, 0], [3, 2], [2, 4]]),
        (["bat", "tab", "cat"], [[0, 1], [1, 0]]),
        (["a", ""], [[0, 1], [1, 0]])
    ]
    for idx, (words, expected) in enumerate(test_cases, 1):
        result = sol.palindromePairs(words)
        print(f"Test {idx}: words={words} -> Result={result} | Expected={expected} | {'PASS' if sorted(result) == sorted(expected) else 'FAIL'}")
