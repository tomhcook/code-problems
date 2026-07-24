using System;
using System.Collections.Generic;

public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val=0, ListNode next=null) {
        this.val = val;
        this.next = next;
    }
}

public class Solution {
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        dummy.next = l1;
        ListNode curr = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null || carry != 0) {
            int val = carry;
            if (l1 != null) {
                val += l1.val;
            }
            if (l2 != null) {
                val += l2.val;
            }
            
            carry = val / 10;
            val = val % 10;
            
            if (l1 != null) {
                l1.val = val;
                curr = l1;
                l1 = l1.next;
            } else if (l2 != null) {
                l2.val = val;
                curr.next = l2;
                curr = l2;
                l2 = l2.next;
            } else {
                curr.next = new ListNode(val);
                curr = curr.next;
            }
            
            if (l2 != null && l1 == null) {
                curr.next = l2;
                l1 = l2;
                l2 = null;
            }
        }
        return dummy.next;
    }

    public static ListNode ToListNode(int[] arr) {
        ListNode dummy = new ListNode();
        ListNode curr = dummy;
        foreach (int val in arr) {
            curr.next = new ListNode(val);
            curr = curr.next;
        }
        return dummy.next;
    }

    public static List<int> ToList(ListNode node) {
        List<int> res = new List<int>();
        while (node != null) {
            res.Add(node.val);
            node = node.next;
        }
        return res;
    }

    public static void Main(string[] args) {
        Solution sol = new Solution();
        var testCases = new (int[] l1, int[] l2, int[] expected)[] {
            (new int[] { 2, 4, 3 }, new int[] { 5, 6, 4 }, new int[] { 7, 0, 8 }),
            (new int[] { 0 }, new int[] { 0 }, new int[] { 0 }),
            (new int[] { 9, 9, 9, 9, 9, 9, 9 }, new int[] { 9, 9, 9, 9 }, new int[] { 8, 9, 9, 9, 0, 0, 0, 1 })
        };

        for (int i = 0; i < testCases.Length; i++) {
            var tc = testCases[i];
            ListNode l1 = ToListNode(tc.l1);
            ListNode l2 = ToListNode(tc.l2);
            ListNode resNode = sol.AddTwoNumbers(l1, l2);
            List<int> result = ToList(resNode);
            bool pass = result.Count == tc.expected.Length;
            if (pass) {
                for (int j = 0; j < result.Count; j++) {
                    if (result[j] != tc.expected[j]) {
                        pass = false;
                        break;
                    }
                }
            }
            Console.WriteLine($"Test {i + 1}: l1=[{string.Join(", ", tc.l1)}], l2=[{string.Join(", ", tc.l2)}] -> Result=[{string.Join(", ", result)}] | Expected=[{string.Join(", ", tc.expected)}] | {(pass ? "PASS" : "FAIL")}");
        }
    }
}