using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class FB
    {
        public List<Notification> GetNotifications()
        {
            return new List<Notification>
            {
                new Notification { Id = "1", Platform = "Facebook", Message = "XXX", IsRead = true },
                new Notification { Id = "2", Platform = "Facebook", Message = "YYY", IsRead = false }
            };
        }

        public void MarkAsReadFB(string notificationId)
        {
            Console.WriteLine($"Facebook: Marked {notificationId} as read.");
        }

        public void MarkAsUnreadFB(string notificationId)
        {
            Console.WriteLine($"Facebook: Marked {notificationId} as unread.");
        }

        public void RemoveNotificationFB(string notificationId)
        {
            Console.WriteLine($"Facebook: Removed {notificationId}.");
        }
    }
}
