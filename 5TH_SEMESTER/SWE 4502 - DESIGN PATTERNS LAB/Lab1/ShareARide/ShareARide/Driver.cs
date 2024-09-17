using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Globalization;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    public class Driver:User
    {
        public string VehicleType { get; set; }
        public bool IsAvailable = true;
        public NotificationService notificationService { get; set; }
        public List<Rating> ratings =new List<Rating>();
        

        /* public Driver(int id, string name,string location,double rating,string vehicletype*//*, bool available*//*) :base(id,name,location,rating)
         {
             this.VehicleType = VehicleType;
             this.IsAvailable = true;
         }*/
        public Driver() : base() { }

        public void AcceptRide(Trip trip)
        {
            if(!IsAvailable)
            {
                Console.WriteLine(this.Name + " is not available at this moment.");
                return;
            }
            else
            {
                trip.assignDriver(this);
                //then
                IsAvailable = false;//cause they accepted the request
                
                notificationService.SendNotification("You have accepted the request.");
            }
        }
        public void RateRider(Rider rider,double Rating,string feedback)
        {
            if (Rating < 1.0 || Rating > 5.0)
            { Console.WriteLine("Please rate between 1.0 and 5.0."); }
            else
            {
                ratings.Add(new Rating { user = rider,Value = Rating,Feedback = feedback });

            }
            notificationService.SendNotification("You rated driver " + rider + " with a rating of " + Rating);
            rider.notificationService.SendNotification("You received " + Rating + " from " + this.Name);
        }
        
        public void StartTrip()
        {
            Console.WriteLine("The trip has started");
        }



        




    }
    /* -_- N4M154 -_- */
}
