using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShapeDrawerApplication
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Shape> shapes = new List<Shape>
        {
            new Circle { X = 10, Y = 10, Radius = 5 },
            new Rectangle { X = 20, Y = 20, Length = 6, Width = 4 },
            new Square { X = 30, Y = 30, SideLength = 8 }
        };

            Canvas canvas = new Canvas();
            canvas.Draw(shapes);
            Console.ReadKey();
        }
    }
}

