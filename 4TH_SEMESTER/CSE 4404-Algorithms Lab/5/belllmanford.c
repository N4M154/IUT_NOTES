#include <stdio.h>
#include <limits.h>

#define V 5 // Number of vertices
#define E 8 // Number of edges

// Structure to represent an edge in the graph
struct Edge {
    int source, destination, weight;
};

// Function to print the final distances from the source
void printSolution(int distance[]) {
    printf("Vertex \tDistance from Source\n");
    for (int i = 0; i < V; i++)
        printf("%d \t%d\n", i, distance[i]);
}

// Bellman-Ford algorithm to find the shortest paths from the source vertex
void bellmanFord(struct Edge edges[], int source) {
    int distance[V];

    // Initialize distances
    for (int i = 0; i < V; i++)
        distance[i] = INT_MAX;
    distance[source] = 0;

    // Relax edges |V| - 1 times
    for (int count = 0; count < V - 1; count++)
    {
        for (int i = 0; i < E; i++)
        {
            int u = edges[i].source;
            int v = edges[i].destination;
            int weight = edges[i].weight;

            // Relax the edge from u to v
            if (distance[u] != INT_MAX && distance[u] + weight < distance[v])
                distance[v] = distance[u] + weight;

            // Relax the edge from v to u (assuming undirected graph)
            if (distance[v] != INT_MAX && distance[v] + weight < distance[u])
                distance[u] = distance[v] + weight;
        }
    }

    // Check for negative-weight cycles
    for (int i = 0; i < E; i++) {
        int u = edges[i].source;
        int v = edges[i].destination;
        int weight = edges[i].weight;

        if (distance[u] != INT_MAX && distance[u] + weight < distance[v]) {
            printf("Graph contains negative-weight cycle. Cannot find shortest paths.\n");
            return;
        }
    }

    // Print the calculated distances
    printSolution(distance);
}

int main() {
    // Example graph represented as an array of edges
    struct Edge edges[] =
    {
        {0, 1, -1},
        {0, 2, 4},
        {1, 2, 3},
        {1, 3, 2},
        {1, 4, 2},
        {3, 2, 5},
        {3, 1, 1},
        {4, 3, -3}
    };

    int source = 0; // Source vertex

    bellmanFord(edges, source);

    return 0;
}

