using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class Twitter
    {
        public List<Notification> FetchNotifications()
        {
            return new List<Notification>
            {
                new Notification { Id = "1", Platform = "Twitter", Message = "MMM", IsRead = false },
                new Notification { Id = "2", Platform = "Twitter", Message = "NNN", IsRead = true }
            };
        }

        public void MarkNotificationAsReadX(string notificationId)
        {
            Console.WriteLine($"Twitter: Marked {notificationId} as read.");
        }

        public void MarkNotificationAsUnreadX(string notificationId)
        {
            Console.WriteLine($"Twitter: Marked {notificationId} as unread.");
        }

        public void DeleteNotificationX(string notificationId)
        {
            Console.WriteLine($"Twitter: Deleted {notificationId}.");
        }
    }
}
