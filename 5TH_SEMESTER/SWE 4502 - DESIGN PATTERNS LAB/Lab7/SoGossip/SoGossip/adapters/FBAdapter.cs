using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class FBAdapter:ISNS
    {
        public FB _fb = new FB();

        public string GetPlatform()
        {
            return "Facebook";
        }

        public List<Notification> GetNotifications()
        {
            return _fb.GetNotifications();
        }

        public void MarkAsRead(string notificationId)
        {
            _fb.MarkAsReadFB(notificationId);
        }

        public void MarkAsUnread(string notificationId)
        {
            _fb.MarkAsUnreadFB(notificationId);
        }

        public void DeleteNotification(string notificationId)
        {
            _fb.RemoveNotificationFB(notificationId);
        }
    }
}
