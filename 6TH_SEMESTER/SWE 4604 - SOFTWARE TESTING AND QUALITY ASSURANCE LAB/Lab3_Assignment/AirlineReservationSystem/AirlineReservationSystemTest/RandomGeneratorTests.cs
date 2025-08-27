using AirlineReservationSystem;

namespace AirlineReservationSystemTest
{
    public class RandomGeneratorTests
    {
        //210042112
        /*  Tested Features:
         * - Random ID Generation (ensures IDs ≥ 20000)
         * - Destination Selection (guarantees unique city pairs) 
         * - Seat Count Generation (validates 75 ≤ seats ≤ 500)
         * - Flight Number Formatting ("minuscule-digits" pattern)
         */

        private readonly RandomGenerator _generator;

        public RandomGeneratorTests()
        {
            _generator = new RandomGenerator();
        }

        [Fact]
        public void RandomIDGen_ShouldCreateValidID()
        {
            _generator.RandomIDGen();
            var id = _generator.GetRandomNumber();
            Assert.NotNull(id);
            Assert.True(int.Parse(id) >= 20000);
        }

        [Fact]
        public void RandomDestinations_ShouldReturnTwoDifferentCities()
        {
            var result = _generator.RandomDestinations();
            Assert.NotEqual(result[0][0], result[1][0]); // two destinations must not be the same ones 
        }

        [Fact]
        public void RandomNumOfSeats_ShouldReturnValidNumber()
        {
            var seats = _generator.RandomNumOfSeats();
            Assert.InRange(seats, 75, 500);
        }

        [Fact]
        public void RandomFlightNumberGen_ShouldReturnValidFormat()
        {
            var flightNum = _generator.RandomFlightNumberGen(2, 1);
            Assert.Matches(@"^[a-z]{2}-\d+$", flightNum); // 2 minuscules '-' digits
        }
    }
}
/* -_- N4M154 -_-*/