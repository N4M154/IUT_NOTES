#include <iostream>
#include <chrono>
#include <fstream>
#include <iomanip>
using namespace std;

void bubbleSort(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {

            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main()
{
    ifstream inputFile("E:\\PDF\\CSE 4404-Algorithms Lab\\1\\random_numbers.txt");
    if (!inputFile)
    {
        cerr << "Error opening input file." << endl;
        return 1;
    }
    int n;
    inputFile >> n;

    int arr[n];
    for (int i = 0; i < n; i++)
    {
        inputFile >> arr[i];
    }

   auto start = std::chrono::high_resolution_clock::now();
    bubbleSort(arr, n);
     auto end = std::chrono::high_resolution_clock::now();

    // Calculate the duration
    std::chrono::duration<double> duration = end - start;

    cout << "Sorted array: ";
    printArray(arr, n);

    std::cout << "Execution time: " << duration.count() << " seconds." << std::endl;

    return 0;
}

