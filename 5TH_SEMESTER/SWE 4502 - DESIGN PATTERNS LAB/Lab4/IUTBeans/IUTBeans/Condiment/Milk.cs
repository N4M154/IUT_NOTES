using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IUTBeans
{
    internal class Milk:ICondiment
    {
        

        public string Name()
        {
            return "Milk";
        }

        public double Price()
        {
            return 20.00;
        }
    }
}
