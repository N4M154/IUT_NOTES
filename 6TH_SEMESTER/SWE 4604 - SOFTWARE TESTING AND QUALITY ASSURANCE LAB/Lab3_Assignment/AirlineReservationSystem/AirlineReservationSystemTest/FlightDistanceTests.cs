using AirlineReservationSystem;

namespace AirlineReservationSystemTest
{
    public class FlightDistanceTests
    {

        //210042112
        /*  Tested Features:
         * - Distance Calculation (valid results)
         * - Measurement Guidelines Display
         */


        private readonly FlightDistance _distance;

        public FlightDistanceTests()
        {
            _distance = new Flight();
        }

        [Fact]
        public void CalculateDistance_ShouldReturnValidResults()
        {
            var result = _distance.CalculateDistance(12.0112, -12.2142, 21.0042, -112.2104);
            Assert.Equal(3, result.Length);
            Assert.All(result, x => Assert.True(double.TryParse(x, out _)));
        }

        [Fact]
        public void DisplayMeasurementInstructions_OutputsGuidelines()
        {
            var output = new StringWriter();
            Console.SetOut(output);

            _distance.DisplayMeasurementInstructions();

            Assert.Contains("GUIDELINES", output.ToString());
            Assert.Contains("Distance", output.ToString());
        }
    }
}
/*-_- N4N154 -_-*/
