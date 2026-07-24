using System;
using System.Collections.Generic;
using System.Linq;

class Solution
{
    public static Dictionary<string, double> PageRank(
        Dictionary<string, List<string>> graph, 
        double d = 0.85, 
        double tol = 1e-6, 
        int maxIter = 100)
    {
        // Gather all unique nodes in the graph
        var nodes = new HashSet<string>(graph.Keys);
        foreach (var targets in graph.Values)
        {
            foreach (var node in targets)
            {
                nodes.Add(node);
            }
        }

        int N = nodes.Count;
        if (N == 0) return new Dictionary<string, double>();

        // Initialize ranks to 1/N
        var ranks = nodes.ToDictionary(node => node, node => 1.0 / N);
        
        // Compute outdegrees
        var outdegree = nodes.ToDictionary(
            node => node, 
            node => graph.ContainsKey(node) ? graph[node].Count : 0
        );
        
        // Map incoming links
        var incoming = nodes.ToDictionary(node => node, node => new HashSet<string>());
        foreach (var kvp in graph)
        {
            string src = kvp.Key;
            foreach (var dst in kvp.Value)
            {
                incoming[dst].Add(src);
            }
        }

        // Identify dangling nodes
        var danglingNodes = nodes.Where(node => outdegree[node] == 0).ToList();

        for (int iter = 0; iter < maxIter; iter++)
        {
            var newRanks = new Dictionary<string, double>();
            double danglingSum = danglingNodes.Sum(node => ranks[node]);

            foreach (var node in nodes)
            {
                double rankSum = danglingSum / N;

                foreach (var src in incoming[node])
                {
                    rankSum += ranks[src] / outdegree[src];
                }

                newRanks[node] = (1.0 - d) / N + d * rankSum;
            }

            // Check convergence
            double maxDiff = nodes.Max(node => Math.Abs(newRanks[node] - ranks[node]));
            ranks = newRanks;

            if (maxDiff < tol)
            {
                break;
            }
        }

        return ranks;
    }

    static void Main()
    {
        // Test Case 1: Simple cycle A <-> B
        Console.WriteLine("Test 1: Simple Cycle (A <-> B)");
        var g1 = new Dictionary<string, List<string>>
        {
            { "A", new List<string> { "B" } },
            { "B", new List<string> { "A" } }
        };
        var r1 = PageRank(g1);
        foreach (var kvp in r1.OrderBy(x => x.Key))
        {
            Console.WriteLine($"  {kvp.Key}: {kvp.Value:F4}");
        }

        // Test Case 2: Chain with a dangling node A -> B -> C
        Console.WriteLine("\nTest 2: Chain (A -> B -> C)");
        var g2 = new Dictionary<string, List<string>>
        {
            { "A", new List<string> { "B" } },
            { "B", new List<string> { "C" } }
        };
        var r2 = PageRank(g2);
        foreach (var kvp in r2.OrderBy(x => x.Key))
        {
            Console.WriteLine($"  {kvp.Key}: {kvp.Value:F4}");
        }

        // Test Case 3: Star Graph (A links to B, C, D)
        Console.WriteLine("\nTest 3: Star Graph (A -> B, C, D)");
        var g3 = new Dictionary<string, List<string>>
        {
            { "A", new List<string> { "B", "C", "D" } }
        };
        var r3 = PageRank(g3);
        foreach (var kvp in r3.OrderBy(x => x.Key))
        {
            Console.WriteLine($"  {kvp.Key}: {kvp.Value:F4}");
        }

        // Test Case 4: Disconnected components (A -> B) and (C -> D)
        Console.WriteLine("\nTest 4: Disconnected Components (A -> B, C -> D)");
        var g4 = new Dictionary<string, List<string>>
        {
            { "A", new List<string> { "B" } },
            { "C", new List<string> { "D" } }
        };
        var r4 = PageRank(g4);
        foreach (var kvp in r4.OrderBy(x => x.Key))
        {
            Console.WriteLine($"  {kvp.Key}: {kvp.Value:F4}");
        }
    }
}
