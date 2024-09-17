using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    public class Admin
    {
        public int AdminID {  get; set; }
        public string AdminName { get; set; }
        public string Role {  get; set; }

        public List<Driver> drivers { get; set; }
        public List<Trip> trips { get; set; }
        public List<Rider> riders { get; set; }

        public Admin() { }
        public void ManageDriver() 
        {
            foreach(var driver in drivers)
            {
                Console.WriteLine("ID: "+driver.ID);
                Console.WriteLine("Name: " + driver.Name);
                Console.WriteLine("Rating: " + driver.Rating);
                Console.WriteLine("Location: " + driver.Location);
                Console.WriteLine("Vehicle Type: " + driver.VehicleType);
                Console.WriteLine("Availablity: " + driver.IsAvailable);
            }
            

        }
        public void ManageRider()
        {
            foreach (var rider in riders)
            {
                Console.WriteLine("ID: " + rider.ID);
                Console.WriteLine("Name: " + rider.Name);
                Console.WriteLine("Rating: " + rider.Rating);
                Console.WriteLine("Location: " + rider.Location);
                Console.WriteLine("Payment Method: " + rider.PrefferedPaymentMethod);
            }
        }
        public void ViewTripHistory()
        {
            foreach (var trip in trips)
            {
                Console.WriteLine("picked up from " + trip.PickupLocation + ". And dropped off at " + trip.DropoffLocation + ". Fare: "+trip.Fare);

            }
        }

        public void HandleDispute(Rider rider,Driver driver,string DisputeStatement)
        {
           
            Console.WriteLine("The dispute between "+rider+" and "+driver+" has been sorted.");
        }
    }
    /* -_- N4M154 -_- */
}
