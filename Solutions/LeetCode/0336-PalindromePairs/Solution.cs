using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    private bool IsPalindrome(string s, int left, int right) {
        while (left < right) {
            if (s[left++] != s[right--]) {
                return false;
            }
        }
        return true;
    }

    public IList<IList<int>> PalindromePairs(string[] words) {
        var res = new List<IList<int>>();
        var wordToIdx = new Dictionary<string, int>();
        for (int i = 0; i < words.Length; i++) {
            wordToIdx[words[i]] = i;
        }

        for (int i = 0; i < words.Length; i++) {
            string word = words[i];
            int n = word.Length;
            for (int j = 0; j <= n; j++) {
                // Case 1: Prefix is a palindrome, check if reversed suffix is in dictionary
                if (IsPalindrome(word, 0, j - 1)) {
                    char[] suffixArr = word.Substring(j).ToCharArray();
                    Array.Reverse(suffixArr);
                    string revSuff = new string(suffixArr);
                    if (wordToIdx.TryGetValue(revSuff, out int idx) && idx != i) {
                        res.Add(new List<int> { idx, i });
                    }
                }

                // Case 2: Suffix is a palindrome, check if reversed prefix is in dictionary
                // j < n to avoid duplicates (suffix must be non-empty)
                if (j < n && IsPalindrome(word, j, n - 1)) {
                    char[] prefixArr = word.Substring(0, j).ToCharArray();
                    Array.Reverse(prefixArr);
                    string revPref = new string(prefixArr);
                    if (wordToIdx.TryGetValue(revPref, out int idx) && idx != i) {
                        res.Add(new List<int> { i, idx });
                    }
                }
            }
        }

        return res;
    }

    public static void Main(string[] args) {
        Solution sol = new Solution();
        var testCases = new (string[] words, int[][] expected)[] {
            (new string[] { "abcd", "dcba", "lls", "s", "sssll" }, new int[][] { new int[] { 0, 1 }, new int[] { 1, 0 }, new int[] { 3, 2 }, new int[] { 2, 4 } }),
            (new string[] { "bat", "tab", "cat" }, new int[][] { new int[] { 0, 1 }, new int[] { 1, 0 } }),
            (new string[] { "a", "" }, new int[][] { new int[] { 0, 1 }, new int[] { 1, 0 } })
        };

        for (int idx = 0; idx < testCases.Length; idx++) {
            var tc = testCases[idx];
            var result = sol.PalindromePairs(tc.words);
            
            // Compare results
            bool pass = true;
            if (result.Count != tc.expected.Length) {
                pass = false;
            } else {
                var resSorted = result.Select(r => string.Join(",", r.OrderBy(x => x))).OrderBy(x => x).ToList();
                var expSorted = tc.expected.Select(e => string.Join(",", e.OrderBy(x => x))).OrderBy(x => x).ToList();
                for (int i = 0; i < resSorted.Count; i++) {
                    if (resSorted[i] != expSorted[i]) {
                        pass = false;
                        break;
                    }
                }
            }

            Console.WriteLine($"Test {idx + 1}: words=[{string.Join(", ", tc.words)}] -> ResultCount={result.Count} | Pass={pass}");
        }
    }
}
