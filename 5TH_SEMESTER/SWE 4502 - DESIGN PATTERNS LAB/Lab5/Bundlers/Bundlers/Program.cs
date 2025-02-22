using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bundlers
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SimpleProduct laptop = new SimpleProduct("Laptop", "High-performance laptop", 1562.00m);
            SimpleProduct headphones = new SimpleProduct("Headphones", "headphones", 156.00m);
            SimpleProduct flowers = new SimpleProduct("flowers", "bouquet of flowers", 78.00m);
            SimpleProduct cake = new SimpleProduct("Cake", "Black forest", 89.00m);
            Console.WriteLine(laptop.GetDescription());
            Console.WriteLine();


            Bundle techbundle = new Bundle("Tech stuff", 20);
            techbundle.AddProduct(laptop);
            techbundle.AddProduct(headphones);
            Console.WriteLine(techbundle.GetDescription());
            Console.WriteLine();


            Bundle giftBundle = new Bundle("Holiday Gift", 30);
            giftBundle.AddProduct(flowers);
            giftBundle.AddProduct(cake);


            Bundle megaBundle = new Bundle("Mega Bundle", 40);
            megaBundle.AddProduct(techbundle);
            megaBundle.AddProduct(giftBundle);


            Console.WriteLine(megaBundle.GetDescription());
            Console.ReadKey();
        }
    }
}
