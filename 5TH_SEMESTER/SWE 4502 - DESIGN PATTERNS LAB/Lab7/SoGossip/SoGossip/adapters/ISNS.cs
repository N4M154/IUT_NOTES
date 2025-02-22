using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal interface ISNS
    {
        List<Notification> GetNotifications();
        string GetPlatform();
        void MarkAsRead(string notificationId);
        void MarkAsUnread(string notificationId);
        void DeleteNotification(string notificationId);
    }
}
