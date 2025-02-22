using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
     
    public class Rider:User
    {
        public string PrefferedPaymentMethod {  get; set; }
        public NotificationService notificationService { get; set; }

        public List<Rating> ratings = new List<Rating>();

        /* public Rider(int id,string name,string location,double rating,string preferredpayment):base(id,name,location,rating)
         {
             this.PrefferedPaymentMethod = PrefferedPaymentMethod;
         }*/
        public Rider() : base() { }
        public void RequestRide(string Pickup,string dropoff,RideType ridetype)
        {
            Console.WriteLine(Name + " is requesting for a ride.");
            notificationService.SendNotification("Thank you for using our service.You'll soon be assigned a driver.");

        }
        public void RateDriver(Driver driver,double Rating,string feedback) 
        {
            if(Rating<1.0||Rating>5.0)
            { Console.WriteLine("Please rate between 1.0 and 5.0."); }
            else
            {
                ratings.Add(new Rating { user = driver, Value = Rating, Feedback = feedback });

            }
            notificationService.SendNotification("You rated driver " + driver + " with a rating of " + Rating);
            driver.notificationService.SendNotification("You received "+Rating+ " from "+ this.Name);

        }
        public void MakePayment(double amount,PaymentMethod pay)
        {
            pay.ProcessPayment(amount);
            notificationService.SendNotification("Payment is done.");
        }

    }

    /* -_- N4M154 -_- */
}
