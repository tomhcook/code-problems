using System;
using System.Collections.Generic;

public class Solution {
    public int MaxProduct(int n) {
        int max1 = 0;
        int max2 = 0;
        while (n > 0) {
            int digit = n % 10;
            if (digit > max1) {
                max2 = max1;
                max1 = digit;
            } else if (digit > max2) {
                max2 = digit;
            }
            n /= 10;
        }
        return max1 * max2;
    }

    public static void Main(string[] args) {
        Solution sol = new Solution();
        var testCases = new (int n, int expected)[] {
            (31, 3),
            (22, 4),
            (124, 8)
        };

        for (int idx = 0; idx < testCases.Length; idx++) {
            var tc = testCases[idx];
            int result = sol.MaxProduct(tc.n);
            Console.WriteLine($"Test {idx + 1}: n={tc.n} -> Result={result} | Expected={tc.expected} | {(result == tc.expected ? "PASS" : "FAIL")}");
        }
    }
}
