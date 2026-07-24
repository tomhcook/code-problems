class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            remaining = target - num
            if remaining in seen:
                return [seen[remaining], i]
            seen[num] = i
        return []

if __name__ == '__main__':
    sol = Solution()
    test_cases = [
        ([2, 7, 11, 15], 9, [0, 1]),
        ([3, 2, 4], 6, [1, 2]),
        ([3, 3], 6, [0, 1])
    ]
    for idx, (nums, target, expected) in enumerate(test_cases, 1):
        result = sol.twoSum(nums, target)
        print(f"Test {idx}: nums={nums}, target={target} -> Result={result} | Expected={expected} | {'PASS' if sorted(result) == sorted(expected) else 'FAIL'}")