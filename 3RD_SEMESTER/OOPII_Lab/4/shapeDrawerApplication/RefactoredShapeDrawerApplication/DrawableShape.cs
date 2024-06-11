using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefactoredShapeDrawerApplication
{
    internal abstract class DrawableShape
    {
        public abstract void Draw();
    }


    class Circle : DrawableShape
    {
        public int X { get; }
        public int Y { get; }
        public int Radius { get; }

        public Circle(int x, int y, int radius)
        {
            X = x;
            Y = y;
            Radius = radius;
        }

        public override void Draw()
        {
            Console.WriteLine("Drawing a circle...");
        }
    }

    class Rectangle : DrawableShape
    {
        public int X { get; }
        public int Y { get; }
        public int Length { get; }
        public int Width { get; }

        public Rectangle(int x, int y, int length, int width)
        {
            X = x;
            Y = y;
            Length = length;
            Width = width;
        }

        public override void Draw()
        {
            Console.WriteLine("Drawing a rectangle...");
        }
    }

    class Square : DrawableShape
    {
        public int X { get; }
        public int Y { get; }
        public int SideLength { get; }

        public Square(int x, int y, int sideLength)
        {
            X = x;
            Y = y;
            SideLength = sideLength;
        }

        public override void Draw()
        {
            Console.WriteLine("Drawing a square...");
        }
    }
}
