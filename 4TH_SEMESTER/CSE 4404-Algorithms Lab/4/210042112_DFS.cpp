#include <iostream>
#include <vector>
#include <stack>

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

    void DFS(int startVertex)
    {
        vector<bool> visited(vertices, false);
        stack<int> s;

        s.push(startVertex);
        visited[startVertex] = true;

        while (!s.empty())
        {
            int currentVertex = s.top();
            cout << currentVertex << " ";
            s.pop();

            for (int neighbor : adjList[currentVertex])
            {
                if (!visited[neighbor])
                {
                    s.push(neighbor);
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


    cout << "DFS starting from vertex 1: ";
    g.DFS(1);
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
