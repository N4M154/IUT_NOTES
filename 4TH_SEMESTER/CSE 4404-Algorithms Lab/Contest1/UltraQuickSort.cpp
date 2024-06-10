#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;


long long mergeAndCount(vector<int>& arr, int l, int m, int r)
{
    long long count = 0;

    int n1 = m - l + 1;
    int n2 = r - m;

    vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;

    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k++] = L[i++];
        }
        else
        {
            arr[k++] = R[j++];
            count += n1 - i;
        }
    }

    while (i < n1)
    {
        arr[k++] = L[i++];
    }

    while (j < n2)
    {
        arr[k++] = R[j++];
    }

    return count;
}


long long mergeSortAndCount(vector<int>& arr, int l, int r)
{
    long long count = 0;

    if (l < r)
    {
        int m = l + (r - l) / 2;

        count += mergeSortAndCount(arr, l, m);
        count += mergeSortAndCount(arr, m + 1, r);

        count += mergeAndCount(arr, l, m, r);
    }

    return count;
}

int main()
{
    int n;

    while (true)
    {
        cin >> n;

        if (n == 0)
        {
            break;
        }

        vector<int> sequence(n);

        for (int i = 0; i < n; i++)
        {
            cin >> sequence[i];
        }

        long long swapCount = mergeSortAndCount(sequence, 0, n - 1);

        cout << swapCount << '\n';
    }

    return 0;
}
/*
input:
5
9
1
0
5
4
3
1
2
3
0

output:
6
0
*/
