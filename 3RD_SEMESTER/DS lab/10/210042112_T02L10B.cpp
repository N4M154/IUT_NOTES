#include <iostream>
using namespace std;

struct Node
{
    int value;
    int count;  // Count of nodes in the subtree rooted at this node
    Node* leftChild;
    Node* rightChild;
    Node* parent;
};

Node* createNode(int value)
{
    Node* newNode = new Node();
    newNode->value = value;
    newNode->count = 1;
    newNode->parent = nullptr;
    newNode->leftChild = nullptr;
    newNode->rightChild = nullptr;
    return newNode;
}

Node* insertNode(Node* root, int value)
{
    if (root == nullptr)

    {
        return createNode(value);
    }

    if (value > root->value)
    {
        root->rightChild = insertNode(root->rightChild, value);
        root->rightChild->parent = root;
    }
    else
    {
        root->leftChild = insertNode(root->leftChild, value);
        root->leftChild->parent = root;
    }

    root->count++;  // Increment the count for the current node

    return root;
}

int findCountBefore(Node* root, int value)
{
    int count = 0;
    while (root != nullptr)
    {
        if (value > root->value)
        {
            // because if the value is greater then the desired values are in the left subtree
            count += (root->leftChild != nullptr) ? (root->leftChild->count + 1) : 1;
            root = root->rightChild;
        }
        else
        {
            root = root->leftChild;
        }
    }
    return count;
}

int main()
{
    Node* root = nullptr;

    // Current reservations
    int reservations[] = {50, 75, 25, 29, 45, 60, 10};
    int numReservations = sizeof(reservations) / sizeof(reservations[0]);

    for (int i = 0; i < numReservations; ++i)
    {
        root = insertNode(root, reservations[i]);
    }


    int numQueries, timestamp;
    cin >> numQueries;

    for (int i = 0; i < numQueries; ++i)
    {
        cin >> timestamp;
        int countBefore = findCountBefore(root, timestamp);
        cout << countBefore << endl;
    }

    return 0;
}

/*
input:
5
45
75
50
10
29
output:
3
6
4
0
2
*/
