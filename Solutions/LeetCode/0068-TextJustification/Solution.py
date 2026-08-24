class Solution:
    def fullJustify(self, words: list[str], maxWidth: int) -> list[str]:
        res, cur, num_of_letters = [], [], 0
        for w in words:
            if num_of_letters + len(w) + len(cur) > maxWidth:
                for i in range(maxWidth - num_of_letters):
                    cur[i % (len(cur) - 1 or 1)] += ' '
                res.append(''.join(cur))
                cur, num_of_letters = [], 0
            cur.append(w)
            num_of_letters += len(w)
        return res + [' '.join(cur).ljust(maxWidth)]

if __name__ == '__main__':
    sol = Solution()
    test_cases = [
        (
            ["This", "is", "an", "example", "of", "text", "justification."],
            16,
            [
                "This    is    an",
                "example  of text",
                "justification.  "
            ]
        ),
        (
            ["What", "must", "be", "acknowledgment", "shall", "be"],
            16,
            [
                "What   must   be",
                "acknowledgment  ",
                "shall be        "
            ]
        )
    ]
    for idx, (words, max_width, expected) in enumerate(test_cases, 1):
        result = sol.fullJustify(words, max_width)
        pass_status = result == expected
        print(f"Test {idx}: -> {'PASS' if pass_status else 'FAIL'}")
        if not pass_status:
            print(f"Result:   {result}")
            print(f"Expected: {expected}")
