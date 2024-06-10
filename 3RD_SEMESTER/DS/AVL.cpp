#include <bits/stdc++.h>
using namespace std;

struct AvlNode
{
    int val;
    AvlNode *left = nullptr;
    AvlNode *right = nullptr;
    int hight = 1;
};

class AVL
{
private:
    AvlNode *root;

public:
    AVL()
    {
        root = nullptr;
    }

    int getHight(AvlNode *cur)
    {
        if (cur == nullptr)
            return 0;
        return cur->hight;
    }

    int getBalanceFactor(AvlNode *cur)
    {
        if (cur == nullptr)
            return 0;
        return getHight(cur->left) - getHight(cur->right);
    }

    AvlNode *leftRotate(AvlNode *A)
    {
        AvlNode *B = A->left;
        AvlNode *T2 = B->right;

        A->left = T2;
        B->right = A;

        A->hight = max(getHight(A->left), getHight(A->right)) + 1;
        B->hight = max(getHight(B->left), getHight(B->right)) + 1;
        return B;
    }

    AvlNode *rightRotate(AvlNode *A)
    {
        AvlNode *B = A->right;
        AvlNode *T2 = B->left;

        A->right = T2;
        B->left = A;

        A->hight = max(getHight(A->left), getHight(A->right)) + 1;
        B->hight = max(getHight(B->left), getHight(B->right)) + 1;
        return B;
    }

    AvlNode *insert(AvlNode *cur, int val)
    {
        if (cur == nullptr)
        {
            AvlNode *newNode = new AvlNode;
            newNode->val = val;
            return newNode;
        }

        if (cur->val > val)
            cur->left = insert(cur->left, val);
        else
            cur->right = insert(cur->right, val);

        cur->hight = max(getHight(cur->left), getHight(cur->right)) + 1;

        int balance = getBalanceFactor(cur);

        if (balance > 1 && cur->left->val > val) // LL condition
        {
            cur = leftRotate(cur);
        }
        else if (balance > 1 && cur->left->val < val) // LR codition
        {
            cur->left = rightRotate(cur->left);
            cur = leftRotate(cur);
        }
        else if (balance < -1 && cur->right->val < val) // RR Condition
        {
            cur = rightRotate(cur);
        }
        else if (balance < -1 && cur->right->val > val) // RL Condition
        {
            cur->right = leftRotate(cur->right);
            cur = rightRotate(cur);
        }
        return cur;
    }

    void insert(int val)
    {
        root = insert(root, val);
    }

    AvlNode *search(int val)
    {
        AvlNode *cur = root;
        while (cur != nullptr)
        {
            if (cur->val == val)
                break;
            if (cur->val > val)
                cur = cur->left;
            else
                cur = cur->right;
        }
        return cur;
    }

    AvlNode *deleteNode(AvlNode *cur, int val)
    {
        if (cur == nullptr)
            return cur;
        else if (cur->val > val)
            cur->left = deleteNode(cur->left, val);
        else if (cur->val < val)
            cur->right = deleteNode(cur->right, val);
        else if (cur->left != nullptr && cur->right != nullptr)
        {
            AvlNode *trv = cur->left;
            while (trv->right != nullptr)
                trv = trv->right;

            cur->val = trv->val;
            cur->left = deleteNode(cur->left, trv->val);
        }
        else
        {
            if (cur->left == nullptr && cur->right == nullptr)
            {
                AvlNode *temp = cur;
                return nullptr;
                delete temp;
            }
            else if (cur->left != nullptr)
            {
                AvlNode *temp = cur->left;
                cur->left = nullptr;
                delete temp;
            }
            else
            {
                AvlNode *temp = cur->right;
                cur->right = nullptr;
                delete temp;
            }
        }

        cur->hight = max(getHight(cur->left), getHight(cur->right)) + 1;
        int balanceFactor = getBalanceFactor(cur);

        if (balanceFactor < -1)
        {
            int balance = getBalanceFactor(cur->right);
            if (balance <= 0)
                cur = rightRotate(cur);
            else
            {
                cur->right = leftRotate(cur->right);
                cur = rightRotate(cur);
            }
        }
        else if (balanceFactor > 1)
        {
            int balance = getBalanceFactor(cur->left);
            if (balance >= 0)
                cur = leftRotate(cur);
            else
            {
                cur->left = rightRotate(cur->left);
                cur = leftRotate(cur);
            }
        }
        return cur;
    }

    void deleteNode(int val)
    {
        root = deleteNode(root, val);
    }

    void printNode(AvlNode *node)
    {
        if (node == nullptr)
            cout << "(null)" << endl;
        else
        {
            cout << "val = " << node->val << " bfac = " << getBalanceFactor(node) << endl;

            cout << node->val << " left = ";
            printNode(node->left);
            cout << node->val << " right = ";
            printNode(node->right);
        }
    }

    void print()
    {
        printNode(root);
    }
};

int main()
{

    AVL tree;
    tree.insert(10);
    tree.insert(11);
    tree.insert(12);
    tree.insert(13);
    tree.insert(14);
    tree.insert(15);
    tree.insert(16);
    tree.insert(17);
    tree.insert(18);
    tree.insert(19);
    tree.insert(20);
    tree.print();

    tree.deleteNode(13);
    tree.deleteNode(10);
    tree.print();
    return 0;
}