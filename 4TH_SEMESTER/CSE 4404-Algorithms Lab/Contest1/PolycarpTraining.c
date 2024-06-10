#include <stdio.h>

void merge(int arr[], int l, int mid, int r)
{
      int leftSize=mid-l+1;
      int rightSize=r-mid;
      int a[leftSize];
      int b[rightSize];
      int k=0, n=0;
      for(int i=l; i<=mid; i++)
      {
            a[k++]=arr[i];
      }
      k=0;
      for(int i=mid+1; i<=r; i++)
      {
            b[k++]=arr[i];
      }
      k=0;
      int i;
      for(i=l; i<=r && k<leftSize && n<rightSize; i++)
      {
            if(a[k]<b[n])
            {
                  arr[i]=a[k++];
            }
            else
            {
                  arr[i]=b[n++];
            }
      }
      while(k<leftSize)
      {
            arr[i++]=a[k++];
      }
      while(n<rightSize)
      {
            arr[i++]=b[n++];
      }
}
void mergeSort(int arr[], int l, int r)
{
      if(l<r)
      {
           int mid=(l+r)/2;
           mergeSort(arr, l, mid);
           mergeSort(arr, mid+1, r);
           merge(arr, l, mid, r);
      }
}
int main()
{
      int n;
      scanf("%d", &n);
      int arr[n];
      for(int i=0; i<n; i++)
      {
            scanf("%d", &arr[i]);
      }
      mergeSort(arr, 0, n-1);
      int count = 1;
      for(int i=0; i<n; i++)
      {
            if(arr[i]>=count)count++;
      }
      printf("%d", count-1);

      return 0;
}

/*
input:
4
3 1 4 1
output:
3
input:
3
1 1 1
output:
1
input:
5
1 1 1 2 2
output:
2
*/


