#include <iostream>
#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, int row, int col)
{
    int m = grid.size();
    int n = grid[0].size();
    if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] != '@')
    {
        return;
    }
    grid[row][col] = '*';
    dfs(grid, row - 1, col);
    dfs(grid, row + 1, col);
    dfs(grid, row, col - 1);
    dfs(grid, row, col + 1);
    dfs(grid, row - 1, col - 1);
    dfs(grid, row - 1, col + 1);
    dfs(grid, row + 1, col - 1);
    dfs(grid, row + 1, col + 1);
}
int countOilDeposits(vector<vector<char>>& grid)
{
    int m = grid.size();
    int n = grid[0].size();
    int count = 0;
    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            if (grid[i][j] == '@')
            {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}
int main()
{
    int m, n;
    while (cin >> m >> n && m != 0)
    {
        vector<vector<char>> grid(m, vector<char>(n));
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                cin >> grid[i][j];
            }
        }
        int numDeposits = countOilDeposits(grid);
        cout << numDeposits << endl;
    }
    return 0;
}
/*
input:
1 1
*
3 5
*@*@*
**@**
*@*@*
1 8
@@****@*
5 5
****@
*@@*@
*@**@
@@@*@
@@**@
0 0
output:
0
1
2
2
*/
