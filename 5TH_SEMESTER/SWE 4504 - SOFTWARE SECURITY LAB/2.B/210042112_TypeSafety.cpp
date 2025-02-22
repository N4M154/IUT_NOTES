#include <iostream>
#include <type_traits>
using namespace std;

class Duck
{
    bool rubber;
public:
    void setRubber(bool value)
    {
        rubber = value;
    }
    virtual void quack()
    {  // Make quack virtual to allow polymorphism
        if(rubber) cout << "Artificial Quack" << '\n';
        else cout << "Real Quack" << '\n';
    }

};

class RubberDuck : public Duck
{
public:
    RubberDuck()
    {
        setRubber(true);
    }
    void quack()
    {

        cout<<"Real Quack Quack!"<< '\n';
    }
};

class RealDuck : public Duck
{
public:
    RealDuck()
    {
        setRubber(false);
    }
    void quack()
    {

        cout<<"Rubber Quack Quack!"<< '\n';
    }

};


template <typename T>
void processData(T data)
{
    if constexpr (is_same<T, int>::value)
    {
        cout << "Integer: " << data << endl;
    }
    else if constexpr (is_same<T, double>::value)
    {
        cout << "Double: " << data << endl;
    }
    else
    {
        cout << "Unknown type!" << endl;
    }
}

int main()
{
    int i = 42;
    double d = 3.14;
    float e = 3.14;

    processData(i);  // Integer: 42
    processData(d);  // Double: 3.14
    processData(e);  // Unknown type!

    Duck *d1 = new RubberDuck();
    Duck *d2 = new RealDuck();

    RealDuck *rd = dynamic_cast<RealDuck*>(d1);

    if (rd) rd->quack();
    else cout << "Casting Error: d1 is a rubberduck not a realduck." << '\n';
    d1 -> quack();

    delete d1;
    delete d2;

    return 0;
}

