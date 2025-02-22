#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *ptrName;
    char fullName[] = "Md. Ishmam Uddin";
    ptrName = fullName;
    printf("My name is %s\n", ptrName);

    int *ptrSalary = (int*)malloc(sizeof(int));
    if (ptrSalary == NULL)
    {
        printf("Memory allocation failed\n");
        return 1;
    }
    *ptrSalary = 1000;
    printf("My salary is %d\n", *ptrSalary);

    free(ptrSalary);
    ptrSalary = NULL;  // Set pointer to NULL after freeing

    ptrSalary = (int*)malloc(sizeof(int));
    if (ptrSalary == NULL)
    {
        printf("Memory allocation failed\n");
        return 1;
    }
    *ptrSalary = 2000;
    printf("After promotion my salary will be %d\n", *ptrSalary);

    free(ptrSalary);
    ptrSalary = NULL;


    //26 characters + 1 for null terminator
    char *alphabet = (char *)malloc(27 * sizeof(char));
    if (alphabet == NULL)
    {
        printf("Memory allocation failed\n");
        return 1;
    }

    for (int i = 0; i < 26; i++)
    {
        alphabet[i] = 'A' + i;
    }
    alphabet[26] = '\0';

    printf("Alphabet: %s\n", alphabet);

    char *revAlphabet = (char *)malloc(27 * sizeof(char));
    if (revAlphabet == NULL)
    {
        printf("Memory allocation failed\n");
        free(alphabet);
        return 1;
    }

    for (int i = 0; i < 26; i++)
    {
        revAlphabet[i] = 'Z' - i;
    }
    revAlphabet[26] = '\0';

    printf("Reversed Alphabet: %s\n", revAlphabet);

    free(alphabet);
    alphabet = NULL;
    free(revAlphabet);
    revAlphabet = NULL;

    return 0;
}

