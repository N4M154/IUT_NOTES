#include <stdio.h>
int main()
{
    int n, index = -1, id, push, max[10];
    scanf("%d", &n);

    while (1)
    {
        scanf("%d", &id);
        switch (id)
        {
            case -1: // Program exit
                goto exit;

            case 1: // Push

                scanf("%d", &push);
                if (index == n - 1)
                {
                    printf("Overflow\n");
                } else
                {
                    index++;
                    max[index] = push;
                    for (int j = 0; j <= index; j++)
                    {
                        printf("%d ", max[j]);
                    }
                    printf("\n");
                }
                break;

            case 2: // Pop
                if (index == -1)
                {
                    printf("Underflow\n");
                }
                else
                {
                    index--;
                    for (int j = 0; j <= index; j++)
                    {
                        printf("%d ", max[j]);
                    }
                    printf("\n");
                }
                break;

            case 3: // isEmpty
                if (index == -1)
                {
                    printf("True\n");
                }
                else
                {
                    printf("False\n");
                }
                break;

            case 4: // isFull
                if (index == n - 1)
                {
                    printf("True\n");
                }
                else

                {
                    printf("False\n");
                }
                break;

            case 5: // size
                printf("%d\n", index + 1);
                break;

            case 6: // top
                printf("%d\n", max[index]);
                break;

            default:
                printf("Invalid input\n");
                break;
        }
    }

    exit:
    return 0;
}

