using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefactoredMovieRental
{
    /*genre:horror,romantic,thriller and others
each movie: title,genre,release date,duration
horror:20%
romantic:30%      //discount on the base price
thriller:15%    

thriller>5 yrs old-->15+10 %

base price is decided by the rental service.*/
    public abstract class Movie
    {
        public string Title { get; set; }
        public string Genre { get; set; }

        public DateTime ReleaseDate { get; set; }
        public int Duration { get; set; }
        public double BasePrice { get; set; }
        public Movie(string title, string genre, DateTime releaseDate, int duration, double basePrice)
        {
            Title = title;
            Genre = genre;
            ReleaseDate = releaseDate;
            Duration = duration;
            BasePrice = basePrice;
        }

        public abstract double RentalPrice();
    }

    public class Horror: Movie
    {
        public Horror(string title, string genre, DateTime releaseDate, int duration, double basePrice) 
            : base(title, genre, releaseDate, duration, basePrice)
        {

        }
        public override double RentalPrice()
        {
            return BasePrice * 0.8;
        }
    }
    public class Romantic : Movie
    {
        public Romantic(string title, string genre, DateTime releaseDate, int duration, double basePrice) 
            : base(title, genre, releaseDate, duration, basePrice)
        {

        }
        public override double RentalPrice()
        {
            return BasePrice * 0.7;
        }
    }
    public class Thriller : Movie
    {
        public Thriller(string title, string genre, DateTime releaseDate, int duration, double basePrice) 
            : base(title, genre, releaseDate, duration, basePrice)
        {

        }
        public override double RentalPrice()
        {
            double price = BasePrice * 0.85;
            if ((DateTime.Now.Year - ReleaseDate.Year) > 5)
            {
                price*=0.9;
            }

            return price;

        }
    }


}
