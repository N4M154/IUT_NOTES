#include <iostream>
#include <queue>

using namespace std;

int lastStoneWeight(vector<int>& stones)
{
    priority_queue<int> pq(stones.begin(), stones.end());

    while (pq.size() > 1)
    {
        int x = pq.top();
        pq.pop();
        int y = pq.top();
        pq.pop();

        if (x != y)
        {
            pq.push(abs(x - y));
        }
    }

    return pq.empty() ? 0 : pq.top();
}

int main()
{
    int t;
    cin >> t;

    while (t--)
    {
        vector<int> numbers;

        int num;
        while (cin >> num && num != -1)
        {
            numbers.push_back(num);
        }

        int result = lastStoneWeight(numbers);
        cout << result << endl;
    }

    return 0;
}

