using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _99_bottles_of_beer
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int bottles = 99;
            while (bottles > 0)
            {
                Console.WriteLine($"{bottles} bottles of beer on the wall, {bottles} bottles of beer.");
                Console.WriteLine("Take one down and pass it around, " + (--bottles > 0 ? $"{bottles}" : "no more") + " bottle" + (bottles != 1 ? "s" : "") + " of beer on the wall.");
                Console.WriteLine();
            }

            Console.WriteLine("No more bottles of beer on the wall, no more bottles of beer.");
            Console.WriteLine("Go to the store and buy some more, 99 bottles of beer on the wall.");
            Console.ReadKey();
        }
    }
}
