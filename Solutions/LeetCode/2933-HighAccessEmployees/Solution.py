class Solution:
    def findHighAccessEmployees(self, access_times: list[list[str]]) -> list[str]:
        # Group access times by employee
        grouped = {}
        for name, time_str in access_times:
            # Convert HHMM to minutes since midnight
            total_minutes = int(time_str[:2]) * 60 + int(time_str[2:])
            if name not in grouped:
                grouped[name] = []
            grouped[name].append(total_minutes)
        
        result = []
        for name, times in grouped.items():
            if len(times) < 3:
                continue
            
            times.sort()
            
            # Check sliding window of size 3
            for i in range(len(times) - 2):
                if times[i + 2] - times[i] < 60:
                    result.append(name)
                    break
        return result

if __name__ == '__main__':
    sol = Solution()
    test_cases = [
        ([["a", "0549"], ["b", "0457"], ["a", "0532"], ["a", "0621"], ["b", "0540"]], ["a"]),
        ([["d", "0002"], ["c", "0808"], ["c", "0829"], ["e", "0215"], ["d", "0100"], ["d", "0140"], ["c", "0835"]], ["c"])
    ]
    for idx, (access_times, expected) in enumerate(test_cases, 1):
        result = sol.findHighAccessEmployees(access_times)
        print(f"Test {idx}: -> Result={result} | Expected={expected} | {'PASS' if sorted(result) == sorted(expected) else 'FAIL'}")
