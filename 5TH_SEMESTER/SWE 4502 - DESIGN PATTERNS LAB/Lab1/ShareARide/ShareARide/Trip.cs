using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    public class Trip
    {
        public int TripId { get; set; }
        public string PickupLocation { get; set; }
        public string DropoffLocation {  get; set; }
        public string Status { get; set; }
        public RideType RideType { get; set; }
        public double Distance { get; set; }
        public double Fare { get; set; }

        public Driver AssignedDriver { get; set; }
        public NotificationService notificationService;
        public PaymentMethod paymentMethod;




        public Trip() { }

        public void completeTrip()
        {
            Status = "Trip completed";
            paymentMethod.ProcessPayment(Fare);
            notificationService.SendNotification("Trip is complete.");
        }

        public void assignDriver(Driver driver)
        {
            

            AssignedDriver = driver;
            Status = "Driver assigned";
            notificationService.SendNotification("You've been assigned a driver");

        }

        public double calculateFare(double Distance)
        {
            return Distance * RideType.FareCoefficient();
        }


    }
    /* -_- N4M154 -_- */
}
