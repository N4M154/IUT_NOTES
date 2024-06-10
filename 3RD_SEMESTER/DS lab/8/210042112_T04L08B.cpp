#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;
const int MAX_LOCATIONS = 501;
struct Edge
{
    int to;
    int weight;
};
vector<vector<Edge>> graph(MAX_LOCATIONS);
vector<int> dist(MAX_LOCATIONS, INT_MAX);
void dijkstra(int start)
{
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty())
    {
        int u = pq.top().second;
        int u_dist = pq.top().first;
        pq.pop();
        if (u_dist != dist[u]) continue;
        for (const Edge& edge : graph[u])
        {
            int v = edge.to;
            int weight = edge.weight;

            if (dist[u] + weight < dist[v])
            {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}

int main()
{
    int N;
    cin >> N;
    for (int i = 0; i < N; i++)
    {
        int A, B, W;
        cin >> A >> B >> W;
        graph[A].push_back({B, W});
        graph[B].push_back({A, W});
    }
    int U;
    cin >> U;
    int Q;
    cin >> Q;
    for (int q = 0; q < Q; q++)
    {
        int V;
        cin >> V;
        dist.assign(MAX_LOCATIONS, INT_MAX);
        dijkstra(U);
        if (dist[V] != INT_MAX)
        {
            cout << dist[V] << endl;
        }
        else
        {
            cout << "NO PATH" << endl;
        }
    }
    return 0;
}
/*
input:
7
0 1 4
0 3 8
1 4 1
1 2 2
4 2 3
2 5 3
3 4 2
0
4
1
4
5
7
output:
4
5
9
NO PATH
*/
