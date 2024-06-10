/*name:Namisa Najah Raisa
id:210042112*/

#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
struct Edge
{
    int a,b;
    long long weight;
};

vector<Edge>edges;
vector<int>parent;

bool CompareEdges(Edge a,Edge b)
{
    return a.weight<b.weight;
}

int FindParent(int node)
{
    if(parent[node]==-1)
        return node;
    return parent[node]=FindParent(parent[node]);
}

bool merge(int a,int b)
{
    a=FindParent(a);
    b=FindParent(b);
    if(a==b)
        return false;
    parent[a]=b;
    return true;
}
int main()
{
    int n,m;
    long long result=0;
    int AddedEdgeCount=0;
    cin>>n>>m;
    parent.resize(n+1,-1);
    for(int i=0;i<m;++i)
    {
        Edge temp;
        cin>>temp.a>>temp.b>>temp.weight;
        edges.push_back(temp);
    }

    sort(edges.begin(),edges.end(),CompareEdges);

    for (Edge edge:edges)
    {
        if (merge(edge.a,edge.b))
        {
            result+=edge.weight;
            AddedEdgeCount++;
        }
    }
    if(AddedEdgeCount==n-1)
    {
        cout<<result<<"\n";
    }
    else
    {
        cout<<"IMPOSSIBLE";
    }
    return 0;
}

/*
test cases:
input:
5 6
1 2 3
2 3 5
2 4 2
3 4 8
5 1 7
5 4 4
output:
14
*/

