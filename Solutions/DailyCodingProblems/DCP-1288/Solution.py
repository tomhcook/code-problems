def balance(s: str) -> str:
    res, open_count = [], 0
    for char in s:
        if char == '(':
            open_count += 1
            res.append(char)
        elif char == ')':
            if open_count > 0:
                open_count -= 1
            else:
                res.append('(')
            res.append(char)
    return "".join(res) + ")" * open_count

if __name__ == "__main__":
    print(balance("(()"))     # Output: (())
    print(balance("))()("))   # Output: ()()()()
