using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IUTBeans
{
    internal class WhippedCream:ICondiment
    {
        

        public string Name()
        {
            return "Whipped Cream";
        }

        public double Price()
        {
            return 30.00;
        }
    }
}
