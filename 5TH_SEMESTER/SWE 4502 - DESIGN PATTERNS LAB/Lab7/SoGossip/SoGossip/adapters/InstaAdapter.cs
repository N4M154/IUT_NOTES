using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class InstaAdapter:ISNS
    {
        public insta _insta = new insta();

        public string GetPlatform()
        {
            return "Instagram";
        }

        public List<Notification> GetNotifications()
        {
            return _insta.GetNotifications();
        }

        public void MarkAsRead(string notificationId)
        {
            _insta.MarkAsReadIG(notificationId);
        }

        public void MarkAsUnread(string notificationId)
        {
            _insta.MarkAsUnreadIG(notificationId);
        }

        public void DeleteNotification(string notificationId)
        {
            _insta.RemoveNotificationIG(notificationId);
        }
    }
}
