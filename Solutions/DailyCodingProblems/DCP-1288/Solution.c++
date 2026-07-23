#include <iostream>
#include <string>

std::string balance(const std::string& s) {
    std::string res = "";
    int open_count = 0;

    for (char ch : s) {
        if (ch == '(') {
            open_count++;
            res.push_back(ch);
        } 
        else if (ch == ')') {
            if (open_count > 0) {
                open_count--;
            } 
            else {
                res.push_back('(');
            }
            res.push_back(ch);
        } 
        else {
            res.push_back(ch);
        }
    }

    // Append remaining closing parentheses
    res.append(open_count, ')');

    return res;
}

int main() {
    std::cout << balance("(()") << std::endl;     // Output: (())
    std::cout << balance("))()(") << std::endl;   // Output: ()()()()
    return 0;
}