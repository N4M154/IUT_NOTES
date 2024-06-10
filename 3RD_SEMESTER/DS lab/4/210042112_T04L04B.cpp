#include<iostream>
#include<queue>

using namespace std;

queue<int>q1;
queue<int>q2;

void push_s(int x)
{

    while(!q1.empty())
    {
        q2.push(q1.front());
        q1.pop();

    }

    q1.push(x);

    while(!q2.empty())
    {

        q1.push(q2.front());
        q2.pop();
    }
}

void pop_s()
{

    if(!q1.empty())
    {
        q1.pop();
    }
}

int top_s()
{
    if(!q1.empty())
    {
        return q1.front();
    }
    return -1;

}

bool empty_s()
{

    return q1.empty();
}


int main()
{
    //copied from the text
    push_s(10);
    cout << top_s() << endl;
    push_s(20);
    cout << top_s() << endl;
    pop_s();
    cout << top_s() << endl;
    push_s(100);
    cout << top_s() << endl;
    cout << empty_s() << endl;
    pop_s();
    pop_s();
    cout << empty_s() << endl;
}
