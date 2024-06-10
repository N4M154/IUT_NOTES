using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegation
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Passenger passenger1 = new Passenger(1, " Alice ");
            Passenger passenger2 = new Passenger(2, " Bob ");
           
            Train train = new Train(123, 50);
            Plane plane = new Plane(456, 100);
        
            BookingManagement.bookTicket(train, passenger1);
            BookingManagement.bookTicket(plane, passenger2);
            Console.ReadLine();

        }
    }
}
