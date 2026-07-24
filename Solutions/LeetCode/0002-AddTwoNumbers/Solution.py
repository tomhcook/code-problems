from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = l1
        curr = dummy
        carry = 0
        
        while l1 or l2 or carry:
            val = carry
            if l1:
                val += l1.val
            if l2:
                val += l2.val
                
            carry, val = divmod(val, 10)
            
            if l1:
                l1.val = val
                curr = l1
                l1 = l1.next
                if l2:
                    l2 = l2.next
            elif l2:
                l2.val = val
                curr.next = l2
                curr = l2
                l2 = l2.next
            else:
                curr.next = ListNode(val)
                curr = curr.next
                
            if l2 and not l1:
                curr.next = l2
                l1 = l2
                l2 = None
                
        return dummy.next

def to_list_node(lst):
    dummy = ListNode()
    curr = dummy
    for val in lst:
        curr.next = ListNode(val)
        curr = curr.next
    return dummy.next

def to_array(node):
    res = []
    while node:
        res.append(node.val)
        node = node.next
    return res

if __name__ == '__main__':
    sol = Solution()
    test_cases = [
        ([2, 4, 3], [5, 6, 4], [7, 0, 8]),
        ([0], [0], [0]),
        ([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9], [8, 9, 9, 9, 0, 0, 0, 1])
    ]
    for idx, (l1_arr, l2_arr, expected) in enumerate(test_cases, 1):
        l1 = to_list_node(l1_arr)
        l2 = to_list_node(l2_arr)
        res_node = sol.addTwoNumbers(l1, l2)
        result = to_array(res_node)
        print(f"Test {idx}: l1={l1_arr}, l2={l2_arr} -> Result={result} | Expected={expected} | {'PASS' if result == expected else 'FAIL'}")