using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListEvenOdd
{
    public class EvenOddClass
    {
        private List<int> numbers;

        public EvenOddClass(List<int> numbers)
        {
            this.numbers = numbers;
        }

        public (int Count, List<int> Values) GetEvenNumbers()
        {
            var evenNumbers = numbers.Where(n => n % 2 == 0).ToList();
            return (evenNumbers.Count, evenNumbers);
        }

        public (int Count, List<int> Values) GetOddNumbers()
        {
            var oddNumbers = numbers.Where(n => n % 2 != 0).ToList();
            return (oddNumbers.Count, oddNumbers);
        }

    }
}
