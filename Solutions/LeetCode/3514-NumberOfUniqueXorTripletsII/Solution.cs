using System;

public class Solution
{
    public int UniqueXorTriplets(int[] nums)
    {
        int limit = 2048;
        
        // s1 tracks all pair XORs (nums[i] ^ nums[j]) for i <= j
        bool[] s1 = new bool[limit];
        int n = nums.Length;
        for (int i = 0; i < n; i++)
        {
            for (int j = i; j < n; j++)
            {
                s1[nums[i] ^ nums[j]] = true;
            }
        }
        
        // s2 tracks all triplet XORs (pair_xor ^ nums[k])
        bool[] s2 = new bool[limit];
        for (int x = 0; x < limit; x++)
        {
            if (s1[x])
            {
                foreach (int num in nums)
                {
                    s2[x ^ num] = true;
                }
            }
        }
        
        int count = 0;
        for (int i = 0; i < limit; i++)
        {
            if (s2[i]) count++;
        }
        
        return count;
    }

    static void Main()
    {
        var sol = new Solution();
        int result = sol.UniqueXorTriplets(new int[] { 1, 3, 5 });
        Console.WriteLine("Example [1, 3, 5] Unique Triplet XOR Count: " + result);
    }
}
