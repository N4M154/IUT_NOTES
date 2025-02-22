//Task 0 Update the code so that your code follows the first standard, We have discussed.

#include <stdio.h>
#include <string.h>

//Task 1 Update the code so that it calculates the average of the 10 array elements
//AverageFinder(v);
void AverageFinder(size_t array_v[], size_t size_)
{
    double sum_ = 0;
    for(size_t i = 0; i < size_; i++)
    {
        array_v[i] = i;
        sum_ += array_v[i];
        printf("%lf \n", sum_);
    }
    printf("Sum: %lf \n", sum_);
    printf("Average: %lf \n", sum_ / size_);
}

//Task 2 Update the code so that it scans and prints all the information correctly
//take_info();

void take_info()
{
    int age;
    char name[1001];
    char address[10001];
    char email[1001];

    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    if (strlen(name) > 0 && name[strlen(name) - 1] == '\n')
    {
        name[strlen(name) - 1] = '\0';
    }

    printf("Enter your age: ");
    scanf("%d", &age);
    getchar();

    printf("Enter your email: ");
    fgets(email, sizeof(email), stdin);
    if (strlen(email) > 0 && email[strlen(email) - 1] == '\n')
    {
        email[strlen(email) - 1] = '\0';
    }

    printf("Enter your address: ");
    fgets(address, sizeof(address), stdin);
    if (strlen(address) > 0 && address[strlen(address) - 1] == '\n')
    {
        address[strlen(address) - 1] = '\0';
    }

    printf("\n\nName: %s\n", name);
    printf("Age: %d\n", age);
    printf("Address: %s\n", address);
    printf("Email: %s\n", email);
}

//Task 3 Update the code so that correct string size gets printed
//whats_wrong_1();

void whats_wrong_1()
{
    char s[1001];

    printf("Enter a name: ");
    fgets(s, sizeof(s), stdin);


    size_t len = strlen(s);
    if (len > 0 && s[len-1] == '\n')
    {
        s[len-1] = '\0';
    }

    strcat(s, " is the best!!");

    printf("\n%s\n", s);
    printf("String size: %zu\n", strlen(s));
}

//Task 4 Update the code so that unnecessary information does not get printed
//whats_wrong_2();

void whats_wrong_2()
{
    char s1[8] = "Network";
    char s2[10] = " Security";
    char s3[18] = "";

    strcpy(s3, s1);
    strcat(s3, s2);

    printf("%s\n", s3);

    strncpy(s1, s3, sizeof(s1) - 1);
    s1[sizeof(s1) - 1] = '\0';

    printf("%s", s1);
}


int main()
{

    printf("Task 1 : calculates the average of the 10 array elements\n");
    int v[10];
    AverageFinder(v, 10);


    printf("\nTask 2 : scans and prints all the information correctly\n");
    take_info();

    printf("\nTask 3 : correct string size gets printed\n");
    whats_wrong_1();

    printf("\nTask 4 : unnecessary information does not get printed\n");
    whats_wrong_2();

    return 0;


}

// -_- N4M154 -_-
