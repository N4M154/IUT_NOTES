#include <stdio.h>
#include <string.h>

int main()
{
    int i, j, n, aux, s;
    scanf("%d %d", &s, &n);
    int dragons[n];
    int bonus[n];
    for(i = 0; i < n; i++)
    {
        scanf("%d %d", &dragons[i], &bonus[i]);
    }

    for(i = 0; i < n-1; i++)
    {
        for(j = 0; j < n-1; j++)
        {
            if(dragons[j] > dragons[j+1])
            {
                aux = dragons[j];
                dragons[j] = dragons[j+1];
                dragons[j+1] = aux;
                aux = bonus[j];
                bonus[j] = bonus[j+1];
                bonus[j+1] = aux;
            }
        }
    }

    for(i = 0; i < n; i++)
    {
        if(s > dragons[i])
        {
            s += bonus[i];
        }
        else
        {
            printf("NO");
            return 0;
        }
    }

    printf("YES");
}
