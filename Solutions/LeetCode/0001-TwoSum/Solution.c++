#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int remaining = target - nums[i];
            if (seen.find(remaining) != seen.end()) {
                return {seen[remaining], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};
