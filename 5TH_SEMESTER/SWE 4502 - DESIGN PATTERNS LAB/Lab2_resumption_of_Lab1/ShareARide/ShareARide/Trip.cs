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
        public Rider rider { get; set; }

        public NotificationService notificationService;
        public PaymentMethod paymentMethod;




        public Trip(NotificationService notificationService) { this.notificationService = notificationService; }
        public void ProcessPayment()
        {
            Fare = calculateFare(Distance); 

            Console.WriteLine("The fare for this trip is: " + Fare);
            Console.WriteLine("Your current payment method is: " + rider.PrefferedPaymentMethod);
            Console.WriteLine("Would you like to change your payment method? (yes/no)");
            string userInput = Console.ReadLine()?.ToLower();

            if (userInput == "yes")
            {
                Console.WriteLine("Choose your new payment method: 1. CreditCard 2. PayPal 3. DigitalWallet");
                string choice = Console.ReadLine();

                switch (choice)
                {
                    case "1":
                        rider.ChangePaymentMethod(new CreditCard(), "CreditCard");
                        break;
                    case "2":
                        rider.ChangePaymentMethod(new PayPal(), "PayPal");
                        break;
                    case "3":
                        rider.ChangePaymentMethod(new DigitalWallet(), "DigitalWallet");
                        break;
                    default:
                        Console.WriteLine("Invalid choice, using current payment method.");
                        break;
                }
            }

            rider.MakePayment(Fare);
            notificationService.SendNotification("Payment for the trip is completed.");
        }

        public void completeTrip()
        {
            Status = "Trip completed";
            ProcessPayment();
            notificationService.SendNotification("Trip is complete.");
        }

        public void assignDriver(Driver driver)
        {
            

            AssignedDriver = driver;
            Status = "Driver assigned";
            //notificationService.SendNotification("You've been assigned a driver");

        }

        public double calculateFare(double Distance)
        {
            return Distance * RideType.FareCoefficient();
        }


    }
    /* -_- N4M154 -_- */
}
