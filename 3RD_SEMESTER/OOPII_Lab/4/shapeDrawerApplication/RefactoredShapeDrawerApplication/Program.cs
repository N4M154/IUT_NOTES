using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefactoredShapeDrawerApplication
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<DrawableShape> shapes = new List<DrawableShape>
        {
            new Circle(3, 4, 5),
            new Rectangle(1, 2, 3, 4),
            new Square(5, 6, 7)
        };

            Canvas canvas = new Canvas();
            foreach (var shape in shapes)
            {
                canvas.Draw(shape);
            }
            Console.ReadKey();

        }
    }
}
