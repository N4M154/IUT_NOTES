#include <stdio.h>


int isSorted(int arr[], int n)
{
    for (int i = 1; i < n; i++)
    {
        if (arr[i] < arr[i - 1])
        {
            return 0;
        }
    }
    return 1;
}

int main()
{
    int n;
    scanf("%d", &n);

    int arr[n];
    for (int i = 0; i < n; i++)
    {
        scanf("%d", &arr[i]);
    }

    if (isSorted(arr, n))
    {
        printf("yes\n1 1\n");
        return 0;
    }


    int start = 0;
    while (start < n - 1 && arr[start] < arr[start + 1])
    {
        start++;
    }

    int end = n - 1;
    while (end > 0 && arr[end] > arr[end - 1])
    {
        end--;
    }

    int temp;
    for (int i = start, j = end; i < j; i++, j--)
    {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    if (isSorted(arr, n))
    {
        printf("yes\n%d %d\n", start + 1, end + 1);
    }
    else
    {
        printf("no\n");
    }

    return 0;
}
