#include <iostream>
#include <vector>
using namespace std;
const int MAX = 100001;
vector<int> tree[MAX];
int cats[MAX];
int consecutive_cats[MAX];
int n, m, ans;
void dfs(int v, int parent, int total_cats)
{
    if (cats[v] == 1)
    {
        total_cats++;
        if (total_cats > m)
        {
            return;
        }
    }
    else
    {
        total_cats = 0;
    }
    if (tree[v].size() == 1 && v != 1)
    {
        ans++;
        return;
    }
    for (int u : tree[v])
    {
        if (u != parent)
        {
            dfs(u, v, total_cats);
        }
    }
}
int main()
{
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
    {
        cin >> cats[i];
    }
    for (int i = 1; i < n; i++)
    {
        int x, y;
        cin >> x >> y;
        tree[x].push_back(y);
        tree[y].push_back(x);
    }
    ans = 0;
    dfs(1, 0, 0);
    cout << ans << endl;
    return 0;
}
/*
input:
4 1
1 1 0 0
1 2
1 3
1 4
output:
2

input:
7 1
1 0 1 1 0 0 0
1 2
1 3
2 4
2 5
3 6
3 7
output:
2
*/

