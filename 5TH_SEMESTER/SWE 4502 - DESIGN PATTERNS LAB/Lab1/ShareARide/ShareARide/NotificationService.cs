using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    public interface NotificationService
    {
        void SendNotification(string Text);
    }

    public class SMS:NotificationService
    {
        public void SendNotification(string Text)
        {
            Console.WriteLine("SMS to receiver: " + Text);
        }
    }
    public class Email : NotificationService
    {
        public void SendNotification(string Text)
        {
            Console.WriteLine("Email to receiver: " + Text);
        }
    }
    public class InApp : NotificationService
    {
        public void SendNotification(string Text)
        {
            Console.WriteLine("InApp notifcation to receiver: " + Text);
        }
    }
    /* -_- N4M154 -_- */
}
