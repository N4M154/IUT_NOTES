#include <iostream>
using namespace std;

int fibonacci(int n, int* Repeat)
{
    if (n <= 1)
    {
        return n;
    }
    if (Repeat[n] != -1)
    {
        return Repeat[n];
    }

    Repeat[n] = fibonacci(n - 1, Repeat) + fibonacci(n - 2, Repeat);

    return Repeat[n];
}

int main()
{
    int n;
    cin >> n;

    int* Repeat = new int[n + 2];
    for (int i = 0; i <= n; ++i)
    {
        Repeat[i] = -1;
    }

    cout << fibonacci(n, Repeat) << endl;

    delete[] Repeat;

    return 0;
}
