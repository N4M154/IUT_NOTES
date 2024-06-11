using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShapeDrawerApplication
{
    public class Square:Shape
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int SideLength { get; set; }

        public override double CalculateArea()
        {
            return SideLength * SideLength;
        }
    }
}
