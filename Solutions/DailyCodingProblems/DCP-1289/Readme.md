# PageRank Algorithm

This problem was asked by Google.

PageRank is an algorithm used by Google to rank the importance of different websites. While there have been changes over the years, the central idea is to assign each site a score based on the importance of other pages that link to that page.

More mathematically, suppose there are $N$ sites, and each site $i$ has a certain count $C_i$ of outgoing links. Then the score for a particular site $S_j$ is defined as:

$$\text{score}(S_j) = \frac{1 - d}{N} + d \times \left( \frac{\text{score}(S_x)}{C_x} + \frac{\text{score}(S_y)}{C_y} + \dots + \frac{\text{score}(S_z)}{C_z} \right)$$

Here, $S_x, S_y, \dots, S_z$ denote the scores of all the other sites that have outgoing links to $S_j$, and $d$ is a damping factor, usually set to around 0.85, used to model the probability that a user will stop searching.

Given a directed graph of links between various websites, write a program that calculates each site's page rank.

## Difficulty: Hard

## How the Solution Works

We implement the **Power Iteration** method to calculate the PageRank:
1. **Graph Representation:** We represent the graph as an adjacency list of outgoing links.
2. **Dangling Nodes:** Nodes with no outgoing links ($C_i = 0$) are treated as linking to all nodes in the graph to prevent the rank from leaking/disappearing.
3. **Iterative Update:** 
   - Initialize the rank of all $N$ pages to $1/N$.
   - In each iteration, compute the new ranks based on the incoming ranks and distribute dangling node ranks equally.
   - Continue iterating until the ranks converge (i.e., the maximum change between iterations is below a threshold $\epsilon = 10^{-6}$), or up to a maximum number of iterations (e.g., 100).

## Complexity

- **Time Complexity:** $O(I \times (N + E))$ where $I$ is the number of iterations to convergence, $N$ is the number of websites (nodes), and $E$ is the number of links (edges).
- **Space Complexity:** $O(N + E)$ to store the graph and the ranks.
