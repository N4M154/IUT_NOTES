using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MinMaxStack_Lab08
{
    public class MinMaxStackClass<T> where T : IComparable<T>
    {
        public Stack<T> Data;
        public Stack<T> Maxstack;
        public Stack<T> Minstack;
        public string AggregateType;

        public MinMaxStackClass(string aggregate)
        {
            Data = new Stack<T>();
            Maxstack = new Stack<T>();
            Minstack = new Stack<T>();
            AggregateType = aggregate;

        }




        public void Push(T n)
        {

            Data.Push(n);
            if ((Minstack.Count == 0) || n.CompareTo(Minstack.Peek()) <= 0)
            {
                Minstack.Push(n);
            }

            if ((Maxstack.Count == 0) || n.CompareTo(Maxstack.Peek()) >= 0)
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
            /*if (Data.Peek().Equals(Maxstack.Peek()))
            {
                Maxstack.Pop();
            }*/
            T popped=Data.Pop();
            if (Data.Peek().Equals(Minstack.Peek()))
            {
                Minstack.Pop();
            }
            if (Data.Peek().Equals(Maxstack.Peek()))
            {
                Maxstack.Pop();
            }




        }

        /*public T Max()
        {
            if (Maxstack.Count.Equals(0))
            {
                throw new InvalidOperationException("The Minimum Stack is empty.");
            }
            return Maxstack.Peek();
        }*/

        public T Aggregate()
        {
            if (Data.Count == 0)
            {
                throw new InvalidOperationException("Data stack is empty.");
            }

            if (AggregateType == "min")
            {
                return Minstack.Peek();
            }
            else if (AggregateType == "max")
            {
                return Maxstack.Peek();
            }
            else
            {
                throw new InvalidOperationException("Invalid aggregation type.");
            }
        }

    }
}

