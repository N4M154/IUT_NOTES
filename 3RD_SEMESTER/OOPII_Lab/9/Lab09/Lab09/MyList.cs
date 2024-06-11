using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab09
{
    public class MyList<T>
    {
        public List<T> Items;

        public MyList()
        {
            Items = new List<T>();
        }

        public void AddItem(T elt)
        {
            Items.Add(elt);
        }
        public T GetItem(int index)
        {
            if (index >= 0 && index < Items.Count)
            {
                return Items[index];
            }
            else
            {
                throw new IndexOutOfRangeException("Index not in the range.");
            }

            
            
        }

        public T RemoveItem(int index)
        {
            if (index >= 0 && index < Items.Count)
            {
                T removedItem = Items[index];
                Items.RemoveAt(index);
                return removedItem;
            }
            else
            {
                throw new IndexOutOfRangeException("Index not in range.");
            }
        }
        public int Size()
        {
            return Items.Count;
        }
        public bool IsEmpty()
        {
            return (Items.Count==0);
        }
        public void Clear()
        {
            Items.Clear();
        }
        public bool Contains(T elt)
        {
            return Items.Contains(elt);
        }
    
        public T[] ToArray()
        {
            return Items.ToArray();
        }
    }
}
