using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefactoredShape
{
    public abstract class Shape
    {
        public abstract double CalculateArea();
        public abstract void Draw();
    }

    // Circle class
    public class Circle : Shape
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Radius { get; set; }

        public override double CalculateArea()
        {
            return Math.PI * Radius * Radius;
        }

        public override void Draw()
        {
            Console.WriteLine($"Drawing a circle with X: {X}, Y: {Y}, Radius: {Radius} with area: {this.CalculateArea()}");
        }
    }

    // Rectangle class
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

        public override void Draw()
        {
            Console.WriteLine($"Drawing a rectangle with X: {X}, Y: {Y}, Length: {Length}, Width: {Width} with area: {this.CalculateArea()}");
        }
    }

    // Square class
    public class Square : Shape
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int SideLength { get; set; }

        public override double CalculateArea()
        {
            return SideLength * SideLength;
        }

        public override void Draw()
        {
            Console.WriteLine($"Drawing a square with X: {X}, Y: {Y}, Side Length: {SideLength} with area: {this.CalculateArea()}");
        }
    }
}
