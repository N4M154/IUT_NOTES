using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineReservationSystem
{
    public class FlightReservation : IDisplayClass
    {
        private Flight flight = new Flight();
        private int flightIndexInFlightList;

        public void BookFlight(string flightNo, int numOfTickets, string userID)
        {
            bool isFound = false;
            foreach (var f1 in flight.GetFlightList())
            {
                if (flightNo.Equals(f1.GetFlightNumber(), StringComparison.OrdinalIgnoreCase))
                {
                    foreach (var customer in Customer.CustomerCollection)
                    {
                        if (userID.Equals(customer.UserID, StringComparison.OrdinalIgnoreCase))
                        {
                            isFound = true;
                            f1.SetNoOfSeatsInTheFlight(f1.GetNoOfSeats() - numOfTickets);

                            if (!f1.IsCustomerAlreadyAdded(f1.GetListOfRegisteredCustomersInAFlight(), customer))
                            {
                                f1.AddNewCustomerToFlight(customer);
                            }

                            if (IsFlightAlreadyAddedToCustomerList(customer.FlightsRegisteredByUser, f1))
                            {
                                AddNumberOfTicketsToAlreadyBookedFlight(customer, numOfTickets);
                                if (FlightIndex(flight.GetFlightList(), flight) != -1)
                                {
                                    customer.AddExistingFlightToCustomerList(FlightIndex(flight.GetFlightList(), flight), numOfTickets);
                                }
                            }
                            else
                            {
                                customer.AddNewFlightToCustomerList(f1);
                                AddNumberOfTicketsForNewFlight(customer, numOfTickets);
                            }
                            break;
                        }
                    }
                }
            }

            if (!isFound)
            {
                Console.WriteLine($"Invalid Flight Number...! No flight with the ID \"{flightNo}\" was found...");
            }
            else
            {
                Console.WriteLine($"\n {"",50} You've booked {numOfTickets} tickets for Flight \"{flightNo.ToUpper()}\"...");
            }
        }

        public void CancelFlight(string userID)
        {
            Console.Write("Enter the Flight Number of the Flight you want to cancel : ");
            string flightNum = Console.ReadLine();
            Console.Write("Enter the number of tickets to cancel : ");
            int numOfTickets = int.Parse(Console.ReadLine());

            bool isFound = false;
            foreach (var customer in Customer.CustomerCollection)
            {
                if (userID.Equals(customer.UserID, StringComparison.OrdinalIgnoreCase))
                {
                    if (customer.FlightsRegisteredByUser.Count != 0)
                    {
                        Console.WriteLine("\nList of Flights Registered by You:");
                        DisplayFlightsRegisteredByOneUser(userID);

                        int index = 0;
                        foreach (var flight in customer.FlightsRegisteredByUser)
                        {
                            if (flightNum.Equals(flight.GetFlightNumber(), StringComparison.OrdinalIgnoreCase))
                            {
                                isFound = true;
                                int booked = customer.NumOfTicketsBookedByUser[index];

                                while (numOfTickets > booked)
                                {
                                    Console.Write("ERROR!!! Number of tickets cannot be greater. Enter again: ");
                                    numOfTickets = int.Parse(Console.ReadLine());
                                }

                                if (booked == numOfTickets)
                                {
                                    customer.NumOfTicketsBookedByUser.RemoveAt(index);
                                    customer.FlightsRegisteredByUser.RemoveAt(index);
                                }
                                else
                                {
                                    customer.NumOfTicketsBookedByUser[index] = booked - numOfTickets;
                                }

                                flight.SetNoOfSeatsInTheFlight(flight.GetNoOfSeats() + numOfTickets);
                                break;
                            }
                            index++;
                        }
                    }
                    else
                    {
                        Console.WriteLine($"No Flight Has been Registered by you with ID \"{flightNum.ToUpper()}\".....");
                    }

                    if (!isFound)
                    {
                        Console.WriteLine($"ERROR!!! Couldn't find Flight with ID \"{flightNum.ToUpper()}\".....");
                    }
                }
            }
        }

        private void AddNumberOfTicketsToAlreadyBookedFlight(Customer customer, int numOfTickets)
        {
            int newTickets = customer.NumOfTicketsBookedByUser[flightIndexInFlightList] + numOfTickets;
            customer.NumOfTicketsBookedByUser[flightIndexInFlightList] = newTickets;
        }

        private void AddNumberOfTicketsForNewFlight(Customer customer, int numOfTickets)
        {
            customer.NumOfTicketsBookedByUser.Add(numOfTickets);
        }

        private bool IsFlightAlreadyAddedToCustomerList(List<Flight> flightList, Flight flight)
        {
            for (int i = 0; i < flightList.Count; i++)
            {
                if (flightList[i].GetFlightNumber().Equals(flight.GetFlightNumber(), StringComparison.OrdinalIgnoreCase))
                {
                    flightIndexInFlightList = i;
                    return true;
                }
            }
            return false;
        }

        private int FlightIndex(List<Flight> flightList, Flight flight)
        {
            return flightList.IndexOf(flight);
        }

        private string FlightStatus(Flight flight)
        {
            foreach (var f in flight.GetFlightList())
            {
                if (f.GetFlightNumber().Equals(flight.GetFlightNumber(), StringComparison.OrdinalIgnoreCase))
                {
                    return "As Per Schedule";
                }
            }
            return "Cancelled";
        }

        public string ToString(int serialNum, Flight flights, Customer customer)
        {
            return string.Format("| {0,-5}| {1,-41} | {2,-9} | \t{3,-9} | {4,-21} | {5,-22} | {6,-10}  |   {7,-6}Hrs |  {8,-4}  | {9,-10} |",
                serialNum, flights.GetFlightSchedule(), flights.GetFlightNumber(), customer.NumOfTicketsBookedByUser[serialNum - 1],
                flights.GetFromWhichCity(), flights.GetToWhichCity(), flights.FetchArrivalTime(), flights.GetFlightTime(),
                flights.GetGate(), FlightStatus(flights));
        }

        public string ToString(int serialNum, Customer customer, int index)
        {
            return string.Format("{0,10}| {1,-10} | {2,-10} | {3,-32} | {4,-7} | {5,-27} | {6,-35} | {7,-23} |       {8,-7}  |",
                "", serialNum + 1, customer.RandomIDDisplay(customer.UserID), customer.Name, customer.Age,
                customer.Email, customer.Address, customer.Phone, customer.NumOfTicketsBookedByUser[index]);
        }

        public void DisplayFlightsRegisteredByOneUser(string userID)
        {
            Console.WriteLine();
            Console.WriteLine("+------+-------------------------------------------+-----------+------------------+-----------------------+------------------------+---------------------------+-------------+--------+-----------------+");
            Console.WriteLine("| Num  | FLIGHT SCHEDULE                          | FLIGHT NO |  Booked Tickets  | \tFROM ====>>       | \t====>> TO        | \t    ARRIVAL TIME       | FLIGHT TIME |  GATE  |  FLIGHT STATUS  |");
            Console.WriteLine("+------+-------------------------------------------+-----------+------------------+-----------------------+------------------------+---------------------------+-------------+--------+-----------------+");
            foreach (var customer in Customer.CustomerCollection)
            {
                var f = customer.FlightsRegisteredByUser;
                int size = f.Count;
                if (userID.Equals(customer.UserID, StringComparison.OrdinalIgnoreCase))
                {
                    for (int i = 0; i < size; i++)
                    {
                        Console.WriteLine(ToString(i + 1, f[i], customer));
                        Console.WriteLine("+------+-------------------------------------------+-----------+------------------+-----------------------+------------------------+---------------------------+-------------+--------+-----------------+");
                    }
                }
            }
        }

        public void DisplayHeaderForUsers(Flight flight, List<Customer> customers)
        {
            Console.WriteLine($"\n{new string('+', 65)} Displaying Registered Customers for Flight No. \"{flight.GetFlightNumber()}\" +++++++++++++\n");
            Console.WriteLine($"{new string(' ', 10)}+------------+------------+----------------------------------+---------+-----------------------------+-------------------------------------+-------------------------+----------------+");
            Console.WriteLine($"{new string(' ', 10)}| SerialNum  |   UserID   | Passenger Names                  | Age     | EmailID                   | Home Address                     | Phone Number          | Booked Tickets |");
            Console.WriteLine($"{new string(' ', 10)}+------------+------------+----------------------------------+---------+-----------------------------+-------------------------------------+-------------------------+----------------+");

            for (int i = 0; i < customers.Count; i++)
            {
                Console.WriteLine(ToString(i, customers[i], FlightIndex(customers[i].FlightsRegisteredByUser, flight)));
                Console.WriteLine($"{new string(' ', 10)}+------------+------------+----------------------------------+---------+-----------------------------+-------------------------------------+-------------------------+----------------+");
            }
        }

        public void DisplayRegisteredUsersForAllFlights()
        {
            Console.WriteLine();
            foreach (var f in flight.GetFlightList())
            {
                var customers = f.GetListOfRegisteredCustomersInAFlight();
                if (customers.Count > 0)
                {
                    DisplayHeaderForUsers(f, customers);
                }
            }
        }

        public void DisplayRegisteredUsersForSpecificFlight(string flightNum)
        {
            Console.WriteLine();
            foreach (var f in flight.GetFlightList())
            {
                if (f.GetFlightNumber().Equals(flightNum, StringComparison.OrdinalIgnoreCase))
                {
                    DisplayHeaderForUsers(f, f.GetListOfRegisteredCustomersInAFlight());
                }
            }
        }
    }
}
