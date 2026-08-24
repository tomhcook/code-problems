# Text Justification

Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces `' '` when necessary so that each line has exactly `maxWidth` characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

## How the Solution Works

1. **Greedy Grouping**: We iterate through `words` to determine how many words can fit into the current line such that the sum of their lengths plus at least one space between adjacent words is less than or equal to `maxWidth`.
2. **Line Justification**:
   - If a line contains only one word or if it is the last line, we **left-justify** the words by appending a single space between them and padding the rest of the line with spaces on the right.
   - For all other lines, we calculate the total spaces to distribute: `spaces = maxWidth - length_of_all_words`. We then distribute them among the gaps (`words_in_line - 1`) evenly using integer division and mod arithmetic. Gaps on the left receive an extra space if `spaces % gaps > 0`.
3. We append the constructed line to the result and proceed with the remaining words.

## Complexity

- **Time Complexity:** $O(L)$ where $L$ is the total number of characters across all words, as we process each word and character a constant number of times.
- **Space Complexity:** $O(M)$ auxiliary space where $M$ is `maxWidth` to store characters of the current line in buffer/builder.

[LeetCode Problem Link](https://leetcode.com/problems/text-justification/)
