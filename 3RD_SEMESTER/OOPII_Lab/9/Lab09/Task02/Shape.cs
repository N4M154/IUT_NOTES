using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task02
{
    public class Shape
    {
        public string Name { get; set; }
    }

    public class TwoDShape:Shape
    {

    }
    public class ThreeDShape : Shape
    {

    }
    public class Circle : TwoDShape
    {

    }
    public class Rectangle : TwoDShape 
    {

    }
    public class Triangle : TwoDShape
    {

    }
    public class Cube : ThreeDShape 
    {

    }
    public class Cylinder : ThreeDShape
    {

    }
    public interface INode< T> where T : Shape
    {
        T Value { get; set; }
    }

    public class Node<T>:INode<T> where T:Shape 
    {
        public T Value { get; set; }
    }

   

}
