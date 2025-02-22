using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotifiDapters
{
    public class EPostal
    {
        public void SendPostalMail(string address, string message)
        {
            Console.WriteLine($"{address}");
            Console.WriteLine($"{message}");
        }
    }
}
