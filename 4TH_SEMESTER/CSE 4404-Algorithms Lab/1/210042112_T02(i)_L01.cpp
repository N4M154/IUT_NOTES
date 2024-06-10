//brute force
#include <iostream>
#include <fstream>
#include <vector>
#include <chrono>
#include <iomanip>

using namespace std;

std::pair<int, int> findPeakBruteForce(const std::vector<std::vector<int>>& matrix)
{
    int rows = matrix.size();
    int cols = matrix[0].size();

    for (int i = 0; i < rows; ++i)
    {
        for (int j = 0; j < cols; ++j)
        {
            bool isPeak = true;


            if (i > 0 && matrix[i][j] < matrix[i - 1][j])
                isPeak = false;
            if (i < rows - 1 && matrix[i][j] < matrix[i + 1][j])
                isPeak = false;
            if (j > 0 && matrix[i][j] < matrix[i][j - 1])
                isPeak = false;
            if (j < cols - 1 && matrix[i][j] < matrix[i][j + 1])
                isPeak = false;


            if (isPeak)
                return std::make_pair(i, j);
        }
    }

}

int main()
{

    std::ifstream inputFile("E:\\PDF\\CSE 4404-Algorithms Lab\\1\\random_matrix.txt");

    if (!inputFile.is_open())
    {
        std::cerr << "Error opening the file.\n";
        return 1;
    }


    const int rows = 1000;
    const int cols = 1000;
    std::vector<std::vector<int>> matrix(rows, std::vector<int>(cols));

    for (int i = 0; i < rows; ++i)
    {
        for (int j = 0; j < cols; ++j)
        {
            if (!(inputFile >> matrix[i][j]))
            {
                std::cerr << "Error reading matrix from file.\n";
                return 1;
            }
        }
    }


    inputFile.close();

    auto start = std::chrono::high_resolution_clock::now();
    std::cout << "\nPeak found at coordinates (" << findPeakBruteForce(matrix).first
                  << ", " << findPeakBruteForce(matrix).second << ")\n";
    auto end = std::chrono::high_resolution_clock::now();
     std::chrono::duration<double> duration = end - start;

     std::cout << "Execution time: " << duration.count() << " seconds." << std::endl;
    return 0;
}
