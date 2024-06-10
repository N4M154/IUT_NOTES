#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int n, m;
    cin >> n >> m;

    // Create an adjacency matrix and initialize with zeros
    vector<vector<char>> adjMatrix(n, vector<char>(n, ' '));
    // Create an adjacency list
    vector<vector<int>> adjList(n + 1);

    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;

        // adjacency matrix
        adjMatrix[u - 1][v - 1] = 'x';
        adjMatrix[v - 1][u - 1] = 'x';

        // adjacency list
        adjList[u].push_back(v);
        adjList[v].push_back(u);
    }

    // Print the adjacency list
    cout << "List view:" << endl;
    for (int i = 1; i <= n; i++)
    {
        cout << i << " -> ";
        for (int j = 0; j < adjList[i].size(); j++)
        {
            cout << adjList[i][j];
            if (j < adjList[i].size() - 1)
            {
                cout << " ";
            }
        }
        cout << endl;
    }

    // Print the adjacency matrix
    cout << "Matrix view:" << endl;
    cout << "  ";
    for (int i = 1; i <= n; i++)
    {
        cout << i << " ";
    }
    cout << endl;

    for (int i = 0; i < n; i++)
    {
        cout << i + 1 << " ";
        for (int j = 0; j < n; j++)
        {
            cout << adjMatrix[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
/*
5 7
1 2
2 4
3 5
1 4
1 5
2 3
4 5
*/
