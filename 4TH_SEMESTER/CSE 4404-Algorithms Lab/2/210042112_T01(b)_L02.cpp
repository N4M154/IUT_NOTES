#include <iostream>
#include <fstream>
using namespace std;

//0 index array
void Heapify(int arr[], int N, int i)
{

    int largest = i;

    // left
    int l = 2 * i + 1;

    // right
    int r = 2 * i + 2;

    if (l < N && arr[l] > arr[largest])
        largest = l;

    if (r < N && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i)
    {
        swap(arr[i], arr[largest]);


        Heapify(arr, N, largest);
    }
}


void heapSort(int arr[], int N)
{
    for (int i = N / 2 - 1; i >= 0; i--)
        heapify(arr, N, i);


    for (int i = N - 1; i > 0; i--)
    {

        swap(arr[0], arr[i]);

        heapify(arr, i, 0);
    }
}

void printArray(int arr[], int N)
{
    for (int i = 0; i < N; ++i)
        cout << arr[i] << " ";
    cout << "\n";
}

int main()
{
    // Open the input file
    ifstream inputFile("E:\\PDF\\CSE 4404-Algorithms Lab\\2\\random_numbers.txt");

    if (!inputFile)
    {
        cerr << "Unable to open input file";
        return 1;
    }

    int N;
    inputFile >> N;

    int arr[N];
    for (int i = 0; i < N; ++i)
    {
        inputFile >> arr[i];
    }

    inputFile.close();

    heapSort(arr, N);

    cout << "Sorted array:\n";
    printArray(arr, N);

    return 0;
}

