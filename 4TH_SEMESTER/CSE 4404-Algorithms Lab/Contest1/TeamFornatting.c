#include <stdio.h>

int main()
{
    int n, s = 0, i;
    scanf("%d", &n);
    int a[n + 5];

    for (i = 0; i < n; i++)
        scanf("%d", &a[i]);


    for (i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (a[j] > a[j + 1])
            {

                int temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }


    for (i = 0; i < n; i += 2)
    {
        if (a[i] != a[i + 1])
            s += (a[i + 1] - a[i]);
    }

    printf("%d\n", s);

    return 0;
}


