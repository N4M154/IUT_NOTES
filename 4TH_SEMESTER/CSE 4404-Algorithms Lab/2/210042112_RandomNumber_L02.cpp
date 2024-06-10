#include <iostream>
#include <fstream>
#include <cstdlib> // for rand() and srand()
#include <ctime>   // for time()

int main() {

    std::ofstream outputFile("random_numbers.txt");

    if (!outputFile.is_open())
    {
        std::cerr << "Error opening the file for writing.\n";
        return 1;
    }


    std::srand(static_cast<unsigned int>(std::time(nullptr)));


    for (int i = 0; i < 100; ++i)
    {

        int randomNumber = std::rand() % 100+ 1;


        outputFile << randomNumber << "\n";
    }


    outputFile.close();

    return 0;
}

