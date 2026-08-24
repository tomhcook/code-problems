using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public IList<string> FindHighAccessEmployees(IList<IList<string>> access_times) {
        // Group access times by employee
        Dictionary<string, List<int>> map = new Dictionary<string, List<int>>();
        foreach (var access in access_times) {
            string name = access[0];
            string timeStr = access[1];
            // Convert to minutes: HH * 60 + MM
            int hours = int.Parse(timeStr.Substring(0, 2));
            int minutes = int.Parse(timeStr.Substring(2, 2));
            int totalMinutes = hours * 60 + minutes;
            
            if (!map.ContainsKey(name)) {
                map[name] = new List<int>();
            }
            map[name].Add(totalMinutes);
        }

        List<string> result = new List<string>();
        foreach (var pair in map) {
            string name = pair.Key;
            List<int> times = pair.Value;
            if (times.Count < 3) continue;

            times.Sort();
            
            // Check if any three access times are within a 60-minute window
            for (int i = 0; i < times.Count - 2; i++) {
                if (times[i + 2] - times[i] < 60) {
                    result.Add(name);
                    break;
                }
            }
        }
        return result;
    }

    public static void Main(string[] args) {
        Solution sol = new Solution();
        var testCases = new (IList<IList<string>> access_times, IList<string> expected)[] {
            (
                new List<IList<string>> {
                    new List<string> {"a", "0549"},
                    new List<string> {"b", "0457"},
                    new List<string> {"a", "0532"},
                    new List<string> {"a", "0621"},
                    new List<string> {"b", "0540"}
                },
                new List<string> {"a"}
            ),
            (
                new List<IList<string>> {
                    new List<string> {"d", "0002"},
                    new List<string> {"c", "0808"},
                    new List<string> {"c", "0829"},
                    new List<string> {"e", "0215"},
                    new List<string> {"d", "0100"},
                    new List<string> {"d", "0140"},
                    new List<string> {"c", "0835"}
                },
                new List<string> {"c"}
            )
        };

        for (int i = 0; i < testCases.Length; i++) {
            var tc = testCases[i];
            var result = sol.FindHighAccessEmployees(tc.access_times);
            bool pass = result.OrderBy(x => x).SequenceEqual(tc.expected.OrderBy(x => x));
            Console.WriteLine($"Test {i + 1}: -> Result=[{string.Join(", ", result)}] | Expected=[{string.Join(", ", tc.expected)}] | {(pass ? "PASS" : "FAIL")}");
        }
    }
}
