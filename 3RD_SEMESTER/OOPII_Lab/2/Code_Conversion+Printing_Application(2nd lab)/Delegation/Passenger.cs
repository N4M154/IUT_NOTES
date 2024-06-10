using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegation
{
    internal class Passenger
    {
        private int id;
        private String name;


        public Passenger(int id, String name)
        {
             this.id = id;
             this.name = name;
        }

         public int getId()
        {
             return id;
        }

         public String getName()
        {
             return name;
        }

    }
}
