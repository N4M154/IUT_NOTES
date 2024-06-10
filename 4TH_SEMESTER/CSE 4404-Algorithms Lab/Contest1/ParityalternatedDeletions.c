#include <stdio.h>

int main()
{
	int n,a[2002],i;
	scanf("%d",&n);
	int odd=0,even = 0,sum=0;
	for(int i =0;i<n;i++)
	{
		scanf("%d",&a[i]);
		if(a[i]%2==0)
			even++;
		else
			odd++;
	}

	for(int i =0;i<n;i++)
	{
		for(int j =i+1;j<n;j++)
		{
			if(a[i]>a[j])
			{
				int temp = a[j];
				a[j] = a[i];
				a[i] = temp;
			}
		}
	}

	if(abs(odd-even)==0 || abs(odd-even)==1)
		sum = 0;
	else if(odd>even)
	{
		odd=odd-(even+1);
		for(i=0;odd!=0;i++)
		{
			if(a[i]&1)
			{
				sum=sum+a[i];
				odd--;
			}
		}
	}
	else if(even>odd)
	{
		even=even-(odd+1);
		for(i=0;even!=0;i++)
		{
			if(a[i]%2==0){
				sum=sum+a[i];
				even--;
			}
		}
	}
	printf("%d",sum);
	return 0;
}

