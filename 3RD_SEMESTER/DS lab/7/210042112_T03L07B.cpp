#include<iostream>

using namespace std;

const int MAX = 100001;
int parent[MAX];

void make_set(int x)
{
    parent[x] = x;
}

int find(int x)
{
    if (parent[x] == x)
    {
        return x;
    }
    return find(parent[x]);
}

void unionSets(int a, int b)
{
    a = find(a);
    b = find(b);
    if (a != b)
    {
        parent[b] = a;
    }
}

int main()
{
    int n, m;//n=nodes, m=edges
    cin >> n >> m;
    for (int i = 0; i < n; i++)
    {
        make_set(i);
    }
    for (int i = 0; i < m; i++)
    {
        int u, v;//undirected edge between u and v
        cin >> u >> v;
        unionSets(u, v);
    }
    int q;//q=query
    cin >> q;
    for (int i = 0; i < q; i++)
    {
        int x, y;//from x to y
        cin >> x >> y;

        if (find(x) == find(y))
        {
            cout << "Yes" << endl;
        }
        else
        {
            cout << "No" << endl;
        }
    }
    return 0;
}

/*
Input:
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
10
1 8
7 8
7 4
7 10
3 6
9 5
10 9
6 1
2 5
5 10
Output:
Yes
Yes
Yes
No
Yes
Yes
No
No
No
No
*/
