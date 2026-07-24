using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        Dictionary<int, int> seen = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int remaining = target - nums[i];
            if (seen.ContainsKey(remaining)) {
                return new int[] { seen[remaining], i };
            }
            seen[nums[i]] = i;
        }
        return new int[0];
    }

    public static void Main(string[] args) {
        Solution sol = new Solution();
        var testCases = new (int[] nums, int target, int[] expected)[] {
            (new int[] { 2, 7, 11, 15 }, 9, new int[] { 0, 1 }),
            (new int[] { 3, 2, 4 }, 6, new int[] { 1, 2 }),
            (new int[] { 3, 3 }, 6, new int[] { 0, 1 })
        };

        for (int i = 0; i < testCases.Length; i++) {
            var tc = testCases[i];
            int[] result = sol.TwoSum(tc.nums, tc.target);
            bool pass = result.OrderBy(x => x).SequenceEqual(tc.expected.OrderBy(x => x));
            Console.WriteLine($"Test {i + 1}: nums=[{string.Join(", ", tc.nums)}], target={tc.target} -> Result=[{string.Join(", ", result)}] | Expected=[{string.Join(", ", tc.expected)}] | {(pass ? "PASS" : "FAIL")}");
        }
    }
}
