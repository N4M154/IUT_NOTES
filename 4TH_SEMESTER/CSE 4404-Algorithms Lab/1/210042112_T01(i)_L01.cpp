//linear approach
#include <bits/stdc++.h>
#include <fstream>
#include <chrono>
#include <iomanip>
using namespace std;


int findPeak(int a[], int n)
{

    if (n == 1)
        return 0;
    if (a[0] >= a[1])
        return 0;
    if (a[n - 1] >= a[n - 2])
        return n - 1;

    for (int i = 1; i < n - 1; i++)
    {

        if (a[i] >= a[i - 1] && a[i] >= a[i + 1])
            return i;
    }

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

    int a[n];
    for (int i = 0; i < n; i++)
    {
        inputFile >> a[i];
    }

   inputFile.close();

        auto start = std::chrono::high_resolution_clock::now();

        cout << "Before peak "<<a[findPeak(a,n)-1]<<endl;
        cout << "Peak point is " << a[findPeak(a,n)] << endl;
        cout<<"After peak "<<a[findPeak(a,n)+1]<<endl;
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> duration = end - start;

    std::cout << "Execution time: " << duration.count() << " seconds." << std::endl;

    return 0;
}




