#include <iostream>
#include <algorithm>

const int SIZE = 2000002;

int A[SIZE];

void quicksort(int *a, int n)
{
    if (n < 2) return;

    int mid = a[n >> 1];
    int i = 0, j = n - 1;

    while (true)
    {
        while (a[i] < mid) i++;
        while (mid < a[j]) j--;

        if (i >= j) break;
        std::swap(a[i], a[j]);
        i++, j--;
    }

    quicksort(a, i);
    quicksort(a + i, n - i);
}

int main()
{
    int n;

    while (std::cin >> n && n)
    {
        for (int i = 0; i < n; ++i)
            std::cin >> A[i];

        quicksort(A, n);

        for (int i = 0; i < n; i++)
            std::cout << A[i] << (i == n - 1 ? "\n" : " ");
    }

    return 0;
}
