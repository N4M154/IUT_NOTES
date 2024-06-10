#include<stdio.h>
int main()
{
    int i,j,k=0,n;
    scanf("%d",&n);
    int a[n],b[n];
    for(i=0;i<n;i++)
    {
        scanf("%d%d",&a[i],&b[i]);

    }

    for(i=0;i<n-1;i++)
    {    if((a[i]<a[i+1]&&b[i]>b[i+1])||(a[i]>a[i+1]&&b[i]<b[i+1]))
         k=1;
    }
    if(a[1]==1)k=1;

    if(k==1)
    {
        printf("Happy Alex\n");
    }
    else
    {
        printf("Poor Alex\n");
    }

    return 0;

}
