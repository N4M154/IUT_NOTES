#include <iostream>
#include <climits>
using namespace std;

int max(int a, int b) { return (a > b) ? a : b; }

int Repeat[1000];

int cutRod(int price[], int n)
{
    if (n <= 0)
        return 0;

    if (Repeat[n] != -1)
        return Repeat[n];

    int max_val = INT_MIN;

    for (int i = 0; i < n; i++) {
        max_val = max(max_val, price[i] + cutRod(price, n - i - 1));//0 based index
    }

    Repeat[n] = max_val;

    return max_val;
}

int main()
{
    int size;
    cin >> size;

    int arr[size];
    for (int i = 0; i < size; ++i) {
        cin >> arr[i];
    }

    for (int i = 0; i < 1000; ++i)
        Repeat[i] = -1;

    cout << cutRod(arr, size) << endl;
    return 0;
}

