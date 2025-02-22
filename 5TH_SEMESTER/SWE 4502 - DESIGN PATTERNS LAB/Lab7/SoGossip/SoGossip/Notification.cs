using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class Notification
    {
        public string Id { get; set; }
        public string Platform { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
    }
}
