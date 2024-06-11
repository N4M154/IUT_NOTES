using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListEvenOdd
{
    public class Program
    {
        static void Main(string[] args)
        {
            List<int> numbers = new List<int> {0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

            EvenOddClass numberList = new EvenOddClass(numbers);

            var evenNumbers = numberList.GetEvenNumbers();
            Console.WriteLine($"Count of even numbers: {evenNumbers.Count}");
            Console.WriteLine($"Even numbers: {string.Join(", ", evenNumbers.Values)}");

            var oddNumbers = numberList.GetOddNumbers();
            Console.WriteLine($"Count of odd numbers: {oddNumbers.Count}");
            Console.WriteLine($"Odd numbers: {string.Join(", ", oddNumbers.Values)}");

            Console.ReadKey();
        }
    }
    
}
