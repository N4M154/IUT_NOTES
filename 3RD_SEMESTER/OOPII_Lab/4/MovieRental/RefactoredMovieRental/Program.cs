using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefactoredMovieRental
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Movie movie1 = new Romantic("Citizen Kane", "Romantic", new DateTime(1960, 2, 12), 120, 19.99);


            Movie movie2 = new Horror("Annabelle", "Horror", new DateTime(2015, 5, 23), 90, 18.75);


            Movie movie3 = new Thriller("Maze Runner", "Thriller", new DateTime(2013, 8, 30), 115, 20.25);
            

            Console.WriteLine($"First movie discount :{movie1.RentalPrice()} ");
            Console.WriteLine($"Second movie discount :{movie2.RentalPrice()} ");
            Console.WriteLine($"Third movie discount :{movie3.RentalPrice()} ");
            Console.ReadKey();
        }
    }
}
