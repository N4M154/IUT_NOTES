#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct TreeNode
{
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int value) : val(value), left(nullptr), right(nullptr) {}
};

bool isMirror(TreeNode* left, TreeNode* right)
{
    if (!left && !right)
    {
        return true;
    }

    if (!left || !right)
    {
        return false;
    }

    return (left->val == right->val) && isMirror(left->left, right->right) && isMirror(left->right, right->left);
}

bool isSymmetric(TreeNode* root)
{
    if (!root)
        return true;
    return isMirror(root->left, root->right);
}

TreeNode* buildTree(vector<int> nodes)
{
    if (nodes.empty())
        return nullptr;

    TreeNode* root = new TreeNode(nodes[0]);

    queue<TreeNode*> nodeQueue;
    nodeQueue.push(root);
    int i = 1;

    while (!nodeQueue.empty() && i < nodes.size())
    {
        TreeNode* current = nodeQueue.front();
        nodeQueue.pop();

        if (nodes[i] != -1)
        {
            current->left = new TreeNode(nodes[i]);
            nodeQueue.push(current->left);
        }
        i++;

        if (i < nodes.size() && nodes[i] != -1)
        {
            current->right = new TreeNode(nodes[i]);
            nodeQueue.push(current->right);
        }
        i++;
    }

    return root;
}

int main()
{
    int n;
    cin >> n;
    vector<int> nodes(n);

    for (int i = 0; i < n; i++)
    {
        cin >> nodes[i];
    }

    TreeNode* root = buildTree(nodes);

    if (isSymmetric(root))
    {
        cout << "Yes" << endl;
    }
    else
    {
        cout << "No" << endl;
    }

    return 0;
}
/*
7
1 2 2 4 3 3 4-->yes

7
1 2 2 -1 3 -1 3-->no

15
1 2 3 -1 4 -1 -1 -1 -1 -1 5 -1 -1 -1 -1-->no

15
1 2 2 4 3 3 4 -1 -1 5 -1 -1 5 -1 -1-->yes

15
1 2 2 4 3 3 4 5 -1 -1 -1 -1 -1 -1 5--yes

*/



