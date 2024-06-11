using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bottle_of_beer
{
    internal class Program
    {
        static void Main(string[] args)
        {
            BottleofBeer beer = new BottleofBeer();
            Console.WriteLine(beer.verses(0, 99));
            Console.ReadKey();
        }

    }
    
}
