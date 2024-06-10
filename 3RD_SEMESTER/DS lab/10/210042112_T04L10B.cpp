
#include <iostream>
#include<vector>
using namespace std;

struct Node
{
    int key;
    Node *left, *right;
    int height;

    Node(int value) : key(value), left(nullptr), right(nullptr), height(1) {}
};

int getHeight(Node *n)
{
    return n ? n->height : 0;
}

int getBalance(Node *n)//balance factor
{
    return n ? getHeight(n->left) - getHeight(n->right) : 0;
}

Node *rightRotate(Node *y)
{
    Node *x = y->left;
    Node *z = x->right;

    x->right = y;
    y->left = z;

    //update heights
    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;

    return x;
}

Node *leftRotate(Node *x)
{
    Node *y = x->right;
    Node *z = y->left;

    y->left = x;
    x->right = z;

    //update heights
    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;
    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;

    return y;
}


Node* insert(Node* node, int key)
{
    if (!node) return new Node(key);

    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    else
        return node;


    node->height = 1 + max(getHeight(node->left), getHeight(node->right));

    //check balancefactor and rotate upon necessary
    int balance = getBalance(node);

    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    if (balance > 1 && key > node->left->key)
    {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    if (balance < -1 && key < node->right->key)
    {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

void inorder(Node* root)
{
    if (root)
    {
        inorder(root->left);
        cout << root->key << "(" << root->height-1 << ") ";
        inorder(root->right);
    }
}


bool findPath(Node *root, int key, vector<int> &path)
{
    if (!root)
        return false;

    if (key < root->key && findPath(root->left, key, path))
    {
        path.push_back(root->key);
        return true;
    }

    if (key > root->key && findPath(root->right, key, path))
    {
        path.push_back(root->key);
        return true;
    }

    // If the key is found, add it to the path
    if (key == root->key)
    {
        path.push_back(root->key);
        return true;
    }

    return false;
}

int findDistance(Node *root, int x, int y)
{
    vector<int> pathX, pathY;

    if (!findPath(root, x, pathX) || !findPath(root, y, pathY))
        return -1;

    int i;
    for (i = 0; i < min(pathX.size(), pathY.size()); ++i)
    {
        if (pathX[i] != pathY[i])
            break;
    }

    return pathX.size() + pathY.size() - 2 * i;
}

int getCount(Node *root, int low, int high)
{
    if (!root)
        return 0;

    if (root->key >= low && root->key <= high)
        return 1 + getCount(root->left, low, high) + getCount(root->right, low, high);
    else if (root->key < low)
        return getCount(root->right, low, high);
    else
        return getCount(root->left, low, high);
}

int main()
{
    Node* root = nullptr;
    int key;

    while (cin >> key && key != -1)
        root = insert(root, key);

    inorder(root);

    int x, y;
    cout << "\nEnter the values of x and y: ";
    cin >> x >> y;

    int distance = findDistance(root, x, y);

    if (distance != -1)
    {
        cout << "Path between " << x << " and " << y << ": ";

        // Clear the vector before finding the path for y
        vector<int> path;
        path.clear();

        findPath(root, y, path);
        for (int i : path)
            cout << i << " ";
        cout << endl;
        cout << "Distance: " << distance << endl;

        int count = getCount(root, x, y);
        cout << "Count of nodes between [" << x << ", " << y << "] is " << count << endl;
    }
    else
    {
        cout << "Nodes not found in the tree." << endl;
    }

    return 0;
}

