#include <bits/stdc++.h>
using namespace std;


int max(int a, int b)
{
	return (a > b) ? a : b;
}

int max(int a, int b, int c)
{
	return max(max(a, b), c);
}


int maxCrossingSum(int arr[], int l, int m, int h)
{
	int sum = 0;
	int left_sum = INT_MIN;
	for (int i = m; i >= l; i--)
    {
		sum = sum + arr[i];
		if (sum > left_sum)
			left_sum = sum;
	}

	sum = 0;
	int right_sum = INT_MIN;
	for (int i = m; i <= h; i++)
    {
		sum = sum + arr[i];
		if (sum > right_sum)
			right_sum = sum;
	}


	return max(left_sum + right_sum - arr[m], left_sum, right_sum);
}

int maxSubArraySum(int arr[], int l, int h)
{
	if (l > h)
		return INT_MIN;
	if (l == h)
		return arr[l];

	int m = (l + h) / 2;


	return max(maxSubArraySum(arr, l, m),
			maxSubArraySum(arr, m + 1, h),
			maxCrossingSum(arr, l, m, h));
}

int main()
{

	int n;
    cout << "Enter the size of the array: ";
    cin >> n;

    int arr[n];
    cout << "Enter the elements of the array: ";
    for (int i = 0; i < n; ++i)
        cin >> arr[i];

	int max_sum = maxSubArraySum(arr, 0, n - 1);
	cout << "Maximum contiguous sum is " <<max_sum;
	cout << "\n" << endl;;
	return 0;
}

//kadane's
// C++ program to print largest contiguous array sum
#include <bits/stdc++.h>
using namespace std;

int maxSubArraySum(int a[], int size)
{
    int max_so_far = INT_MIN, max_ending_here = 0;

    for (int i = 0; i < size; i++) {
        max_ending_here = max_ending_here + a[i];
        if (max_so_far < max_ending_here)
            max_so_far = max_ending_here;

        if (max_ending_here < 0)
            max_ending_here = 0;
    }
    return max_so_far;
}

// Driver Code
int main()
{
    int a[] = { -2, -3, 4, -1, -2, 1, 5, -3 };
    int n = sizeof(a) / sizeof(a[0]);

    // Function Call
    int max_sum = maxSubArraySum(a, n);
    cout << "Maximum contiguous sum is " << max_sum;
    return 0;
}

