using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineReservationSystem
{
    public class RandomGenerator
    {
        private string randomNum;

        // Generate a random ID with minimum value of 20000
        public void RandomIDGen()
        {
            Random rand = new Random();
            int id = rand.Next(1000000);

            while (id < 20000)
            {
                id = rand.Next(1000000);
            }

            SetRandomNum(id.ToString());
        }

        // Randomly selects two different cities as destination and origin
        public string[][] RandomDestinations()
        {
            var rand = new Random();
            var destinations = DestinationsData.Destinations;

            int index1 = rand.Next(destinations.Count);
            int index2;

            do
            {
                index2 = rand.Next(destinations.Count);
            } while (index2 == index1);

            string[][] chosenDestinations = new string[2][];
            chosenDestinations[0] = destinations[index1];
            chosenDestinations[1] = destinations[index2];

            return chosenDestinations;
        }

        // Generate number of seats between 75 and 500
        public int RandomNumOfSeats()
        {
            var rand = new Random();
            int seats = rand.Next(500);

            while (seats < 75)
            {
                seats = rand.Next(500);
            }

            return seats;
        }

        // Generate a flight number like "abcde-25"
        public string RandomFlightNumberGen(int letterCount, int divisible)
        {
            var rand = new Random();
            var sb = new StringBuilder();

            for (int i = 0; i < letterCount; i++)
            {
                char ch = (char)(rand.Next(26) + 'a');
                sb.Append(ch);
            }

            sb.Append("-").Append(RandomNumOfSeats() / divisible);
            return sb.ToString();
        }

        // Setter
        public void SetRandomNum(string value)
        {
            randomNum = value;
        }

        // Getter
        public string GetRandomNumber()
        {
            return randomNum;
        }
    }
}
