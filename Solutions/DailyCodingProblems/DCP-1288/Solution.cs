using System;
using System.Text;

class Program
{
    public static string Balance(string s)
    {
        var res = new StringBuilder();
        int openCount = 0;

        foreach (char ch in s)
        {
            if (ch == '(')
            {
                openCount++;
                res.Append(ch);
            }
            else if (ch == ')')
            {
                if (openCount > 0)
                {
                    openCount--;
                }
                else
                {
                    res.Append('(');
                }
                res.Append(ch);
            }
            else
            {
                res.Append(ch);
            }
        }

        // Append remaining closing parentheses for any unmatched opening ones
        res.Append(')', openCount);

        return res.ToString();
    }

    static void Main()
    {
        Console.WriteLine(Balance("(()"));     // Output: (())
        Console.WriteLine(Balance("))()("));   // Output: ()()()()
    }
}