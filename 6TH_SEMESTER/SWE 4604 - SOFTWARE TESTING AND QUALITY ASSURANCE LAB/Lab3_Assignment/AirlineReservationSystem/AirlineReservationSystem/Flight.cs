using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineReservationSystem
{
    public class Flight : FlightDistance
    {
        // Fields
        private readonly string flightSchedule;
        private readonly string flightNumber;
        private readonly string fromWhichCity;
        private readonly string gate;
        private readonly string toWhichCity;
        private double distanceInMiles;
        private double distanceInKm;
        private string flightTime;
        private int numOfSeatsInTheFlight;
        private List<Customer> listOfRegisteredCustomersInAFlight;
        private int customerIndex;
        private static int nextFlightDay = 0;
        private static readonly List<Flight> flightList = new List<Flight>();

        // Constructors
        public Flight()
        {
            flightSchedule = null;
            flightNumber = null;
            numOfSeatsInTheFlight = 0;
            fromWhichCity = null;
            toWhichCity = null;
            gate = null;
        }

        public Flight(string flightSchedule, string flightNumber, int numOfSeatsInTheFlight,
            string[][] chosenDestinations, string[] distanceBetweenTheCities, string gate)
        {
            this.flightSchedule = flightSchedule;
            this.flightNumber = flightNumber;
            this.numOfSeatsInTheFlight = numOfSeatsInTheFlight;
            fromWhichCity = chosenDestinations[0][0];
            toWhichCity = chosenDestinations[1][0];
            distanceInMiles = double.Parse(distanceBetweenTheCities[0]);
            distanceInKm = double.Parse(distanceBetweenTheCities[1]);
            flightTime = CalculateFlightTime(distanceInMiles);
            listOfRegisteredCustomersInAFlight = new List<Customer>();
            this.gate = gate;
        }

        // Methods

        public void FlightScheduler()
        {
            int numOfFlights = 15;
            RandomGenerator r1 = new RandomGenerator();
            for (int i = 0; i < numOfFlights; i++)
            {
                var chosenDestinations = r1.RandomDestinations();
                var distanceBetweenTheCities = CalculateDistance(
                    double.Parse(chosenDestinations[0][1]), double.Parse(chosenDestinations[0][2]),
                    double.Parse(chosenDestinations[1][1]), double.Parse(chosenDestinations[1][2])
                );
                string schedule = CreateNewFlightsAndTime();
                string number = r1.RandomFlightNumberGen(2, 1).ToUpper();
                int seats = r1.RandomNumOfSeats();
                string gate = r1.RandomFlightNumberGen(1, 30).ToUpper();

                flightList.Add(new Flight(schedule, number, seats, chosenDestinations, distanceBetweenTheCities, gate));
            }
        }

        public void AddNewCustomerToFlight(Customer customer)
        {
            listOfRegisteredCustomersInAFlight.Add(customer);
        }

        public void AddTicketsToExistingCustomer(Customer customer, int numOfTickets)
        {
            customer.AddExistingFlightToCustomerList(customerIndex, numOfTickets);
        }

        public bool IsCustomerAlreadyAdded(List<Customer> customersList, Customer customer)
        {
            for (int i = 0; i < customersList.Count; i++)
            {
                if (customersList[i].UserID.Equals(customer.UserID))
                {
                    customerIndex = i;
                    return true;
                }
            }
            return false;
        }

        public string CalculateFlightTime(double distance)
        {
            double groundSpeed = 450.0;
            double time = distance / groundSpeed;
            int hours = (int)time;
            int minutes = (int)((time - hours) * 60);
            int mod = minutes % 5;

            if (mod < 3) minutes -= mod;
            else minutes += (5 - mod);

            if (minutes >= 60)
            {
                minutes -= 60;
                hours++;
            }

            return $"{hours:D2}:{minutes:D2}";
        }

        public string FetchArrivalTime()
        {
            DateTime departureTime = DateTime.ParseExact(flightSchedule, "dddd, dd MMMM yyyy, HH:mm tt ", CultureInfo.InvariantCulture);
            var timeParts = flightTime.Split(':');
            int hours = int.Parse(timeParts[0]);
            int minutes = int.Parse(timeParts[1]);

            DateTime arrivalTime = departureTime.AddHours(hours).AddMinutes(minutes);
            return arrivalTime.ToString("ddd, dd-MM-yyyy HH:mm tt");
        }

        public void DeleteFlight(string flightNumber)
        {
            var flight = flightList.FirstOrDefault(f => f.flightNumber.Equals(flightNumber, StringComparison.OrdinalIgnoreCase));
            if (flight != null)
            {
                flightList.Remove(flight);
            }
            else
            {
                Console.WriteLine("Flight with given Number not found...");
            }
            DisplayFlightSchedule();
        }

        public override string[] CalculateDistance(double lat1, double lon1, double lat2, double lon2)
        {
            double theta = lon1 - lon2;
            double distance = Math.Sin(DegreeToRadian(lat1)) * Math.Sin(DegreeToRadian(lat2)) +
                              Math.Cos(DegreeToRadian(lat1)) * Math.Cos(DegreeToRadian(lat2)) *
                              Math.Cos(DegreeToRadian(theta));
            distance = Math.Acos(distance);
            distance = RadianToDegree(distance);
            distance *= 60 * 1.1515;

            return new string[]
            {
            (distance * 0.8684).ToString("F2"),
            (distance * 1.609344).ToString("F2"),
            Math.Round(distance, 2).ToString()
            };
        }

        private double DegreeToRadian(double deg) => deg * Math.PI / 180.0;
        private double RadianToDegree(double rad) => rad * 180.0 / Math.PI;

        public void DisplayFlightSchedule()
        {
            Console.WriteLine();
            Console.WriteLine("+------+-------------------------------------------+-----------+------------------+-----------------------+------------------------+---------------------------+-------------+--------+------------------------+");
            Console.WriteLine("| Num  | FLIGHT SCHEDULE                           | FLIGHT NO | Available Seats  | FROM ====>>           | ====>> TO              | ARRIVAL TIME              | FLIGHT TIME |  GATE  | DISTANCE(MILES/KMS)   |");
            Console.WriteLine("+------+-------------------------------------------+-----------+------------------+-----------------------+------------------------+---------------------------+-------------+--------+------------------------+");

            for (int i = 0; i < flightList.Count; i++)
            {
                Console.WriteLine(flightList[i].ToString(i + 1));
                Console.WriteLine("+------+-------------------------------------------+-----------+------------------+-----------------------+------------------------+---------------------------+-------------+--------+------------------------+");
            }
        }

        public string CreateNewFlightsAndTime()
        {
            Random rand = new Random();
            nextFlightDay += rand.Next(1, 7);
            DateTime dt = DateTime.Now.AddDays(nextFlightDay).AddHours(nextFlightDay).AddMinutes(rand.Next(0, 60));
            dt = GetNearestHourQuarter(dt);
            return dt.ToString("dddd, dd MMMM yyyy, HH:mm tt ");
        }

        public DateTime GetNearestHourQuarter(DateTime dt)
        {
            int minutes = dt.Minute;
            int mod = minutes % 15;

            if (mod < 8)
                dt = dt.AddMinutes(-mod);
            else
                dt = dt.AddMinutes(15 - mod);

            return new DateTime(dt.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, 0);
        }

        public override string ToString()
        {
            return ToString(0);
        }

        public override string ToString(int i)
        {
            return string.Format("| {0,-5}| {1,-41} | {2,-9} | \t{3,-9} | {4,-21} | {5,-22} | {6,-25} | {7,-9} | {8,-6} | {9,-8} / {10,-11}|",
                i, flightSchedule, flightNumber, numOfSeatsInTheFlight, fromWhichCity, toWhichCity,
                FetchArrivalTime(), flightTime + "Hrs", gate, distanceInMiles.ToString("F2"), distanceInKm.ToString("F2"));
        }

        // Getters
        public int GetNoOfSeats() => numOfSeatsInTheFlight;
        public string GetFlightNumber() => flightNumber;
        public void SetNoOfSeatsInTheFlight(int seats) => numOfSeatsInTheFlight = seats;
        public string GetFlightTime() => flightTime;
        public List<Flight> GetFlightList() => flightList;
        public List<Customer> GetListOfRegisteredCustomersInAFlight() => listOfRegisteredCustomersInAFlight;
        public string GetFlightSchedule() => flightSchedule;
        public string GetFromWhichCity() => fromWhichCity;
        public string GetGate() => gate;
        public string GetToWhichCity() => toWhichCity;
    }
}
