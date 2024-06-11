using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Driver_managament
{
    public class Manager
    {
        public void ManageVehicle(Vehicle vehicle)
        {
            if(vehicle is Driveable driveable)
            {
                Console.WriteLine("vehicle is driveable.");
                driveable.Start();
                driveable.Stop();
                driveable.Accelerate();

            }
            else
            {
                Console.WriteLine("vehicle is not driveable.It is rideable.");
                vehicle.Start();
                vehicle.Stop();
            }
           
           /* vehicle.Start();
            if(vehicle is Driveable driveable)
            {
                driveable.Accelerate();
            }
            vehicle.Stop();*/

        }
    }
}
