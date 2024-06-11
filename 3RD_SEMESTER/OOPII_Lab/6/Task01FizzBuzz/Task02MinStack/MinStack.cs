using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task02MinStack
{
    
    public class MinStack
    {
        public Stack<int> Data;
        public Stack<int> MinimumValue;

        public MinStack()
        {
            Data = new Stack<int>();
            MinimumValue = new Stack<int>();
        }

        public void Push(int n)
        {
            
            Data.Push(n);
            if(MinimumValue.Count == 0 || n<=MinimumValue.Peek() )
            {
                MinimumValue.Push(n);
            }      
        }

        public void Pop()
        {
            if(Data.Count == 0)
            {
                throw new InvalidOperationException("Data stack is empty");
            }
            if (Data.Peek() == MinimumValue.Peek())
            {
                MinimumValue.Pop();
            }
            Data.Pop();
            


        }

        public int Min()
        {
           if(MinimumValue.Count == 0)
            {
                throw new InvalidOperationException("The Minimum Stack is empty.");
            }
           return MinimumValue.Peek();
            
           
        }

        


    }
}
