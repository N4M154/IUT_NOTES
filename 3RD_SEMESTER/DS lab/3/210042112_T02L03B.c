#include <stdio.h>
#include <stdbool.h>

#define MAX_SIZE 100

// Function to check if a character is an opening parenthesis
bool opening_parenthesis(char c)
{
    return (c == '(' || c == '[' || c == '{');
}

// Function to check if a character is a closing parenthesis
bool closing_parenthesis(char c)
{
    return (c == ')' || c == ']' || c == '}');
}

// Function to check if two parentheses match
bool parentheses_matching(char open, char close)
{
    return (open == '(' && close == ')') || (open == '[' && close == ']') || (open == '{' && close == '}');
}

// Function to check if an expression is properly parenthesized
bool properly_matched(char expression[])
{
    char stack[MAX_SIZE];
    int top = -1; //empty

    for (int i = 0; expression[i] != '\0'; i++)
    {
        char c = expression[i];

        if (opening_parenthesis(c))
        {
            stack[++top] = c;
        }
        else if (closing_parenthesis(c))
        {
            if (top == -1 || !parentheses_matching(stack[top], c))
            {
                return false;
            }
            top--;
        }
    }

    return top == -1; // If the stack is empty, all parentheses are properly matched
}

int main()
{
    int N;
    scanf("%d", &N);
    getchar(); // Consume the newline character

    for (int i = 0; i < N; i++)
    {
        char expression[MAX_SIZE];//math expression for each case
        fgets(expression, MAX_SIZE, stdin);//reads the line and saves it as string
        expression[strlen(expression) - 1] = '\0'; // Remove the trailing newline character by assigning '\0' at the end cause fgets retains the newline char

        if (properly_matched(expression))
        {
            printf("Yes\n");
        }
        else
        {
            printf("No\n");
        }
    }

    return 0;
}
