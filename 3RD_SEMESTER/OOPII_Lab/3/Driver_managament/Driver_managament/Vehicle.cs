using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Driver_managament
{
    public class Vehicle
    {
        public string FuelType { get; set; }
        public bool IsDriveable { get; set; }

        

        public virtual void Start()
        {
            Console.WriteLine("Vehicle started.");
        }
        public virtual void Stop() 
        {
            Console.WriteLine("Vehicle stopped."); 
        }
    }
}
