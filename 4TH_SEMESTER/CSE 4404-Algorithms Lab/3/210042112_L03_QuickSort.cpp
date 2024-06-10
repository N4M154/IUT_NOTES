#include <iostream>
#include <fstream>
using namespace std;

void quickSort(int arr[], int l, int h);
int partition(int arr[], int l, int h);
void printArray(int arr[], int size);

int main()
{
    ifstream inputFile("random_numbers.txt");

    if (!inputFile.is_open())
    {
        cerr << "Error opening input file!" << endl;
        return 1;
    }

    const int MAX_SIZE = 100; // Assuming a maximum size for the array
    int arr[MAX_SIZE];
    int num, size = 0;

    while (inputFile >> num && size < MAX_SIZE)
    {
        arr[size++] = num;
    }

    inputFile.close();

    cout << "Original array: ";
    printArray(arr, size);


    quickSort(arr, 0, size - 1);

    cout << "\nSorted array: ";
    printArray(arr, size);

    return 0;
}

void quickSort(int arr[], int l, int h)
{
    if (l < h)
    {
        int pivotIndex = partition(arr, l, h);


        quickSort(arr, l, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, h);
    }
}

int partition(int arr[], int l, int h)
{
    int pivot = arr[h];//the last one of the array
    int i = l - 1;//so that it's ready for the next small element

    for (int j = l; j <= h - 1; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[h]);
    return i + 1;
}

void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
}

