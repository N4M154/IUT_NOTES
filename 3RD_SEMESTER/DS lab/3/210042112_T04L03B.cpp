#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> findNextSeniors(const vector<int>& ranks)
{
    int n = ranks.size();
    vector<int> nextSeniors(n, -1);
    stack<int> st;
    for (int i = 0; i < 2 * n; i++)
    {
        int currentRank = ranks[i % n];
        while (!st.empty() && ranks[st.top()] < currentRank)
        {
            nextSeniors[st.top()] = currentRank;
            st.pop();
        }
        if (i < n)
        {
            st.push(i % n);
        }
    }
    return nextSeniors;
}
int main()

{
    while (true)
    {
        vector<int> ranks;
        int rank;
        while (cin >> rank && rank != -1)
        {
            ranks.push_back(rank);
        }
        if (ranks.empty())
        {
            break;
        }
        vector<int> nextSeniors = findNextSeniors(ranks);
        for (int i = 0; i < nextSeniors.size(); i++)
        {
            cout << nextSeniors[i];
            if (i < nextSeniors.size() - 1)
            {
                cout << " ";
            }
        }
        cout << endl;
    }
    return 0;
}

