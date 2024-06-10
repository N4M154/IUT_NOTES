#include <stdio.h>
#include <limits.h>

#define V 9 //vertex number

int minDistance(int distance[], int visited[])
{
    int min = INT_MAX, min_index;

    for (int v = 0; v < V; v++)
    {
        if (visited[v] == 0 && distance[v] <= min)
        {
            min = distance[v];
            min_index = v;
        }
    }

    return min_index;
}


void printSolution(int distance[])
{
    printf("Vertex \tDistance from Source\n");
    for (int i = 0; i < V; i++)
        printf("%d \t%d\n", i, distance[i]);
}


void dijkstra(int graph[V][V], int source)
{
    int distance[V];
    int visited[V];


    for (int i = 0; i < V; i++)
    {
        distance[i] = INT_MAX;
        visited[i] = 0;
    }

    distance[source] = 0;


    for (int count = 0; count < V - 1; count++)
    {
        int u = minDistance(distance, visited);

        visited[u] = 1;


        for (int v = 0; v < V; v++)
        {
            if (!visited[v] && graph[u][v] && distance[u] != INT_MAX && distance[u] + graph[u][v] < distance[v])
            {
                distance[v] = distance[u] + graph[u][v];
            }
        }
    }

    printSolution(distance);
}

int main()
{

    int graph[V][V] =
    {
       {0,2,0,0,0,7,3,0,0},
       {2,0,4,0,0,0,6,0,0},
       {0,4,0,2,0,0,0,2,0},
       {0,0,2,0,1,0,0,8,0},
       {0,0,0,1,0,6,0,0,2},
       {7,0,0,0,6,0,0,0,5},
       {3,6,0,0,0,0,0,3,1},
       {0,0,2,8,0,0,3,0,4},
       {0,0,0,0,2,5,1,4,0}

    };

    int source = 0;//A

    dijkstra(graph, source);

    return 0;
}

