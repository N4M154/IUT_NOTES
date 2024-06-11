using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShapeDrawerApplication
{
    public class Circle:Shape
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Radius { get; set; }

        

        public override double CalculateArea()
        {
            return Math.PI * Radius * Radius;
        }
    }
}
