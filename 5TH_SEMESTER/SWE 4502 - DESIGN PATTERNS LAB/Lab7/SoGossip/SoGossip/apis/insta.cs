using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class insta
    {
        public List<Notification> GetNotifications()
        {
            return new List<Notification>
            {
                new Notification { Id = "1", Platform = "Instagram", Message = "AAA", IsRead = true },
                new Notification { Id = "2", Platform = "Instagram", Message = "BBB", IsRead = true }
            };
        }

        public void MarkAsReadIG(string notificationId)
        {
            Console.WriteLine($"Instagram: Marked {notificationId} as read.");
        }

        public void MarkAsUnreadIG(string notificationId)
        {
            Console.WriteLine($"Instagram: Marked {notificationId} as unread.");
        }

        public void RemoveNotificationIG(string notificationId)
        {
            Console.WriteLine($"Instagram: Removed {notificationId}.");
        }
    }
}
