#include <iostream>
#include <vector>
using namespace std;

vector<int> g[20009];
bool vis[20009];
int xx, yy;

void dfs(int source, bool p)
{
    if (vis[source]) return;
    vis[source] = true;
    if (p)
        xx++;
    else
        yy++;
    int sz = g[source].size();
    for (int i = 0; i < sz; i++)
        dfs(g[source][i], !p);
}

int main()
{
    int t, n, a, b;
    cin >> t;
    for (int i = 1; i <= t; i++)
    {
        for (int j = 0; j < 20009; j++)
            g[j].clear();

        for (int j = 0; j < 20009; j++)
            vis[j] = false;

        cin >> n;

        for (int j = 1; j <= n; j++)
        {
            cin >> a >> b;
            g[a].push_back(b);
            g[b].push_back(a);
        }

        int ans = 0;
        for (int j = 1; j < 20009; j++)
        {
            if (!vis[j] && !g[j].empty())
            {
                xx = yy = 0;
                dfs(j, true);
                ans += max(xx, yy);
            }
        }
        cout << "Case " << i << ": " << ans << endl;
    }
    return 0;
}

/*
input:
2
2
1 2
2 3
3
1 2
2 3
4 2

output:
Case 1: 2
Case 2: 3
*/

