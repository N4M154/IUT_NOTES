#include <iostream>
#include <string>

using namespace std;

const int MAX_SIZE = 10;

class Node
{
public:
    int data;
    Node* prev;
    Node* next;

    Node(int value) : data(value), prev(nullptr), next(nullptr) {}
};

class Deque
{
private:
    Node* front;
    Node* rear;
    int size;
    int max_size;

public:
    Deque(int n) : front(nullptr), rear(nullptr), size(0), max_size(n)
    {

    }

    bool isFull()
    {
        return size == max_size;
    }

    bool isEmpty()
    {
        return size == 0;
    }

    void pushLeft(int x)
    {
        if (!isFull())
        {
            Node* newNode = new Node(x);
            if (isEmpty())
            {
                front = rear = newNode;
            }
            else
            {
                newNode->next = front;
                front->prev = newNode;
                front = newNode;
            }
            size++;
            cout << "Pushed in left: " << x << endl;
        }
        else
        {
            cout << "The queue is full" << endl;
        }
    }

    void pushRight(int x)
    {
        if (!isFull())
        {
            Node* newNode = new Node(x);
            if (isEmpty())
            {
                front = rear = newNode;
            }
            else
            {
                newNode->prev = rear;
                rear->next = newNode;
                rear = newNode;
            }
            size++;
            cout << "Pushed in right: " << x << endl;
        }
        else
        {
            cout << "The queue is full" << endl;
        }
    }

    void popLeft()
    {
        if (!isEmpty())
        {
            Node* temp = front;
            front = front->next;
            if (front != nullptr)
            {
                front->prev = nullptr;
            }
            else
            {
                rear = nullptr;
            }
            int x = temp->data;
            delete temp;
            size--;
            cout << "Popped from left: " << x << endl;
        }
        else
        {
            cout << "The queue is empty" << endl;
        }
    }

    void popRight()
    {
        if (!isEmpty())
        {
            Node* temp = rear;
            rear = rear->prev;
            if (rear != nullptr)
            {
                rear->next = nullptr;
            }
            else
            {
                front = nullptr;
            }
            int x = temp->data;
            delete temp;
            size--;
            cout << "Popped from right: " << x << endl;
        }
        else
        {
            cout << "The queue is empty" << endl;
        }
    }
};

int main()
{
    int T;
    cin >> T;

    for (int case_num = 1; case_num <= T; ++case_num)
    {
        int n, m;
        cin >> n >> m;

        Deque dq(n);
        cout << "Case " << case_num << ":" << endl;

        for (int i = 0; i < m; ++i)
        {
            string command;
            cin >> command;
            if (command == "pushLeft")
            {
                int x;
                cin >> x;
                dq.pushLeft(x);
            }
            else if (command == "pushRight")
            {
                int x;
                cin >> x;
                dq.pushRight(x);
            }
            else if (command == "popLeft")
            {
                dq.popLeft();
            }
            else if (command == "popRight")
            {
                dq.popRight();
            }
        }
    }
    return 0;
}
