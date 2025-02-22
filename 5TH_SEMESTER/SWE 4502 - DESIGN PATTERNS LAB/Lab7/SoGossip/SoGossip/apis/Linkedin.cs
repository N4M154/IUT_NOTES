using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class Linkedin
    {
        public List<Notification> FetchNotifications()
        {
            return new List<Notification>
            {
                new Notification { Id = "1", Platform = "LinkedIn", Message = "CCC", IsRead = false },
                new Notification { Id = "2", Platform = "LinkedIn", Message = "DDD", IsRead = false }
            };
        }

        public void MarkNotificationAsReadLI(string notificationId)
        {
            Console.WriteLine($"LinkedIn: Marked {notificationId} as read.");
        }

        public void MarkNotificationAsUnreadLI(string notificationId)
        {
            Console.WriteLine($"LinkedIn: Marked {notificationId} as unread.");
        }

        public void DeleteNotificationLI(string notificationId)
        {
            Console.WriteLine($"LinkedIn: Deleted {notificationId}.");
        }
    }
}
