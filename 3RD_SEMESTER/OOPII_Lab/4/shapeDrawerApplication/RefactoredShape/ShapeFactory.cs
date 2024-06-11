using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefactoredShape
{
    public static class ShapeFactory
    {
        public static Shape CreateCircle(int x, int y, int radius)
        {
            return new Circle { X = x, Y = y, Radius = radius };
        }

        public static Shape CreateRectangle(int x, int y, int length, int width)
        {
            return new Rectangle { X = x, Y = y, Length = length, Width = width };
        }

        public static Shape CreateSquare(int x, int y, int sideLength)
        {
            return new Square { X = x, Y = y, SideLength = sideLength };
        }
    }
}
