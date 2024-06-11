using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaxStack_Lab08
{
    public class MaxStack<T> where T:IComparable<T>
    {
        public Stack<T> Data;
        public Stack<T> Maxstack;

        public MaxStack()
        {
            Data = new Stack<T>();
            Maxstack = new Stack<T>();
        }

        public void Push(T n)
        {

            Data.Push(n);
            if ((Maxstack.Count==0) || n.CompareTo(Maxstack.Peek())>=0)
            {
                Maxstack.Push(n);
            }
        }

        public void Pop()
        {
            if (Data.Count.Equals(0))
            {
                throw new InvalidOperationException("Data stack is empty");
            }
            if (Data.Peek().Equals(Maxstack.Peek()))
            {
                Maxstack.Pop();
            }
            Data.Pop();



        }

        public T Max()
        {
            if (Maxstack.Count.Equals(0))
            {
                throw new InvalidOperationException("The Minimum Stack is empty.");
            }
            return Maxstack.Peek();


        }


    }
}
