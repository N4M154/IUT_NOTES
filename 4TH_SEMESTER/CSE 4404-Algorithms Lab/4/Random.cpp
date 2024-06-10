#include <iostream>

const int MAXN = 1000;
int n, m;
int grid[MAXN][MAXN];

void countRooms(int x, int y)
{
    if (x < 0 || x >= n || y < 0 || y >= m || grid[x][y] == 1)//visited
        return;

    grid[x][y] = 1;

    countRooms(x + 1, y);
    countRooms(x - 1, y);
    countRooms(x, y + 1);
    countRooms(x, y - 1);
}

int main()
{
    std::cin >> n >> m;

    for (int i = 0; i < n; ++i)
    {
        std::string s;
        std::cin >> s;
        for (int j = 0; j < m; ++j)
        {
            if (s[j] == '#')
            {
                grid[i][j] = 1; // Marking walls
            }
        }
    }

    int rooms = 0;
    for (int i = 0; i < n; ++i)
    {
        for (int j = 0; j < m; ++j)
        {
            if (grid[i][j] == 0)
            {
                countRooms(i, j);
                rooms++;
            }
        }
    }

    std::cout << rooms << std::endl;

    return 0;
}
/*input:
5 8
########
#..#...#
####.#.#
#..#...#
########

output:
3
*/

