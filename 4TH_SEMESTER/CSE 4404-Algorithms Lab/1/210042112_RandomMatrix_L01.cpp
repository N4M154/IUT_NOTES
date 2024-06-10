#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>

int main()
{

    std::ofstream outputFile("random_matrix.txt");

    if (!outputFile.is_open())
    {
        std::cerr << "Error opening the file for writing.\n";
        return 1;
    }


    std::srand(static_cast<unsigned int>(std::time(nullptr)));


    const int rows = 5000;
    const int cols = 5000;

    for (int i = 0; i < rows; ++i)
    {
        for (int j = 0; j < cols; ++j)
        {

            int randomNumber = std::rand() % 10000 + 1;
            outputFile << randomNumber << " ";
        }

        std::cout << '\n';
        outputFile << '\n';
    }

    outputFile.close();

    return 0;
}
