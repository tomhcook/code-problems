class Solution:
    def checkValid(self, matrix: list[list[int]]) -> bool:
        n = len(matrix)
        for i in range(n):
            row_set = set()
            col_set = set()
            for j in range(n):
                # Row check
                val_row = matrix[i][j]
                if val_row < 1 or val_row > n or val_row in row_set:
                    return False
                row_set.add(val_row)
                
                # Column check
                val_col = matrix[j][i]
                if val_col < 1 or val_col > n or val_col in col_set:
                    return False
                col_set.add(val_col)
        return True

if __name__ == '__main__':
    sol = Solution()
    test_cases = [
        ([[1, 2, 3], [3, 1, 2], [2, 3, 1]], True),
        ([[1, 1, 1], [1, 2, 3], [1, 2, 3]], False)
    ]
    for idx, (matrix, expected) in enumerate(test_cases, 1):
        result = sol.checkValid(matrix)
        print(f"Test {idx}: -> Result={result} | Expected={expected} | {'PASS' if result == expected else 'FAIL'}")
