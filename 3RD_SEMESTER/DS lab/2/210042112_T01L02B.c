#include<stdio.h>
#include<stdlib.h>/*malloc*/

struct Node
{
    int data;
    struct Node* next;//variable of that type
};

struct Node* head = NULL;//first node of the linked list

void Insert_front(int key)/*creates a new node,
                          assigns the value,updates the next pointer of the new node to point to the current head.
                          Then,it updates the head to point to the new node.*/
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = key;
    newNode->next = head;
    head = newNode;
}

void Insert_back(int key)/*.... assigns the value,appends it to the end of the list by traversing the list until the last node
                         and updating the next pointer.*/
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

void Insert_after_node(int key, int v)/* inserts a new node with the given key after a node containing the value v.
                                         It searches for the node with value v,creates new node,updates the pointers to insert the new node after the found node.*/
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
    newNode->next = temp->next;
    temp->next = newNode;
}

void Update_node(int key, int v)/*searches for a node with value v and updates its value to the given key.*/
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

void Remove_head()/*Removes first node from the list by updating the head pointer and freeing the memory.*/
{
    if (head == NULL)
    {
        printf("List is empty.\n");
        return;
    }

    struct Node* temp = head;
    head = head->next;
    free(temp);
}

void Remove_element(int key)/*Removes the node containing the value key by searching for it in the list,updating pointers,then freeing memory.*/
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

    struct Node* prev = NULL;
    struct Node* temp = head;
    while (temp != NULL && temp->data != key)
    {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL)
    {
        printf("Node with value %d not found.\n", key);
        return;
    }

    prev->next = temp->next;
    free(temp);
}

void Remove_end()/*Removes the last node from the list by traversing the list and updating the pointers accordingly.*/
{
    if (head == NULL)
    {
        printf("List is empty.\n");
        return;
    }

    if (head->next == NULL)
    {
        Remove_head();
        return;
    }

    struct Node* prev = NULL;
    struct Node* temp = head;
    while (temp->next != NULL)
    {
        prev = temp;
        temp = temp->next;
    }

    prev->next = NULL;
    free(temp);
}

void Print_list()/*Prints what needs to be printed...*/
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
    int cases, key, v;
    int flag=1;

    while(flag)
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
                Print_list();
                break;
            case 2:
                printf("Enter key: ");
                scanf("%d", &key);
                Insert_back(key);
                Print_list();
                break;
            case 3:
                printf("Enter key: ");
                scanf("%d", &key);
                printf("Enter value after which to insert: ");
                scanf("%d", &v);
                Insert_after_node(key, v);
                Print_list();
                break;
            case 4:
                printf("Enter key: ");
                scanf("%d", &key);
                printf("Enter value to update: ");
                scanf("%d", &v);
                Update_node(key, v);
                Print_list();
                break;
            case 5:
                Remove_head();
                Print_list();
                break;
            case 6:
                printf("Enter key to remove: ");
                scanf("%d", &key);
                Remove_element(key);
                Print_list();
                break;
            case 7:
                Remove_end();
                Print_list();
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

