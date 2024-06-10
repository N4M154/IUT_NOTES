#include <iostream>
#include <vector>
using namespace std;

struct Node
{
    int val;
    Node* left;
    Node* right;
    Node* parent;
    Node() : val(0), left(NULL), right(NULL), parent(NULL) {}
    Node(int x) : val(x), left(NULL), right(NULL), parent(NULL) {}
};


void printPaths(Node* root, vector<int>& path)
{
    if (root == NULL) return;

    path.push_back(root->val);

    if (root->left == NULL && root->right == NULL)
    {

        cout << "1 ";
        for (int i = 1; i < path.size(); i++)
        {
            if (i > 1) cout << " ";
            cout << path[i];
        }
        cout << " (" << path.size() << ")" << endl;
    }
    else
    {
        printPaths(root->left, path);
        printPaths(root->right, path);
    }

    path.pop_back();
}

int main()
{

    int n;
    cin >> n;
    vector<Node> Nodes(n + 1);

    for (int i = 1; i <= n; i++)
    {
        Nodes[i].val = i;
    }

    for (int i = 1; i <= n; i++)
    {
        int val, parent, key;
        cin >> val >> parent >> key;
        Nodes[val].parent = &Nodes[parent];
        if (key == 1)
        {
            Nodes[parent].left = &Nodes[val];
        }
        else if (key == 2)
        {
            Nodes[parent].right = &Nodes[val];
        }
    }

    Node* root = &Nodes[1];

    vector<int> path;
    printPaths(root, path);

    return 0;
}
