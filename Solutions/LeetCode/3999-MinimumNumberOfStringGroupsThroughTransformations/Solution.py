from typing import List

class Solution:
    def getMinRotation(self, s: str) -> str:
        n = len(s)
        if n <= 1:
            return s
        
        doubled = s + s
        i, j, k = 0, 1, 0
        
        while i < n and j < n and k < n:
            diff = ord(doubled[i + k]) - ord(doubled[j + k])
            if diff == 0:
                k += 1
            else:
                if diff > 0:
                    i = max(i + k + 1, j + 1)
                else:
                    j = max(j + k + 1, i + 1)
                k = 0
                
        start = min(i, j)
        return doubled[start : start + n]

    def minimumGroups(self, words: List[str]) -> int:
        uniqueSignatures = set()
        
        for word in words:
            evenSubseq = word[0::2]
            oddSubseq = word[1::2]
            canonEven = self.getMinRotation(evenSubseq)
            canonOdd = self.getMinRotation(oddSubseq)
            signature = (canonEven, canonOdd)
            uniqueSignatures.add(signature)
            
        return len(uniqueSignatures)

if __name__ == '__main__':
    sol = Solution()
    testCases = [
        (["ntgwz", "zwntg"], 1),
        (["abc", "cab", "bac", "acb", "bca", "cba"], 3),
        (["leet", "abb", "bab", "deed", "edde", "code", "bba"], 5)
    ]
    for idx, (words, expected) in enumerate(testCases, 1):
        result = sol.minimumGroups(words)
        print(f"Test {idx}: words={words} -> Result={result} | Expected={expected} | {'PASS' if result == expected else 'FAIL'}")
