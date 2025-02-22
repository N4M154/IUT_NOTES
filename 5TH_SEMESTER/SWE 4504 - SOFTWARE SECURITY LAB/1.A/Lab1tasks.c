#include <stdio.h>
#include <string.h>

void clear_fn(int array_v[])
{
    for(int i=0;i < sizeof(array_v)/sizeof(array_v[0]);++i)
    {
        array_v[i] = 0;
    }
}

void call_clear_fn()
{
    int sz = 12;
    int dis[12];

    for(int i=0;i<12;i++)
    {
        dis[i] = i+1;
    }

    clear_fn(dis);

    for(int i=0;i< sz;i++)
    {
        printf("%d\n",dis[i]);
    }
}

void take_st()
{
    int sz = 0;
    printf("Enter the size of the string : ");
    scanf("%d",&sz);

    char st[sz];
    gets(st);

    printf("%s",st);
}

void print_size_st()
{
    const char s[3] = "abc";

    printf("%d",strlen(s));
}

void null_problem()
{
    char a[16];
    char b[16];
    char c[16];

    strncpy(a,"1234567890abcdef",sizeof(a));
    strcpy(c,a);

    printf("%s",c);
}

int main()
{
    //Task 0 Update the code so that your code follows
    //the first standard, We have discussed.

    //Task 1 Update the code so that all the elements
    //of dis array is 0
    //call_clear_fn();

    //Task 2 Update the code so that only the defined size
    //gets printed
    //take_st();

    //Task 3 Update the code so that correct string size
    //gets printed
    //print_size_st();

    //Task 4 Update the code so that uncessary information
    //does not get printed
    //null_problem();

    return 0;
}
