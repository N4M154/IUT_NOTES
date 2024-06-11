using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShapeDrawerApplication
{
    public class Rectangle : Shape
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }

        public override double CalculateArea()
        {
            return Length * Width;
        }
    }
}
