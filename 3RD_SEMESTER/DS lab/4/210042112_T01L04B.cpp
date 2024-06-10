#include <iostream>
using namespace std;

class QueueFunctionalities
{
private:
    int* queue;
    int front;
    int rear;
    int size;
    int capacity;

public:
    QueueFunctionalities(int capacity)
    {
        this->capacity = capacity;
        queue = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }

    void Enqueue(int x)
    {
        if (IsFull())
        {
            cout << "Overflow." << endl;
            return;
        }
        rear = (rear + 1) % capacity;
        queue[rear] = x;
        size++;
    }

    int Dequeue()
    {
        if (IsEmpty())
        {
            cout << "Underflow." << endl;
            return -1;
        }
        int dequeuedElement = queue[front];
        front = (front + 1) % capacity;
        size--;
        return dequeuedElement;
    }

    bool IsEmpty()
    {
        return size == 0;
    }

    bool IsFull()
    {
        return size == capacity;
    }

    int Size()
    {
        return size;
    }

    int Front()
    {
        if (IsEmpty())
        {
            cout << "Underflow." << endl;
            return -1;
        }

        return queue[front];
    }

    int Rear()
    {
        if (IsEmpty())
        {
            cout << "Underflow." << endl;
            return -1;
        }
        return queue[rear];
    }
};

int main()
{
    int n;
    cin >> n;
    QueueFunctionalities queue(n);

    while (true)
    {
        int functionID;
        cin >> functionID;

        if (functionID == -1)
            break;

        switch (functionID)
        {

            case 1:
            {
                int x;
                cin >> x;
                queue.Enqueue(x);
                cout << "Enqueued element: " << x << endl;
                break;
            }
            case 2:
            {
                int dequeuedElement = queue.Dequeue();
                cout << "Dequeued element: " << dequeuedElement << endl;
                break;
            }
            case 3:
            {
                bool isEmpty = queue.IsEmpty();
                cout << "Is empty: " << (isEmpty ? "true" : "false") << endl;
                break;
            }
            case 4:
            {
                bool isFull = queue.IsFull();
                cout << "Is full: " << (isFull ? "true" : "false") << endl;
                break;
            }
            case 5:
            {
                int size = queue.Size();
                cout << "Size of the queue: " << size << endl;
                break;
            }
            case 6:
            {
                int front = queue.Front();
                cout << "Front element: " << front << endl;
                break;
            }
            case 7:
            {
                int rear = queue.Rear();
                cout << "Rear element: " << rear << endl;
                break;
            }
            default:
                cout << "Invalid function ID." << endl;
                break;
        }
    }

    return 0;
}
