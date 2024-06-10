#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Graph
{
    int vertices;
    vector<vector<int>> adjList;

public:
    Graph(int V) : vertices(V), adjList(V) {}

    void addEdge(int u, int v)
    {
        adjList[u].push_back(v);
        adjList[v].push_back(u);
    }

    void BFS(int startVertex)
    {
        vector<bool> visited(vertices, false);
        queue<int> q;

        q.push(startVertex);
        visited[startVertex] = true;

        while (!q.empty())
        {
            int currentVertex = q.front();
            cout << currentVertex << " ";
            q.pop();

            for (int neighbor : adjList[currentVertex])
            {
                if (!visited[neighbor])
                {
                    q.push(neighbor);
                    visited[neighbor] = true;
                }
            }
        }
    }
};

int main()
{
     Graph g(10);

    // Adding edges
    g.addEdge(1,2);
    g.addEdge(1,7);
    g.addEdge(1,9);
    g.addEdge(2,5);
    g.addEdge(3,5);
    g.addEdge(3,6);
    g.addEdge(3,9);
    g.addEdge(4,7);
    g.addEdge(4,9);
    g.addEdge(5,6);
    g.addEdge(8,9);


    cout << "BFS starting from vertex 1: ";
    g.BFS(1);
    /*Graph g(6);
     // Adding edges
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);
    g.addEdge(3, 5);

    cout << "DFS starting from vertex 0: ";
    g.DFS(0);*/

    return 0;
}
