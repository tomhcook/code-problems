from typing import List

class Solution:
    def UniqueXorTriplets(self, nums: List[int]) -> int:
        # Since nums[i] <= 1500, the maximum possible XOR value is < 2048
        limit = 2048
        
        # s1 tracks all pair XORs (nums[i] ^ nums[j]) for i <= j
        s1 = [False] * limit
        n = len(nums)
        for i in range(n):
            for j in range(i, n):
                s1[nums[i] ^ nums[j]] = True
                
        # s2 tracks all triplet XORs (pair_xor ^ nums[k])
        s2 = [False] * limit
        for x in range(limit):
            if s1[x]:
                for num in nums:
                    s2[x ^ num] = True
                    
        return sum(s2)

if __name__ == "__main__":
    sol = Solution()
    print("Example [1, 3, 5] Unique Triplet XOR Count:", sol.UniqueXorTriplets([1, 3, 5]))
