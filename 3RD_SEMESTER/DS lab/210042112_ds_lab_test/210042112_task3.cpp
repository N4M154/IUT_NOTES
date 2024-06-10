#include <iostream>
#include <vector>
using namespace std;

bool isBST(vector<int>& arr, int start, int end)
{
    if (start >= end)
    {
        return true;
    }

    int index = start + 1;
    while (index <= end && arr[index] < arr[start])
    {
        index++;
    }

    for (int i = index; i <= end; ++i)
    {
        if (arr[i] < arr[start])
        {
            return false;
        }
    }

    return isBST(arr, start + 1, index - 1) && isBST(arr, index, end);
}

bool isBST2(vector<int>& arr)
{
    return isBST(arr, 0, arr.size() - 1);
}

int main()
{
    int size;
    cout << "Enter the size of the array: ";
    cin >> size;

    vector<int> inputArr(size);
    cout << "Enter the elements of the array: ";
    for (int i = 0; i < size; ++i)
    {
        cin >> inputArr[i];
    }

    if (isBST2(inputArr))
    {
        cout << "True" << endl;
    }
    else
    {
        cout << "False" << endl;
    }

    return 0;
}

