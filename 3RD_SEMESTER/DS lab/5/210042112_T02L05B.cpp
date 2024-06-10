#include<iostream>
using namespace std;

void minHeapify(int arr[], int root, int heapSize)
{
    int smallest = root,//for index starting from 1
    leftChild = root*2,
    rightChild = root*2 + 1;

    if (leftChild <= heapSize && arr[leftChild] < arr[smallest])
    {
        smallest = leftChild;
    }
    if (rightChild <= heapSize && arr[rightChild] < arr[smallest])
    {
        smallest = rightChild;
    }

    if (smallest != root)
    {
        int temp = arr[root];
        arr[root] = arr[smallest];
        arr[smallest] = temp;
        minHeapify(arr, smallest, heapSize);
    }
}
void buildMinHeap(int arr[], int heapSize)
{
    for (int i=heapSize; i>0; i--)
    {
        minHeapify(arr, i, heapSize);
    }
}
void change(int arr[], int &heapSize)
{
    if (arr[2]>arr[3])
    {
        arr[3] = arr[1] + arr[3]*2;
    }
    else
    {
        arr[2] = arr[1] + arr[2]*2;
    }
    arr[1] = arr[heapSize]; //switch places with first least and decrease size
    heapSize--;
    buildMinHeap(arr, heapSize);    //get the smallest to the top again
}
int main()
{
    int arr[100];
    int n, k;
    cin>>n>>k;
    for (int i=1; i<=n; i++)
    {
        cin>>arr[i];
    }
    buildMinHeap(arr, n);
    int sCount = 0;
    while (arr[1] < k)
    {
        change(arr, n); //keep adding till requirement reached
        sCount++;

    }
    cout<<sCount<<endl;
    return 0;
}
