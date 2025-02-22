using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    public class RideType
    {
        public string Type;
       //public double Distance;

        public RideType() { }

/*        public double FareCoefficient(string type)
        {
            if (type == "Carpool")
            {
                return 2.0;
            }
            else if (type == "Luxury")
            {
                return 3.0;
            }
            else if (type == "Bike")
            {
                return 1.5;
            }
            else
            {
                return 1.0;
            }

        }
*/
        
        public double FareCoefficient()
        {
            switch(Type)
            {
                case "Carpool": return 3.0;
                case "Luxury": return 5.0;
                case "Bike": return 2.0;
                default: return 1.0;
            }
        }

    }
    /* -_- N4M154 -_- */
}
