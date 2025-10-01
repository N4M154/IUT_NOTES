using AirlineReservationSystem;
using System.Globalization;

namespace AirlineReservationSystemTest
{
    public class FlightTest : IDisposable
    {

        //210042112
        /*  Tested Features:
         * - Flight Construction
         * - Scheduling System
         * - Time Calculations  
         * - Distance Math
         * - Flight Management
         */

        private readonly Flight _flight;
        private readonly string[][] _destinations;
        private readonly string[] _distances;

        public FlightTest()
        {
            _destinations = new[]
            {
                new[] { "Mirpur", "23.8223", "90.3654" },
                new[] { "Chittagong", "22.3752", "91.8349" }
            };
            _distances = new[] { "3456.78", "1212.12", "3456.78" };

            string validSchedule = DateTime.Now.ToString("dddd, dd MMMM yyyy, HH:mm tt ", CultureInfo.InvariantCulture);

            _flight = new Flight(validSchedule, "IUT112", 150, _destinations, _distances, "G12");
            _flight.GetFlightList().Clear();
        }

        public void Dispose()
        {
            _flight.GetFlightList().Clear();
        }

        [Fact]
        public void Constructor_ShouldInitializePropertiesCorrectly()
        {
            Assert.Equal("IUT112", _flight.GetFlightNumber());
            Assert.Equal(150, _flight.GetNoOfSeats());
            Assert.Equal("Mirpur", _flight.GetFromWhichCity());
            Assert.Equal("Chittagong", _flight.GetToWhichCity());
        }

        [Fact]
        public void FlightScheduler_ShouldCreate15Flights()
        {
            var flight = new Flight();
            flight.FlightScheduler();
            Assert.Equal(15, flight.GetFlightList().Count);
        }

        [Fact]
        public void CalculateFlightTime_ShouldReturnValidFormat()
        {
            var time = _flight.CalculateFlightTime(500);
            Assert.Matches(@"^\d{2}:\d{2}$", time);
        }

        [Fact]
        public void CalculateDistance_ShouldReturnValidResults()
        {
            var result = _flight.CalculateDistance(12.1212, -12.0012, 21.0042, -112.0042);
            Assert.Equal(3, result.Length);
            Assert.All(result, x => Assert.True(double.TryParse(x, out _)));
        }

        [Fact]
        public void FetchArrivalTime_ShouldReturnValidDateTimeString()
        {
            var arrival = _flight.FetchArrivalTime();
            Assert.NotNull(arrival);
            Assert.NotEmpty(arrival);
            Assert.Matches(@"^\w{3}, \d{2}-\d{2}-\d{4} \d{2}:\d{2} [AP]M$", arrival);
        }

        [Fact]
        public void DeleteFlight_ShouldRemoveFlightFromList()
        {
            _flight.GetFlightList().Add(_flight);
            _flight.DeleteFlight("IUT112");
            Assert.Empty(_flight.GetFlightList());
        }

        [Fact]
        public void DisplayFlightSchedule_ShouldOutputCorrectFormat()
        {
            _flight.GetFlightList().Add(_flight);
            var output = new StringWriter();
            Console.SetOut(output);

            _flight.DisplayFlightSchedule();

            Assert.Contains("FLIGHT SCHEDULE", output.ToString());
            Assert.Contains("IUT112", output.ToString());
        }
    }
}

/*-_- N4M154 -_-*/