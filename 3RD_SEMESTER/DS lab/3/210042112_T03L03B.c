#include<stdio.h>
#include<string.h>

void removeAdjacentDuplicates(char *input)
{
    int length = strlen(input);
    char stack[length];
    int top = -1;

    for (int i = 0; i < length; i++)
    {

        if (top == -1 || input[i] != stack[top]) // If the stack is empty or the current character is different from the top of the stack
        {
            stack[++top] = input[i]; // Push the current character onto the stack
        }
        else
        {

            top--; // Pop the character from the stack as it's an adjacent duplicate
        }
    }


    stack[top + 1] = '\0'; // Null-terminate the result


    strcpy(input, stack);
}

int main()
{
    int N;
    scanf("%d", &N);

    for (int i = 0; i < N; i++)
    {
        char input[1000];
        scanf("%s", input);

        removeAdjacentDuplicates(input);

        printf("[%s]\n", input);
    }

    return 0;
}

