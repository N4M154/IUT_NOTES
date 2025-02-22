using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotifiDapters
{
    public class SMS:INotification
    {
        public void Send(string message)
        {
            Console.WriteLine($"SMS: {message}");
        }
    }
}
