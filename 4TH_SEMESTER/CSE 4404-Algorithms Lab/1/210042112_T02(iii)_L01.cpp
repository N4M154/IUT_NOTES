//divide and conquer
#include <iostream>
#include <fstream>
#include <vector>
#include <iomanip>
#include <chrono>

using namespace std;

std::pair<int, int> findPeakDivideConquer(const std::vector<std::vector<int>>& matrix,int startRow, int endRow, int startCol, int endCol)
{
    int midCol = (startCol + endCol) / 2;


    int maxRowIndex = startRow;
    for (int i = startRow + 1; i <= endRow; ++i)
    {
        if (matrix[i][midCol] > matrix[maxRowIndex][midCol])
        {
            maxRowIndex = i;
        }
    }

    bool isPeak = true;
    if (midCol > 0 && matrix[maxRowIndex][midCol] < matrix[maxRowIndex][midCol - 1])
        isPeak = false;
    if (midCol < matrix[0].size() - 1 && matrix[maxRowIndex][midCol] < matrix[maxRowIndex][midCol + 1])
        isPeak = false;


    if (isPeak)
    {
        return std::make_pair(maxRowIndex, midCol);
    }



    if (midCol > startCol)
    {

        return findPeakDivideConquer(matrix, startRow, endRow, startCol, midCol - 1);
    }
    else
    {

        return findPeakDivideConquer(matrix, startRow, endRow, midCol + 1, endCol);
    }
}

std::pair<int, int> findPeakDivideConquer(const std::vector<std::vector<int>>& matrix)
{
    return findPeakDivideConquer(matrix, 0, matrix.size() - 1, 0, matrix[0].size() - 1);
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
    //std::pair<int, int> peakCoordinates = findPeakDivideConquer(matrix);
    std::cout << "\nPeak found at coordinates (" << findPeakDivideConquer(matrix).first << ", " << findPeakDivideConquer(matrix).second << ")\n";
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> duration = end - start;



     std::cout << "Execution time: " << duration.count() << " seconds." << std::endl;
    return 0;
}

