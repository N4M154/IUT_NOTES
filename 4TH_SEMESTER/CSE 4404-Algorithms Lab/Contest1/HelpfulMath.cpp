#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr)
{
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i)
    {
        for (int j = 0; j < n - i - 1; ++j)
        {
            if (arr[j] > arr[j + 1])
            {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main()
{
    std::string sum;
    std::cin >> sum;

    std::vector<int> summands;


    for (size_t i = 0; i < sum.length(); i += 2)//skip the plus sign
    {
        summands.push_back(sum[i] - '0');//If sum[i] is '2', then sum[i] - '0' evaluates to 50 - 48, which is 2.
    }

    bubbleSort(summands);

    for (size_t i = 0; i < summands.size(); ++i)
    {
        std::cout << summands[i];
        if (i < summands.size() - 1)//so we don't print + sign after the last element
        {
            std::cout << "+";
        }
    }

    std::cout << std::endl;

    return 0;
}


