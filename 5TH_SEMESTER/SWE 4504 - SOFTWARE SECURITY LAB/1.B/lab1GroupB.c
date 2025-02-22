#include <stdio.h>
#include <string.h>


void AverageFinder(int array_v[])
{
    double sum_ = 0;
    double size_ = sizeof(array_v)/sizeof(array_v[0]);
    for(int i=0;i < size_;++i)
    {
        array_v[i] = i;
        sum_ += array_v[i];
        printf("%d \n",sum_);
    }
    printf("%d \n",sum_);
    printf("%lf \n",sum_/size_);
}


void take_info()
{
    int age;
    char name[10];
    char address[10];
    char email[15];

    printf("Enter your name : ");
    gets(name);

    printf("\nEnter your age : ");
    scanf("%d",&age);

    printf("\nEnter your email : ");
    gets(email);

    printf("\nEnter your address : ");
    gets(address);

    printf("\n\nName : %s\n",name);
    printf("Age : %d\n",age);
    printf("Address : %s\n",address);
    printf("Email : %s\n",email);
}


void whats_wrong_1()
{
    const char s[8] = "";

    printf("Enter a name : ");
    getchar();
    gets(s);// jodi 7tar beshi dey tahole overflow hoye jhamela hobe

    strcat(s, " is the best!!");


    printf("\n%s\n",s);

    printf("String size : %d\n",strlen(s));
}


void whats_wrong_2()
{
    const char s1[8] = "Network";
    const char s2[10] = " Security";
    const char s3[18];

    strcat(s3,s1);
    strcat(s3,s2);

    printf("%s\n",s3);

    strncpy(s1,s3,sizeof(s1));

    printf("%s",s1);
}




int main()
{
    //Task 0 Update the code so that your code follows
    //the first standard, We have discussed.
    int v[10];
    //Task 1 Update the code so that it calculates the
    //average of the 10 array elements
    //AverageFinder(v);

    //Task 2 Update the code so that it scans and prints
    //all the information correctly
    //take_info();

    //Task 3 Update the code so that correct string size
    //gets printed
    //whats_wrong_1();

    //Task 4 Update the code so that unnecessary information
    //does not get printed
    //whats_wrong_2();

    return 0;
}
