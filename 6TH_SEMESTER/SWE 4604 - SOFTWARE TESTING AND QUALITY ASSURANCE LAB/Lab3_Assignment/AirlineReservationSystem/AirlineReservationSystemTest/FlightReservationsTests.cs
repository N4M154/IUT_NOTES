using AirlineReservationSystem;
using System.Globalization;

namespace AirlineReservationSystemTest
{
    public class FlightReservationTests : IDisposable
    {

        //210042112
        /*  Tested Features:
         * - Flight Booking (seat reduction)
         * - Customer Flight Registration  
         * - Flight Cancellation (seat restoration)
         * - User-Specific Flight Display
         * - Flight-Specific User Display
         */

        private readonly FlightReservation _reservation;
        private readonly Flight _flight;
        private readonly Customer _customer;
        private readonly StringWriter _consoleOutput;
        private readonly TextWriter _originalOutput;

        public FlightReservationTests()
        {
            _reservation = new FlightReservation();

            string validSchedule = DateTime.Now.ToString("dddd, dd MMMM yyyy, HH:mm tt ", CultureInfo.InvariantCulture);

            _flight = new Flight(validSchedule, "IUT112", 112,
                      new[] { new[] { "Mirpur", "23.8223", "90.3654" }, new[] { "Chittagong", "22.3752", "91.8349" } },
                      new[] { "3456.78", "1212.12", "3456.78" }, "G12");

            _customer = new Customer("Namisa Najah", "namisa@najah.com", "789123456", "077777777", "IJK", 24);

            _flight.GetFlightList().Clear();
            _flight.GetFlightList().Add(_flight);
            User.GetCustomersCollection().Clear();
            User.GetCustomersCollection().Add(_customer);

            _originalOutput = Console.Out;
            _consoleOutput = new StringWriter();
            Console.SetOut(_consoleOutput);
        }

        public void Dispose()
        {
            _flight.GetFlightList().Clear();
            User.GetCustomersCollection().Clear();
            Console.SetOut(_originalOutput);
            _consoleOutput.Dispose();
        }

        [Fact]
        public void BookFlight_ShouldReduceAvailableSeats()
        {
            var initialSeats = _flight.GetNoOfSeats();
            _reservation.BookFlight("IUT112", 2, _customer.UserID);
            Assert.Equal(initialSeats - 2, _flight.GetNoOfSeats());
        }

        [Fact]
        public void BookFlight_ShouldAddFlightToCustomer()
        {
            _reservation.BookFlight("IUT112", 1, _customer.UserID);
            Assert.Single(_customer.FlightsRegisteredByUser);
            Assert.Single(_customer.NumOfTicketsBookedByUser);
        }

        [Fact]
        public void CancelFlight_ShouldIncreaseAvailableSeats()
        {
            _reservation.BookFlight("IUT112", 2, _customer.UserID);
            var seatsBefore = _flight.GetNoOfSeats();

            // This is a Mock user input
            var input = new StringReader("IUT112\n2\n");
            Console.SetIn(input);

            _reservation.CancelFlight(_customer.UserID);

            Assert.Equal(seatsBefore + 2, _flight.GetNoOfSeats());
        }

        [Fact]
        public void DisplayFlightsRegisteredByOneUser_ShouldShowCorrectOutput()
        {
            _reservation.BookFlight("IUT112", 1, _customer.UserID);
            _reservation.DisplayFlightsRegisteredByOneUser(_customer.UserID);
            Assert.Contains("IUT112", _consoleOutput.ToString());
        }

        [Fact]
        public void DisplayRegisteredUsersForSpecificFlight_ShouldShowCorrectOutput()
        {
            _reservation.BookFlight("IUT112", 1, _customer.UserID);
            _reservation.DisplayRegisteredUsersForSpecificFlight("IUT112");
            Assert.Contains("Namisa Najah", _consoleOutput.ToString());
        }
    }

    /*-_- N4M154 -_-*/
}