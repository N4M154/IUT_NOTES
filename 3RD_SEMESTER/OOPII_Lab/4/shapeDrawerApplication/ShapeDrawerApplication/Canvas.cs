using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShapeDrawerApplication
{
    public class Canvas 
    {
        public void Draw(List<Shape> shapes)
        {
            foreach (var shape in shapes)
            {
                switch (shape)
                {
                    case Circle circle:
                        DrawCircle(circle);
                        break;
                    case Rectangle rectangle:
                        DrawRectangle(rectangle);
                        break;
                    case Square square:
                        DrawSquare(square);
                        break;
                    default:
                        throw new ArgumentException("Unsupported shape type");
                }
            }
        }

        private void DrawCircle(Circle circle)
        {
            Console.WriteLine($"Drawing a circle with X: {circle.X}, Y: {circle.Y}, Radius: {circle.Radius} with Area:{circle.CalculateArea()}");
        }

        private void DrawRectangle(Rectangle rectangle)
        {
            Console.WriteLine($"Drawing a rectangle with X: {rectangle.X}, Y: {rectangle.Y}, Length: {rectangle.Length}, Width: {rectangle.Width} with Area:{rectangle.CalculateArea()}");
        }

        private void DrawSquare(Square square)
        {
            Console.WriteLine($"Drawing a square with X: {square.X}, Y: {square.Y}, Side Length: {square.SideLength} with Area:{square.CalculateArea()}");
        }

    }
}
