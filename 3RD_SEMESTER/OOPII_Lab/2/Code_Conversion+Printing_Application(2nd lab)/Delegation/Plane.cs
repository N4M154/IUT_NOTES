using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegation
{
    internal class Plane:Ticket
    {
        private int flightNumber;
        private int availableSeats;

        public Plane(int flightNumber, int availableSeats)
        {
            this.flightNumber = flightNumber;
            this.availableSeats = availableSeats;
        }
        public Boolean bookTicket(Passenger passenger)
        {
            if (availableSeats > 0)
            {
                 availableSeats --;
                 Console.WriteLine(" Ticket booked for passenger " +
                passenger.getName() + " on flight " + flightNumber);
                 return true;
            }
            else
            {
                Console.WriteLine("No available seats on flight " + flightNumber);
                 return false;
             }
         }

    }
}
