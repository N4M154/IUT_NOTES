#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;
struct Node* tail = NULL;

void Insert_front(int key)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = key;
    newNode->prev = NULL;
    newNode->next = head;

    if (head != NULL)
    {
        head->prev = newNode;
    }

    head = newNode;

    if (tail == NULL)
    {
        tail = newNode;
    }
}

void Insert_back(int key)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = key;
    newNode->prev = tail;
    newNode->next = NULL;

    if (tail != NULL)
    {
        tail->next = newNode;
    }

    tail = newNode;

    if (head == NULL)
    {
        head = newNode;
    }
}

void Insert_after_node(int key, int v)
{
    struct Node* temp = head;
    while (temp != NULL && temp->data != v)
    {
        temp = temp->next;
    }

    if (temp == NULL)
    {
        printf("Node with value %d not found.\n", v);
        return;
    }

    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = key;
    newNode->prev = temp;
    newNode->next = temp->next;

    if (temp->next != NULL)
    {
        temp->next->prev = newNode;
    }

    temp->next = newNode;
}

void Update_node(int key, int v)
{
    struct Node* temp = head;
    while (temp != NULL && temp->data != v)
    {
        temp = temp->next;
    }

    if (temp == NULL)
    {
        printf("Node with value %d not found.\n", v);
        return;
    }

    temp->data = key;
}

void Remove_head()
{
    if (head == NULL)
    {
        printf("List is empty.\n");
        return;
    }

    struct Node* temp = head;
    head = head->next;

    if (head != NULL)
    {
        head->prev = NULL;
    }

    free(temp);
}

void Remove_element(int key)
{
    if (head == NULL)
    {
        printf("List is empty.\n");
        return;
    }

    if (head->data == key)
    {
        Remove_head();
        return;
    }

    struct Node* temp = head;
    while (temp != NULL && temp->data != key)
    {
        temp = temp->next;
    }

    if (temp == NULL)
    {
        printf("Node with value %d not found.\n", key);
        return;
    }

    if (temp->prev != NULL)
    {
        temp->prev->next = temp->next;
    }

    if (temp->next != NULL)
    {
        temp->next->prev = temp->prev;
    }

    free(temp);
}

void Remove_end()
{
    if (tail == NULL)
    {
        printf("List is empty.\n");
        return;
    }

    struct Node* temp = tail;
    tail = tail->prev;

    if (tail != NULL)
    {
        tail->next = NULL;
    }
    else
    {
        head = NULL;
    }

    free(temp);
}

void Print_list_forward()
{
    struct Node* temp = head;
    while (temp != NULL)
    {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

void Print_list_backward()
{
    struct Node* temp = tail;
    while (temp != NULL)
    {
        printf("%d ", temp->data);
        temp = temp->prev;
    }
    printf("\n");
}

int main()
{
    int cases, key, v;
    int flag = 1;

    while (flag)
    {
        printf("Press 1 to insert at front\n");
        printf("Press 2 to insert at back\n");
        printf("Press 3 to insert after a node\n");
        printf("Press 4 to update a node\n");
        printf("Press 5 to remove the first node\n");
        printf("Press 6 to remove a node\n");
        printf("Press 7 to remove the last node\n");
        printf("Press 8 to exit\n");
        scanf("%d", &cases);

        switch (cases)
        {
            case 1:
                printf("Enter key: ");
                scanf("%d", &key);
                Insert_front(key);
                Print_list_forward();
                Print_list_backward();
                break;
            case 2:
                printf("Enter key: ");
                scanf("%d", &key);
                Insert_back(key);
                Print_list_forward();
                Print_list_backward();
                break;
            case 3:
                printf("Enter key: ");
                scanf("%d", &key);
                printf("Enter value after which to insert: ");
                scanf("%d", &v);
                Insert_after_node(key, v);
                Print_list_forward();
                Print_list_backward();
                break;
            case 4:
                printf("Enter key: ");
                scanf("%d", &key);
                printf("Enter value to update: ");
                scanf("%d", &v);
                Update_node(key, v);
                Print_list_forward();
                Print_list_backward();
                break;
            case 5:
                Remove_head();
                Print_list_forward();
                Print_list_backward();
                break;
            case 6:
                printf("Enter key to remove: ");
                scanf("%d", &key);
                Remove_element(key);
                Print_list_forward();
                Print_list_backward();
                break;
            case 7:
                Remove_end();
                Print_list_forward();
                Print_list_backward();
                break;
            case 8:
                flag = 0;
                break;
            default:
                printf("Invalid choice.\n");
        }
    }

    return 0;
}
