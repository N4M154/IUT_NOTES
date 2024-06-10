#include <iostream>
using namespace std;

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int n, max1 = -1000 //, max2 = -1000;
        cin >> n;
        int a[n];
        int sum = 0;
        for (int i = 0; i < n; i++)
        {
            cin >> a[i];
            if (a[i] > max1)
            {
                max1 = a[i];
            }
            if (a[i] >= 0)
            {
                sum += a[i];
            }
        }
        if (sum == 0)
        {
            sum = max1;
        }
        int maxSum = 0, cursum = 0;
        for (int i = 0; i < n; i++)
        {
            cursum += a[i];
            if (cursum < 0)
            {
                cursum = 0;
            }
            else if (cursum > maxSum)
            {
                maxSum = cursum;
            }
        }
        if (maxSum == 0)
        {
            maxSum = sum;
        }
        cout << maxSum << " " << sum << endl;
    }
    return 0;
}
