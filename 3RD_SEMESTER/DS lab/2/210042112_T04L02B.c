#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void Insert_back(int key)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = key;
    newNode->next = NULL;

    if (head == NULL)
    {
        head = newNode;
        return;
    }

    struct Node* temp = head;
    while (temp->next != NULL)
    {
        temp = temp->next;
    }
    temp->next = newNode;
}

void Remove_duplicates()
{
    struct Node* current = head;

    while (current != NULL && current->next != NULL)
    {
        if (current->data == current->next->data)
        {
            struct Node* temp = current->next;
            current->next = temp->next;
            free(temp);
        }
        else
        {
            current = current->next;
        }
    }
}

void Print_list()
{
    struct Node* temp = head;
    while (temp != NULL)
    {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

int main()
{
    int num;

    printf("Enter sorted numbers (-1 to stop):\n");
    while (1)
    {
        scanf("%d", &num);
        if (num == -1)
        {
            break;
        }
        Insert_back(num);
    }

    Remove_duplicates();

    printf("Output:\n");
    Print_list();

    return 0;
}

