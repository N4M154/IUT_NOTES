#include <iostream>
#include <climits>
using namespace std;

long long max(long long a, long long b, long long c)
{
    return max(max(a, b), c);
}

long long maxCrossingSum(long long arr[], long long l, long long m, long long h)
{
    long long sum = 0;
    long long left_sum = LLONG_MIN;
    for (long long i = m; i >= l; i--)
    {
        sum += arr[i];
        left_sum = max(left_sum, sum);
    }

    sum = 0;
    long long right_sum = LLONG_MIN;
    for (long long i = m + 1; i <= h; i++)
    {
        sum += arr[i];
        right_sum = max(right_sum, sum);
    }

    return left_sum + right_sum;
}

long long maxSubArraySum(long long arr[], long long l, long long h)
{
    if (l == h)
        return arr[l];

    long long m = (l + h) / 2;


    return max(maxSubArraySum(arr, l, m),
               maxSubArraySum(arr, m + 1, h),
               maxCrossingSum(arr, l, m, h));
}

int main()
{
    long long n;
    cin >> n;

    long long seq[n];
    for (long long i = 0; i < n; ++i)
    {
        cin >> seq[i];
    }

    long long maxSum = maxSubArraySum(seq, 0, n - 1);
    cout << maxSum << endl;
    return 0;
}

