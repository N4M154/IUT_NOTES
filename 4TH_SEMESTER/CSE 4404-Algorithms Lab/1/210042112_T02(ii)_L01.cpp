//greedy approach
#include <iostream>
#include <fstream>
#include <vector>
#include <chrono>
#include <iomanip>

using namespace std;

std::pair<int, int> findPeakGreedy(const std::vector<std::vector<int>>& matrix)
{
    int rows = matrix.size();
    int cols = matrix[0].size();

    for (int i = 0; i < rows; ++i)
    {

        int maxIndex = 0;
        for (int j = 1; j < cols; ++j)
        {
            if (matrix[i][j] > matrix[i][maxIndex])
            {
                maxIndex = j;
            }
        }


        bool isPeak = true;
        if (i > 0 && matrix[i][maxIndex] < matrix[i - 1][maxIndex])
            isPeak = false;
        if (i < rows - 1 && matrix[i][maxIndex] < matrix[i + 1][maxIndex])
            isPeak = false;


        if (isPeak)
            return std::make_pair(i, maxIndex);
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


    const int rows = 5000;
    const int cols = 5000;
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
    std::cout << "\nPeak found at coordinates (" << findPeakGreedy(matrix).first<< ", " << findPeakGreedy(matrix).second << ")\n";
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = end - start;


    std::cout << "Execution time: " << duration.count() << " seconds." << std::endl;
    return 0;
}

