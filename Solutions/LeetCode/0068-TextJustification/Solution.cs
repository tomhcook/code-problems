using System;
using System.Collections.Generic;
using System.Text;

public class Solution {
    public IList<string> FullJustify(string[] words, int maxWidth) {
        List<string> result = new List<string>();
        int i = 0;
        
        while (i < words.Length) {
            int lineLength = words[i].Length;
            int last = i + 1;
            while (last < words.Length) {
                if (lineLength + 1 + words[last].Length > maxWidth) break;
                lineLength += 1 + words[last].Length;
                last++;
            }
            
            StringBuilder sb = new StringBuilder();
            int diff = last - i - 1; // number of gaps
            
            // If it's the last line or there's only 1 word in the line
            if (last == words.Length || diff == 0) {
                for (int j = i; j < last; j++) {
                    sb.Append(words[j]);
                    if (j < last - 1) sb.Append(' ');
                }
                while (sb.Length < maxWidth) {
                    sb.Append(' ');
                }
            } else {
                // Fully justified
                int spaces = (maxWidth - (lineLength - diff));
                int r = spaces % diff;
                int q = spaces / diff;
                
                for (int j = i; j < last; j++) {
                    sb.Append(words[j]);
                    if (j < last - 1) {
                        int limit = q + (j - i < r ? 1 : 0);
                        for (int k = 0; k < limit; k++) {
                            sb.Append(' ');
                        }
                    }
                }
            }
            
            result.Add(sb.ToString());
            i = last;
        }
        
        return result;
    }

    public static void Main(string[] args) {
        Solution sol = new Solution();
        var testCases = new (string[] words, int maxWidth, string[] expected)[] {
            (
                new string[] {"This", "is", "an", "example", "of", "text", "justification."},
                16,
                new string[] {
                    "This    is    an",
                    "example  of text",
                    "justification.  "
                }
            ),
            (
                new string[] {"What", "must", "be", "acknowledgment", "shall", "be"},
                16,
                new string[] {
                    "What   must   be",
                    "acknowledgment  ",
                    "shall be        "
                }
            )
        };

        for (int i = 0; i < testCases.Length; i++) {
            var tc = testCases[i];
            var result = sol.FullJustify(tc.words, tc.maxWidth);
            bool pass = result.Count == tc.expected.Length;
            if (pass) {
                for (int j = 0; j < result.Count; j++) {
                    if (result[j] != tc.expected[j]) pass = false;
                }
            }
            Console.WriteLine($"Test {i + 1}: -> {(pass ? "PASS" : "FAIL")}");
            if (!pass) {
                Console.WriteLine("Result:");
                foreach (var line in result) Console.WriteLine($"\"{line}\"");
                Console.WriteLine("Expected:");
                foreach (var line in tc.expected) Console.WriteLine($"\"{line}\"");
            }
        }
    }
}
