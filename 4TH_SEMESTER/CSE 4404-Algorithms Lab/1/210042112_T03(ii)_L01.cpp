#include <iostream>
#include <fstream>
#include <iomanip>
#include <chrono>
using namespace std;

void insertionSort(int arr[], int n)
{
    for (int i = 1; i < n; i++)
    {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }

        arr[j + 1] = key;
    }
}

void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
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
    insertionSort(arr, n);
    auto end = std::chrono::high_resolution_clock::now();


    std::chrono::duration<double> duration = end - start;


    std::cout << "Sorted array: ";
    printArray(arr, n);

    cout << std::fixed << std::setprecision(6);//for the 1000 input size
    std::cout << "Execution time: " << duration.count() << " seconds." << std::endl;


    return 0;
}

