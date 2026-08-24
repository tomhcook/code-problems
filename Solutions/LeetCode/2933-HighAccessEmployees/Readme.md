# High-Access Employees

You are given a 2D list of strings `access_times`, where each element is a list `[employee_name, access_time]`. An employee is classified as a **high-access** employee if they have accessed the system **three or more times** within any **one-hour period** (strictly less than 60 minutes).

Return a list of the names of high-access employees.

## How the Solution Works

1. **Group Times by Employee**: We group access times for each employee using a hash map.
2. **Convert to Minutes**: To simplify calculations, we convert the HHMM format strings into minutes since midnight (i.e., `HH * 60 + MM`).
3. **Sort Times**: We sort the list of access times chronologically for each employee.
4. **Sliding Window Check**: For each employee, we check if there exists an access index $i$ such that `times[i + 2] - times[i] < 60`. If we find such a window, it means the employee had 3 accesses within a 60-minute window, so we add their name to the output list and move on to the next employee.

## Complexity

- **Time Complexity:** $O(N \log N)$ where $N$ is the total number of accesses in the input array. Sorting the access times per employee dominates the run time.
- **Space Complexity:** $O(N)$ to store the grouped access times in the hash map.

[LeetCode Problem Link](https://leetcode.com/problems/high-access-employees/)
