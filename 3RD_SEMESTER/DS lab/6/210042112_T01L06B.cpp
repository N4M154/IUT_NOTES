#include <iostream>
using namespace std;

struct TreeNode
{

    int data;
    TreeNode* left;
    TreeNode* right;
    TreeNode* parent;
};

class BinaryTree
{
public:
    TreeNode* root;


    BinaryTree()
    {
        root = nullptr;
    }

    void insert(int data, int parentData, int childType)
    {
        TreeNode* newNode = new TreeNode();
        newNode->data = data;
        newNode->left = nullptr;
        newNode->right = nullptr;

        if (childType == 1)
        {
            findAndInsert(root, parentData, newNode, true);
        }
        else if (childType == 2)
        {
            findAndInsert(root, parentData, newNode, false);
        }
        else
        {
            root = newNode;
        }
    }
    void remove(int data)
    {
        removeNode(root, data);

    }

   void search(int data)
   {
        TreeNode* result = findNode(root, data);

        if (result != nullptr)
        {
            cout << "Present, Left(";
            if (result->left != nullptr)
                cout << result->left->data << ")";
            else
                cout << "null)";

            cout << ", Right(";
            if (result->right != nullptr)
                cout << result->right->data<<")";
            else
                cout << "null)";

            cout << endl;
        }
        else
        {
            cout << "Not Present." << endl;
        }
    }


    int getHeight(TreeNode* node)
    {
        if (node == nullptr)
            return -1;

        int leftHeight = getHeight(node->left);
        int rightHeight = getHeight(node->right);

        return max(leftHeight, rightHeight) + 1;
    }


    void preorderTraversal(TreeNode* node)
    {
        if (node == nullptr)
            return;

        cout << node->data;
        if (node->parent != nullptr)
        {
            cout << "(" << node->parent->data << ") ";
        }
        if(node->parent==nullptr)
        {
            cout<<"(N) ";
        }



        preorderTraversal(node->left);
        preorderTraversal(node->right);
    }

private:
    void findAndInsert(TreeNode* currentNode, int parentData, TreeNode* newNode, bool isLeft)
    {
        if (currentNode == nullptr)
            return;

        if (currentNode->data == parentData)
        {
            if (isLeft)
            {
                currentNode->left = newNode;
            }
            else
            {
                currentNode->right = newNode;
            }
            newNode->parent = currentNode;
            return;
        }

        findAndInsert(currentNode->left, parentData, newNode, isLeft);
        findAndInsert(currentNode->right, parentData, newNode, isLeft);
    }

    TreeNode* removeNode(TreeNode* node, int data)
    {
        if (node == nullptr)
            return nullptr;

        if (node->data == data)
        {
            if (node->left != nullptr)
                node->left = removeNode(node->left, node->left->data);
            if (node->right != nullptr)
                node->right = removeNode(node->right, node->right->data);
            delete node;
            return nullptr;
        }

        node->left = removeNode(node->left, data);
        node->right = removeNode(node->right, data);

        return node;
    }
     TreeNode* findNode(TreeNode* node, int data)
     {
        if (node == nullptr)
            return nullptr;

        if (node->data == data)
            return node;

        TreeNode* leftResult = findNode(node->left, data);
        if (leftResult != nullptr)
            return leftResult;

        return findNode(node->right, data);
    }
};
int main()
{
    BinaryTree tree;
    int choice;

    do
    {

        cout << "1. Insert\n";
        cout << "2. Removal\n";
        cout << "3. Search\n";
        cout << "4. Height\n";
        cout << "5. Exit\n";
        cout << "Enter option: ";
        cin >> choice;

        switch (choice)
        {
            case 1:
            {
                int n;

                cin >> n;

                for (int i = 0; i < n; i++)
                {
                    int data, parentData, childType;
                    cin >> data >> parentData >> childType;
                    tree.insert(data, parentData, childType);
                }

                tree.preorderTraversal(tree.root);

                cout << "(preorder)\n";

                break;
            }
            case 2:
            {
                int removeValue;

                cin >> removeValue;
                tree.remove(removeValue);
                tree.preorderTraversal(tree.root);
                cout << "(preorder)\n";

                break;
            }
            case 3:
            {
                int searchValue;
                cin >> searchValue;
                tree.search(searchValue);
                break;
            }
            case 4:
            {
                int height = tree.getHeight(tree.root);
                cout << height << "\n";

                break;
            }
            case 5:
                cout << "\n";
                break;
            default:
                cout << "Invalid choice.\n";
        }
    } while (choice != 5);

    return 0;
}





