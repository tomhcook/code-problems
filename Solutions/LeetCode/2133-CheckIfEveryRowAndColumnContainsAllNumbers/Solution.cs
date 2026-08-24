using System;
using System.Collections.Generic;

public class Solution {
    public bool CheckValid(int[][] matrix) {
        int n = matrix.Length;
        int[] rowVisited = new int[n + 1];
        int[] colVisited = new int[n + 1];

        for (int i = 0; i < n; i++) {
            int marker = i + 1;
            for (int j = 0; j < n; j++) {
                // Check row element
                int rowVal = matrix[i][j];
                if (rowVal < 1 || rowVal > n || rowVisited[rowVal] == marker) {
                    return false;
                }
                rowVisited[rowVal] = marker;

                // Check column element
                int colVal = matrix[j][i];
                if (colVal < 1 || colVal > n || colVisited[colVal] == marker) {
                    return false;
                }
                colVisited[colVal] = marker;
            }
        }
        return true;
    }

    public static void Main(string[] args) {
        Solution sol = new Solution();
        var testCases = new (int[][] matrix, bool expected)[] {
            (new int[][] {
                new int[] {1, 2, 3},
                new int[] {3, 1, 2},
                new int[] {2, 3, 1}
            }, true),
            (new int[][] {
                new int[] {1, 1, 1},
                new int[] {1, 2, 3},
                new int[] {1, 2, 3}
            }, false)
        };

        for (int i = 0; i < testCases.Length; i++) {
            var tc = testCases[i];
            bool result = sol.CheckValid(tc.matrix);
            Console.WriteLine($"Test {i + 1}: -> Result={result} | Expected={tc.expected} | {(result == tc.expected ? "PASS" : "FAIL")}");
        }
    }
}
