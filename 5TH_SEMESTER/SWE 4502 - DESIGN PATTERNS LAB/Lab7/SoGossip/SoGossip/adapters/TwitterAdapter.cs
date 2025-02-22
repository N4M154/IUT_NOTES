using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class TwitterAdapter:ISNS
    {
        public Twitter _tweet = new Twitter();

        public string GetPlatform()
        {
            return "Twitter";
        }

        public List<Notification> GetNotifications()
        {
            return _tweet.FetchNotifications();
        }

        public void MarkAsRead(string notificationId)
        {
            _tweet.MarkNotificationAsReadX(notificationId);
        }

        public void MarkAsUnread(string notificationId)
        {
            _tweet.MarkNotificationAsUnreadX(notificationId);
        }

        public void DeleteNotification(string notificationId)
        {
            _tweet.DeleteNotificationX(notificationId);
        }
    }
}
