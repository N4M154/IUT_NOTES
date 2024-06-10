#include<iostream>
#include<vector>
#include<queue>



using namespace std;
struct TreeNode
{
int val=0;
TreeNode *left=nullptr;
TreeNode *right=nullptr;

};

void PreOrder(TreeNode *root)
{
    if(root==nullptr)
    {
        return;
    }
    cout<<root->val<<" ";
    PreOrder(root->left);
    PreOrder(root->right);
}
void PostOrder(TreeNode *root)
{
    if(root==nullptr)
    {
        return;
    }

    PostOrder(root->left);
    PostOrder(root->right);
    cout<<root->val<<" ";
}
void InOrder(TreeNode *root)
{
    if(root==nullptr)
    {
        return;
    }

    InOrder(root->left);
    cout<<root->val<<" ";
    InOrder(root->right);
}
void LevelOrder(TreeNode* root)
{
    if (root == nullptr)
    {
        return;
    }

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty())
    {
        TreeNode* current = q.front();
        q.pop();
        cout << current->val << " ";

        if (current->left)
        {
            q.push(current->left);
        }
        if (current->right)
        {
            q.push(current->right);
        }
    }
}

int main()
{
    int n;
    cin>>n;
    vector<TreeNode> nodes(n+1);

    for(int i=0;i<=n;i++)
    {
        nodes[i].val=i;
    }
    for(int i=1;i<=n;i++)
    {
        int val,parent,child;
        cin>>val>>parent>>child;

        if(child==1)
        {
            nodes[parent].left=&nodes[val];
        }
        if(child==2)
        {
            nodes[parent].right=&nodes[val];
        }
    }

    LevelOrder(&nodes[1]);
    cout<<endl;
    InOrder(&nodes[1]);
    cout<<endl;
    PreOrder(&nodes[1]);
    cout<<endl;
    PostOrder(&nodes[1]);
    cout<<endl;

}
