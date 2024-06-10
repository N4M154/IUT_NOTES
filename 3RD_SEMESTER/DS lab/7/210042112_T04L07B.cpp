#include <iostream>
#include <vector>
using namespace std;

const int MAX = 100001;
vector<int> adj[MAX];
bool visited[MAX];

void dfs(int node, vector<int>& component)
{
    visited[node] = true;
    component.push_back(node);
    for (int i = 0; i < adj[node].size(); i++)
    {
        int neighbor = adj[node][i];
        if (!visited[neighbor])
        {
            dfs(neighbor, component);
        }
    }
}

int main()
{
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u); //undirected graph
    }
    int components = 0;
    vector<vector<int>> componentSets;
    for (int i = 1; i <= n; i++)
    {
        if (!visited[i])
        {
            vector<int> component;
            dfs(i, component);
            components++;
            componentSets.push_back(component);
        }
    }
    cout << "Components: " << components << endl;
    cout << "Component sets:" << endl;
    for (int i = 0; i < componentSets.size(); i++)
    {
        const vector<int>& component = componentSets[i];
        cout << "{";
        for (int i = 0; i < component.size(); i++)
        {
            cout << component[i];
            if (i < component.size() - 1)
            {
                cout << " ";
            }
        }
        cout << "}" << endl;
    }
    return 0;
}
/*
10 10
1 2
2 4
3 5
1 4
6 5
3 6
2 7
2 8
5 9
6 9
*/

