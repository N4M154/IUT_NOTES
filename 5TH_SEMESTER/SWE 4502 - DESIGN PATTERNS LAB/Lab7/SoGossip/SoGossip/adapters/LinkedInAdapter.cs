using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class LinkedInAdapter:ISNS
    {
        public Linkedin _linkedin = new Linkedin();

        public string GetPlatform()
        {
            return "LinkedIn";
        }

        public List<Notification> GetNotifications()
        {
            return _linkedin.FetchNotifications();
        }

        public void MarkAsRead(string notificationId)
        {
            _linkedin.MarkNotificationAsReadLI(notificationId);
        }

        public void MarkAsUnread(string notificationId)
        {
            _linkedin.MarkNotificationAsUnreadLI(notificationId);
        }

        public void DeleteNotification(string notificationId)
        {
            _linkedin.DeleteNotificationLI(notificationId);
        }
    }
}
