using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineReservationSystem
{
    public interface IDisplayClass
    {
        void DisplayRegisteredUsersForAllFlights();

        void DisplayRegisteredUsersForSpecificFlight(string flightNum);

        void DisplayHeaderForUsers(Flight flight, List<Customer> customers);

        void DisplayFlightsRegisteredByOneUser(string userID);
    }

}
