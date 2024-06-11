using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefactoredShape
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Shape> shapes = new List<Shape>
        {
            ShapeFactory.CreateCircle(10, 10, 5),
            ShapeFactory.CreateRectangle(20, 20, 6, 4),
            ShapeFactory.CreateSquare(30, 30, 8)
        };

            Canvas canvas = new Canvas();
            canvas.Draw(shapes);
            Console.ReadKey();
        }
    }
}
