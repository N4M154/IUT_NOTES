#include<stdio.h>

void SortingFunction(int arr[],int elements)
{
    int maxNum=0;
    for(int i=0;i<elements;i++)
    {
        if(arr[i]>maxNum)
        {
            maxNum=arr[i];
        }
    }
    int countArr[maxNum+1];
    for(int i=0;i<=maxNum;i++)
    {
        countArr[i]=0;
    }
    for(int i=0;i<elements;i++)
    {
        countArr[arr[i]]++;
    }
    int Index=0;
    int count=0;
    while(count<=maxNum)
    {
        if(countArr[count]>0)
        {
            arr[Index]=count;
            Index++;
            countArr[count]--;
        }
        else
        {
            count++;
        }
    }
}

int main()
{
    int n;
    printf("Enter the size of the array: ");
    scanf("%d",&n);

    int nums[n];
    printf("The array is: ");
    for(int i=0;i<n;i++)
    {
        scanf("%d",&nums[i]);
    }

    SortingFunction(nums,n);

    printf("Sorted array: ");
    for(int i=0;i<n;i++)
    {
        printf("%d ",nums[i]);
    }
    printf("\n");
    return 0;
}
