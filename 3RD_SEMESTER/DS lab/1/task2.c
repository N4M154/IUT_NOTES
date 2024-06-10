#include<stdio.h>
int main()
{
    int n;
    printf("Enter the number of elements in the array: ");
    scanf("%d",&n);

    int nums[n];
    printf("Enter the elements of the array: ");

    for(int i=0;i<n;i++)
    {
        scanf("%d",&nums[i]);
    }

    int target;
    printf("Enter the target value: ");
    scanf("%d",&target);

    int found=0;
    printf("Task 1: ");
    for(int i=0;i<n-1;i++)
    {
        for(int j=i+1;j<n;j++)
        {
            if(nums[i]+nums[j]==target)
            {
                printf("(%d,%d) ",i,j);
                found=1;
            }
        }
    }
    if(!found)
    {
        printf("Does not exist.\n");
    }
    else
    {
        printf("\n");
    }

    int count=0;
    for(int i=0;i<n-1;i++)
    {
        for(int j=i+1;j<n;j++)
        {
            if(nums[i]+nums[j]==target)
            {
                count++;
            }
        }
    }
    printf("Task 2: %d pairs.\n", count);
    return 0;
}
