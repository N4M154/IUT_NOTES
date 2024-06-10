#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int max(int a, int b)
{
    return (a > b) ? a : b;
}
int knapSack(int W, const vector<int>& wt, const vector<int>& val, int n)
{
    vector<int> K(W + 1, 0);

    for (int i = 0; i < n; i++)
    {
        for (int w = W; w >= wt[i]; w--)
        {
            K[w] = max(K[w], val[i] + K[w - wt[i]]);
        }
    }
    return K[W];
}
int main()
{
    int T;
    cin >> T;
    while (T--)
    {
        int N;
        cin >> N;
        vector<int> price(N), weight(N);
        for (int i = 0; i < N; i++)
        {
            cin >> price[i] >> weight[i];
        }
        int G;
        cin >> G;
        vector<int> maxWeight(G);
        for (int i = 0; i < G; i++)
        {
            cin >> maxWeight[i];
        }
        int totalValue = 0;
        for (int i = 0; i < G; i++)
        {
            totalValue += knapSack(maxWeight[i], weight, price, N);
        }
        cout << totalValue << endl;
    }
    return 0;
}

