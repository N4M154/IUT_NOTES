using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieRental
{
    /*genre:horror,romantic,thriller and others
each movie: title,genre,release date,duration
horror:20%
romantic:30%      //discount on the base price
thriller:15%    

thriller>5 yrs old-->15+10 %

base price is decided by the rental service.*/
    public class Movie
    {
        public string Title { get; set; }
        public string Genre { get; set; }
       
        public DateTime ReleaseDate { get; set; }
        public int Duration { get; set; }
        public double BasePrice { get; set; }

        

       public Movie(string title,string genre,DateTime releasedate,int duration,double baseprice)
        {
            this.Title= title;
            this.Genre = genre;
            this.ReleaseDate = releasedate;
            this.Duration = duration;
            this.BasePrice = baseprice;
        }

        public double RentalPrice()
        {
            double discountedPrice = BasePrice;
            if(Genre=="Horror")
            {
                discountedPrice = BasePrice * 0.8; 
            }
            else if(Genre=="Romantic")
            {
                discountedPrice = BasePrice * 0.7;
            }
            else if(Genre=="Thriller")
            {
                discountedPrice = BasePrice * 0.85;
                if((DateTime.Now.Year - ReleaseDate.Year) > 5)
                {
                    discountedPrice *= 0.9;
                }
                
            }
            return discountedPrice;

        }
        

       
    }
}
