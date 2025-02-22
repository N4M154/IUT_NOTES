using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    internal class Program
    {
        static void Main(string[] args)
        {
            NotificationService sms = new SMS();
            NotificationService email = new Email();
            NotificationService inApp = new InApp();

            
            PaymentMethod creditCard = new CreditCard();
            PaymentMethod paypal = new PayPal();
            PaymentMethod digitalWallet = new DigitalWallet();

            
            Rider rider = new Rider
            {
                ID = 1,
                Name = "AAA",
                Location = "AAXX",
                Rating = 4.5,
                PrefferedPaymentMethod = "CreditCard",
                notificationService = sms
            };

            Driver driver = new Driver
            {
                ID = 2,
                Name = "BBB",
                Location = "BBYY",
                Rating = 4.7,
                VehicleType = "Sedan",
                notificationService = email
            };

            
            Admin admin = new Admin
            {
                AdminID = 101,
                AdminName = "CCC",
                Role = "SuperAdmin",
                drivers = new List<Driver> { driver },
                riders = new List<Rider> { rider },
                trips = new List<Trip>()
            };

            
            rider.RequestRide("Chader Desh", "mongol Groho", new RideType { Type = "Luxury" });

        
            rider.RateDriver(driver, 5.0, "good driver.");

            
            rider.MakePayment(50.0, creditCard);

            
            Trip trip = new Trip 
            {
                PickupLocation = "UUU",
                DropoffLocation = "III",
                Fare = 50.0
            };
            driver.AcceptRide(trip);

           
            driver.StartTrip();

            
            admin.ViewTripHistory();

            
            admin.HandleDispute(rider, driver, "Issue with ride quality.");
            Console.ReadKey();

        

    }
    }
    /* -_- N4M154 -_- */
}
