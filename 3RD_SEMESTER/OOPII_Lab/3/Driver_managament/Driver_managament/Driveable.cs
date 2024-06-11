using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Driver_managament
{
    public class Driveable:Vehicle
    {
        public override void Start()
        {
            Console.WriteLine("Driveable vehicle started.");
        }
        public override void Stop() 
        { 
            Console.WriteLine("Driveable vehicle stopped."); 
        }

        public void Accelerate()
        {
            Console.WriteLine("Driveable vehicle accelerated.");
        }
    }
}
