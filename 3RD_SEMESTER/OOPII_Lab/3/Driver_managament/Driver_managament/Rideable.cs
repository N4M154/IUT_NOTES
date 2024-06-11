using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Driver_managament
{
    public class Rideable:Vehicle
    {
        public override void Start()
        {
            Console.WriteLine("Rideable vehicle started.");
        }
        public override void Stop() 
        {
            Console.WriteLine("Rideable vehicle stopped.");
        }
    }
}
