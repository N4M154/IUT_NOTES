using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class SNSFacade
    {
        private List<ISNS> _adapters;

        public SNSFacade()
        {
            _adapters = new List<ISNS>
            {
                new InstaAdapter(),
                new LinkedInAdapter(),
                new FBAdapter(),
                new TwitterAdapter(),
            };
        }

        public List<Notification> GetAllNotifications()
        {
            var notifications = new List<Notification>();
            foreach (var adapter in _adapters)
            {
                notifications.AddRange(adapter.GetNotifications());
            }
            return notifications;
        }

        public void MarkNotificationAsRead(string platform, string notificationId)
        {
            foreach (var adapter in _adapters)
            {
                if (adapter.GetPlatform() == platform)
                {
                    adapter.MarkAsRead(notificationId);
                }
            }
        }

        public void MarkNotificationAsUnread(string platform, string notificationId)
        {
            foreach (var adapter in _adapters)
            {
                if (adapter.GetPlatform() == platform)
                {
                    adapter.MarkAsUnread(notificationId);
                }
            }
        }

        public void DeleteNotification(string platform, string notificationId)
        {
            foreach (var adapter in _adapters)
            {
                if (adapter.GetPlatform() == platform)
                {
                    adapter.DeleteNotification(notificationId);
                }
            }
        }
    }
}
