#include <iostream>
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
/*Node * minValueNode(Node* node)

{

  Node* current = node;

  while (current->left != NULL)

    current = current->left;

  return current;

}



Node* deleteNode(Node* root, int key)

{

  if (!root)

    return root;



  if (key < root->key)

    root->left = deleteNode(root->left, key);

  else if(key > root->key)

    root->right = deleteNode(root->right, key);

  else

  {

    if (!root->left || !root->right)

    {

      Node *temp = root->left ? root->left : root->right;

      if (!temp)

      {

        temp = root;

        root = nullptr;

      }

      else

        *root = *temp;

      free(temp);

    }

    else

    {

      Node* temp = minValueNode(root->right);

      root->key = temp->key;

      root->right = deleteNode(root->right, temp->key);

    }

  }



  if (!root)

    return root;



  root->height = 1 + max(getHeight(root->left), getHeight(root->right));

  int balance = getBalance(root);



  if (balance > 1 && getBalance(root->left) >= 0)

    return rightRotate(root);



  if (balance > 1 && getBalance(root->left) < 0)

  {

    root->left = leftRotate(root->left);

    return rightRotate(root);

  }



  if (balance < -1 && getBalance(root->right) <= 0)

    return leftRotate(root);



  if (balance < -1 && getBalance(root->right) > 0)

  {

    root->right = rightRotate(root->right);

    return leftRotate(root);

  }



  return root;

}*/

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

int secondLargest(Node* root)//2nd largest
{
    while (root->right->right)
        root = root->right;
    return root->key;
}

int main()
{
    Node* root = nullptr;
    int key;

    while (cin >> key && key != -1)
        root = insert(root, key);

    cout << secondLargest(root) << endl;
    inorder(root);

    return 0;
}

/*
input:
12 9 5 11 20 15 7 3 6 27 -1
output:
20
Status: 3(0) 5(1) 6(0) 7(2) 9(1) 11(0) 12(3) 15(0) 20(1) 27(0)

input:
10 15 20 5 8 -1
output:
15
Status: 5(0) 8(1) 10(0) 15(2) 20(0)
*/
