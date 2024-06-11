using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task02
{
    internal class Program
    {
        static void Main(string[] args)
        {
            
            //INode<Shape> node1 = new Node<TwoDShape>();
            Node<Shape> node1 = new Node<Shape>();

            Node<Circle> node2 = new Node<Circle>();

            // assign a 2D shape (Triangle) to a 3D shape (Cube)
            Node<Cube> node3 = new Node<Triangle>();

            // assign a base class (Shape) to a derived class (Circle)
            Node<Circle> node4 = new Node<Shape>();

            // assign a 3D shape (Cylinder) to a 2D shape (Rectangle)
            Node<Rectangle> node5 = new Node<Cylinder>();
        }
    }
}
