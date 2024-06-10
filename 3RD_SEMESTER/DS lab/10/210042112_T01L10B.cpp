#include <iostream>
#include <vector>
using namespace std;

const int MAX_SIZE = 100;

struct Node
{
    int value;
    int leftChild;
    int rightChild;
    int parent;
};

Node createNode(int value)
{
    Node newNode;
    newNode.value = value;
    newNode.parent = -1;
    newNode.leftChild = -1;
    newNode.rightChild = -1;
    return newNode;
}

int insertNode(vector<Node>& tree, int root, int value)
{
    if (root == -1)
    {
        tree.push_back(createNode(value));
        return tree.size() - 1;  //index of the newly created node
    }

    if (value > tree[root].value)
    {
        int rightChild = insertNode(tree, tree[root].rightChild, value);
        tree[root].rightChild = rightChild;
        tree[rightChild].parent = root;   //parent of the new right child is set to the root
    }
    else
    {

        int leftChild = insertNode(tree, tree[root].leftChild, value);
        tree[root].leftChild = leftChild;
        tree[leftChild].parent = root;
    }

    return root;  //returns the index of the root of the current subtree after the insertion operation
}

bool SearchForIsOccupied(const vector<Node>& tree, int root, int key)
{
    while (root != -1)
    {
        if (key > tree[root].value && key - tree[root].value <= 3) break;
        else if (key < tree[root].value && tree[root].value - key <= 3) break;
        else if (key > tree[root].value) root = tree[root].rightChild;//but does not maintain the 3 part of the condition
        else if (key < tree[root].value) root = tree[root].leftChild;//but does not maintain the 3 part of the condition
    }
    return root != -1; //Once the loop exits, this returns true if the final value of the root is not -1,
                      //indicating that the key is occupied within the specified range, and false otherwise.
}

void inorder(const vector<Node>& tree, int root)//to sort the values in an ascending form
{
    if (root != -1)
    {
        inorder(tree, tree[root].leftChild);
        cout << tree[root].value << " ";
        inorder(tree, tree[root].rightChild);
    }
}

int main()
{
    vector<Node> tree;
    int root = -1;
    int input;

    while (cin >> input && input != -1)//valid integer input
    {
        if (SearchForIsOccupied(tree, root, input))
        {
            inorder(tree, root);//for printing the order
            cout << "(Reservation failed)" << endl;
        }
        else
        {
            root = insertNode(tree, root, input);
            inorder(tree, root);
            cout << endl;  //insert the node and then print it in inorder
        }
    }

    return 0;
}

/*
input:
50
75
53
25
60
29
45
42
28
10
-1

output:
50
50 75
50 75 (Reservation failed)
25 50 75
25 50 60 75
25 29 50 60 75
25 29 45 50 60 75
25 29 45 50 60 75 (Reservation failed)
25 29 45 50 60 75 (Reservation failed)
10 25 29 45 50 60 75
*/


