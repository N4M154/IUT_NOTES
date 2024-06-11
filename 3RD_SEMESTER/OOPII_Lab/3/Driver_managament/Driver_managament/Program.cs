using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Driver_managament
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Manager manager = new Manager();

            Vehicle Car = new Driveable { FuelType = "Petrol", IsDriveable = true };
            Vehicle BiCycle = new Rideable { FuelType = "None", IsDriveable= false };

            manager.ManageVehicle(Car);
            Console.WriteLine($"Car uses {Car.FuelType}.");

            Console.WriteLine("---------------------------");

            manager.ManageVehicle(BiCycle);
            Console.WriteLine($"BiCycle uses {BiCycle.FuelType}.");

            Console.ReadKey();

            /*inherit koraite hobe car bus bicycle eshob.driveable and rideable interface hishebe thakbe.ogular vitore method thakbe individual.
             car,bus,bicycle interface k inpmlement korbe.fuel enum hishebe thakbe cause era fixed or static.string dile tintar moddhe
             shimaboddho thakbe na...*/
            /*manager e operate or driveable or something else method...*/




        }
    }
}
