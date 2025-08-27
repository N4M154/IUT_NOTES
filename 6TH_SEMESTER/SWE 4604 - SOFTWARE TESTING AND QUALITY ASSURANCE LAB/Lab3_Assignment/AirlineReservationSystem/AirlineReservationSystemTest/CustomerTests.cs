using AirlineReservationSystem;

namespace AirlineReservationSystemTest
{
    public class CustomerTests
    {

        //210042112

        /*   Tested Features:
         * - Customer Constructor 
         * - Email Validation   
         * - Flight Management 
         * - User Deletion      
         * - String Formatting 
         */

        // method created to get a test customer
        private Customer CreateTestCustomer()
        {
            return new Customer("Namisa Najah", "namisa.najah@gmail.com", "wingardium leviosa", "01700235", "112 IUT", 23);
        }


        [Fact]
        public void Customer_ConstructorInitializesProperties()
        {
            var customer = new Customer("Namisa Najah", "namisa@najah.com", "123456789", "0123456789", "AAA", 23);

            Assert.Equal("Namisa Najah", customer.Name);
            Assert.Equal("namisa@najah.com", customer.Email);
            Assert.Equal("0123456789", customer.Phone);
            Assert.Equal("AAA", customer.Address);
            Assert.Equal(23, customer.Age);
            Assert.NotNull(customer.UserID);
            Assert.Equal("123456789", customer.Password);
        }

        [Fact]
        public void IsEmailAlreadyRegistered_ShouldReturnTrueForExistingEmail()
        {
            var customer1 = new Customer("Namisa", "namisa@najah.com", "789456123", "0134679258", "BBB", 25);
            Customer.CustomerCollection.Add(customer1);

            var result = customer1.IsEmailAlreadyRegistered("namisa@najah.com");

            Assert.True(result);
        }

        [Fact]
        public void IsEmailAlreadyRegistered_ShouldReturnFalseForNewEmail()
        {
            var customer1 = new Customer("Najah", "namisa@najah.com", "167945328", "0789456123", "CCC", 22);
            Customer.CustomerCollection.Add(customer1);

            var result = customer1.IsEmailAlreadyRegistered("new@gmail.com");

            Assert.False(result);
        }

        [Fact]
        public void ToFormattedString_ShouldReturnCorrectFormat()
        {
            var customer = new Customer("Namisa Najah", "namisa@najah.com", "open sesame", "1954684320", "DDD", 20);

            var result = customer.ToFormattedString(1);

            Assert.Contains("Namisa Najah", result);
            Assert.Contains("namisa@najah.com", result);
            Assert.Contains("20", result);
        }

        [Fact]
        public void AddNewFlightToCustomerList_ShouldAddFlightCorrectly()
        {
            var customer = CreateTestCustomer();

            var random = new Random();
            var destinations = DestinationsData.Destinations; // from DestinationData.cs

            // picking two random places
            int index1 = random.Next(destinations.Count);
            int index2;
            do
            {
                index2 = random.Next(destinations.Count);
            } while (index2 == index1);

            string[][] chosenDestinations = new string[2][];
            chosenDestinations[0] = destinations[index1];
            chosenDestinations[1] = destinations[index2];

            var flight = new Flight();
            var distanceBetweenTheCities = flight.CalculateDistance(
                double.Parse(chosenDestinations[0][1]),
                double.Parse(chosenDestinations[0][2]),
                double.Parse(chosenDestinations[1][1]),
                double.Parse(chosenDestinations[1][2])
            );

            var testFlight = new Flight("Tuesday, 01 July 2025, 08:00 AM", "IUT112", 112, chosenDestinations, distanceBetweenTheCities, "D3");

            customer.AddNewFlightToCustomerList(testFlight);

            Assert.Single(customer.FlightsRegisteredByUser);
            Assert.Equal("IUT112", customer.FlightsRegisteredByUser[0].GetFlightNumber());
        }

        [Fact]
        public void AddExistingFlightToCustomerList_ShouldUpdateTicketCountCorrectly()
        {
            var customer = CreateTestCustomer();
            customer.NumOfTicketsBookedByUser.Add(1); // Initial ticket count

            customer.AddExistingFlightToCustomerList(0, 2); // Adding 2 more tickets

            Assert.Equal(3, customer.NumOfTicketsBookedByUser[0]);
        }


        [Fact]
        public void DeleteUser_ShouldRemoveCustomerFromCollection()
        {
            var customer = CreateTestCustomer();
            Customer.CustomerCollection.Add(customer);
            var initialCount = Customer.CustomerCollection.Count;

            customer.DeleteUser(customer.UserID);

            Assert.Equal(initialCount - 1, Customer.CustomerCollection.Count);
            Customer.CustomerCollection.Clear();
        }
    }
}
/* -_- N4M154 -_- */