/*name:Namisa Najah Raisa
id:210042112*/

#include<iostream>
#include<vector>
using namespace std;
int main()
{
    int n,k;
    cin>>n>>k;
    vector<int>stones(n);
    for(int i=0;i<n;i++)
        cin>>stones[i];

    vector<int> dp(n,1e9+5);
    dp[0]=0;//base

    for(int i=0;i<n;i++)
    {
        for(int j=i+1;j<=i+k;j++)
        {
            if(j<n)
                dp[j]=min(dp[j],dp[i]+abs(stones[j]-stones[i]));
        }
    }
    cout<<dp[n-1]<<"\n";
    return 0;
}

/*test cases:
input:
5 3
10 30 40 50 20
output:
30

input:
3 1
10 20 10
output:
20

input:
2 100
10 10
output:
0

input:
10 4
40 10 20 70 80 10 20 70 80 60
output:
40
*/

