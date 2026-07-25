class Solution:
    def maxProduct(self, n: int) -> int:
        digits = []
        while n > 0:
            digits.append(n % 10)
            n //= 10
        digits.sort(reverse=True)
        return digits[0] * digits[1]

if __name__ == '__main__':
    sol = Solution()
    test_cases = [
        (31, 3),
        (22, 4),
        (124, 8)
    ]
    for idx, (n, expected) in enumerate(test_cases, 1):
        result = sol.maxProduct(n)
        print(f"Test {idx}: n={n} -> Result={result} | Expected={expected} | {'PASS' if result == expected else 'FAIL'}")
