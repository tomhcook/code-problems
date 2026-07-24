from typing import Dict, List

def pagerank(
    graph: Dict[str, List[str]], 
    d: float = 0.85, 
    tol: float = 1e-6, 
    max_iter: int = 100
) -> Dict[str, float]:
    """
    Calculates the PageRank score for each website in a directed graph.
    
    :param graph: A dictionary representing the directed graph where keys are source
                  nodes and values are lists of target nodes.
    :param d: The damping factor (probability of continuing to click links).
    :param tol: The convergence tolerance threshold.
    :param max_iter: The maximum number of iterations.
    :return: A dictionary mapping each node to its PageRank score.
    """
    # Collect all unique nodes in the graph
    nodes = set(graph.keys())
    for targets in graph.values():
        nodes.update(targets)
        
    N = len(nodes)
    if N == 0:
        return {}
        
    # Initialize all ranks to 1/N
    ranks = {node: 1.0 / N for node in nodes}
    
    # Calculate outdegree for all nodes
    outdegree = {node: len(graph.get(node, [])) for node in nodes}
    
    # Calculate incoming links for all nodes
    incoming = {node: set() for node in nodes}
    for src, targets in graph.items():
        for dst in targets:
            incoming[dst].add(src)
            
    # Identify dangling nodes (outdegree = 0)
    dangling_nodes = [node for node in nodes if outdegree[node] == 0]
    
    for _ in range(max_iter):
        new_ranks = {}
        # Sum of ranks of all dangling nodes
        dangling_sum = sum(ranks[node] for node in dangling_nodes)
        
        for node in nodes:
            # Base (1 - d) / N + d * (rank of dangling nodes redistributed equally)
            rank_sum = dangling_sum / N
            
            # Add contributions from incoming pages
            for src in incoming[node]:
                rank_sum += ranks[src] / outdegree[src]
                
            new_ranks[node] = (1.0 - d) / N + d * rank_sum
            
        # Check convergence
        diff = max(abs(new_ranks[node] - ranks[node]) for node in nodes)
        ranks = new_ranks
        if diff < tol:
            break
            
    return ranks

if __name__ == "__main__":
    # Test Case 1: Simple cycle A <-> B
    print("Test 1: Simple Cycle (A <-> B)")
    g1 = {
        "A": ["B"],
        "B": ["A"]
    }
    r1 = pagerank(g1)
    for node, rank in sorted(r1.items()):
        print(f"  {node}: {rank:.4f}")
        
    # Test Case 2: Chain with a dangling node A -> B -> C
    print("\nTest 2: Chain (A -> B -> C)")
    g2 = {
        "A": ["B"],
        "B": ["C"]
    }
    r2 = pagerank(g2)
    for node, rank in sorted(r2.items()):
        print(f"  {node}: {rank:.4f}")

    # Test Case 3: Star Graph (A links to B, C, D)
    print("\nTest 3: Star Graph (A -> B, C, D)")
    g3 = {
        "A": ["B", "C", "D"]
    }
    r3 = pagerank(g3)
    for node, rank in sorted(r3.items()):
        print(f"  {node}: {rank:.4f}")

    # Test Case 4: Disconnected components (A -> B) and (C -> D)
    print("\nTest 4: Disconnected Components (A -> B, C -> D)")
    g4 = {
        "A": ["B"],
        "C": ["D"]
    }
    r4 = pagerank(g4)
    for node, rank in sorted(r4.items()):
        print(f"  {node}: {rank:.4f}")
