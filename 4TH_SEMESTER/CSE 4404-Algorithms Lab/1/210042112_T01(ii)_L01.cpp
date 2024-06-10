//divide and conquer
#include <iostream>
#include <fstream>
#include <chrono>
#include <iomanip>
using namespace std;


int FindPeak(int arr[],int low,int high,int n)
{
    int mid=low+(high-low)/2;

    if ((mid==0||arr[mid-1]<=arr[mid])&&(mid==n-1||arr[mid+1]<=arr[mid]))
        return mid;


    if (mid>0&&arr[mid-1]>arr[mid])
        return FindPeak(arr,low,mid-1,n);


    return FindPeak(arr,mid+1,high,n);
}


int FindAPeak(int arr[],int n)
{
    return FindPeak(arr,0,n-1,n);
}

int main()
{
     ifstream inputFile("E:\\PDF\\CSE 4404-Algorithms Lab\\1\\random_numbers.txt"); // Open the input file
    if (!inputFile)
    {
        cerr << "Error opening input file." << endl;
        return 1;
    }
    int n;
    inputFile>>n;

    int arr[n];
    for (int i = 0; i < n; i++)
    {
        inputFile>> arr[i];
    }
    inputFile.close();

    auto start = std::chrono::high_resolution_clock::now();
    cout << "Before peak "<<arr[FindAPeak(arr, n)-1]<<endl;
    cout << "A peak point is " << arr[FindAPeak(arr, n)] << endl;
    cout << "After peak "<<arr[FindAPeak(arr, n)+1]<<endl;
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = end - start;

     std::cout << "Execution time: " << duration.count() << " seconds." << std::endl;

    return 0;
}

