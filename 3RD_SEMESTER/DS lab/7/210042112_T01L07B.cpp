#include <iostream>
using namespace std;

const int MAX = 100001;
int parent[MAX],A[MAX];


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

void unionSets(int a, int b)//not needed in this program
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
    int t;
    cin >> t;
    for (int i = 1; i <= t; i++)
    {
        int n, q;
        cin >> n >> q;

        for (int i = 1; i <= n; i++)
        {
            make_set(i);
            cin >> A[i];
        }

        cout << "Case " << i << ":" << endl;

        for (int i = 0; i < q; i++)
        {
            int operation, x, y;
            cin >> operation;
            if (operation == 1)
            {
                cin >> x >> y;
                for (int j = 1; j <= n; j++)
                {
                    if (A[j] == x)
                    {
                        A[j] = y;
                    }
                }
                for (int j = 1; j <= n; j++)
                {
                    cout << A[j];
                    if (j < n)
                    {
                        cout << " ";
                    }
                }
                cout << endl;
            }
            else if (operation == 2)
            {
                int idx;
                cin >> idx;
                int result = A[find(idx)];
                cout << result << endl;
            }
        }
    }
    return 0;
}
/*
input:
1
5 4
1 2 3 4 5
1 1 3
2 1
1 3 5
2 1

output:
Case 1:
{3, 2, 3, 4, 5}
3
{5, 2, 5, 4, 5}
5
After the first update:
A = {3, 2, 3, 4, 5}
A[1] = 3
After the second update:
A = {5, 2, 5, 4, 5}
A[1] = 5
*/

/*
input:
3
3 3
1 2 3
1 3 4
1 2 3
2 2
3 5
1 2 3
1 2 3
1 3 4
2 1
2 2
2 3
3 3
1 2 3
1 4 5
1 2 4
2 2
output:
Case 1:
{1 2 4}
{1 3 4}
3
Case 2:
{1 3 3}
{1 3 3}
{1 4 4}
1
4
4
Case 3:
{1 2 3}
{1 2 3}
{1 4 3}
4
*/
