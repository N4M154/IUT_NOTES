using AirlineReservationSystem;
using System.Globalization;

namespace AirlineReservationSystemTest
{
    public class IDisplayClassTests : IDisposable
    {

        //210042112 
        /*  Tested Features:
         * - Flight Registration Display (all flights)
         * - Specific Flight User Display  
         * - User Header Formatting
         * - User-Specific Flight Listing
         */

        private readonly FlightReservation _display;
        private readonly Flight _flight;
        private readonly Customer _customer;
        private readonly StringWriter _consoleOutput;
        private readonly TextWriter _originalOutput;

        public IDisplayClassTests()
        {
            _display = new FlightReservation();

            string validSchedule = DateTime.Now.ToString("dddd, dd MMMM yyyy, HH:mm tt", CultureInfo.InvariantCulture);

            _flight = new Flight(validSchedule, "IUT112", 150, new[] { new[] { "ABC", "12.1212", "-12.0012" }, new[] { "DEF", "42.0012", "-02.1202" } },
                      new[] { "1212.12", "2102.42", "1012.20" }, "A12");

            _customer = new Customer("Namisa", "namisa@najah.com", "123456789", "011111111", "MNO", 28);

            _flight.GetFlightList().Clear();
            _flight.GetFlightList().Add(_flight);
            User.GetCustomersCollection().Clear();
            User.GetCustomersCollection().Add(_customer);

            _originalOutput = Console.Out;
            _consoleOutput = new StringWriter();
            Console.SetOut(_consoleOutput);

            _display.BookFlight("IUT112", 1, _customer.UserID);
        }

        public void Dispose()
        {
            _flight.GetFlightList().Clear();
            User.GetCustomersCollection().Clear();
            Console.SetOut(_originalOutput);
            _consoleOutput.Dispose();
        }

        [Fact]
        public void DisplayRegisteredUsersForAllFlights_ShowsOutput()
        {
            _display.DisplayRegisteredUsersForAllFlights();
            Assert.Contains("Registered Customers", _consoleOutput.ToString());
        }

        [Fact]
        public void DisplayRegisteredUsersForSpecificFlight_ShowsOutput()
        {
            _display.DisplayRegisteredUsersForSpecificFlight("IUT112");
            Assert.Contains("IUT112", _consoleOutput.ToString());
        }

        [Fact]
        public void DisplayHeaderForUsers_ShowsCorrectFormat()
        {
            _display.DisplayHeaderForUsers(_flight, new List<Customer> { _customer });
            Assert.Contains("Passenger Names", _consoleOutput.ToString());
        }

        [Fact]
        public void DisplayFlightsRegisteredByOneUser_ShowsOutput()
        {
            _display.DisplayFlightsRegisteredByOneUser(_customer.UserID);
            Assert.Contains("IUT112", _consoleOutput.ToString());
        }
    }
}

/*-_- N4M154 -_-*/