#include <stdio.h>
#include <stdlib.h>

long long int count, *a;

void merge(int l, int mid, int r)
{
    int temp[r - l + 1], i = l, j = mid + 1, k = 0;

    while (i <= mid && j <= r)
    {
        if (a[i] > a[j] && i <= mid)
        {
            count += 1 + mid - i;
            temp[k++] = a[j++];
        }
        else
        {
            temp[k++] = a[i++];
        }
    }

    while (i <= mid) temp[k++] = a[i++];
    while (j <= r) temp[k++] = a[j++];

    for (i = 0; i <= r - l; i++)
    {
        a[l + i] = temp[i];
    }
}

void mergeSort(int l, int r)
{
    if (l < r)
    {
        int mid = (l + r) / 2;
        mergeSort(l, mid);
        mergeSort(mid + 1, r);
        merge(l, mid, r);
    }
}

int main()
{
    int t;
    scanf("%d", &t);

    while (t--)
    {
        int n;
        count = 0;
        scanf("%d", &n);

        a = (long long int *)malloc(sizeof(long long int) * n);

        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);

        mergeSort(0, n - 1);
        printf("%lld\n", count);
        free(a); //free the allocated memory
    }

    return 0;
}

/*
input:
2

3
3
1
2

5
2
3
8
6
1


output:
2
5
*/

