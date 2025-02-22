using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoGossip
{
    internal class Program
    {
        static void Main(string[] args)
        { 
            var facade = new SNSFacade();

            var notifications = facade.GetAllNotifications();
            Console.WriteLine("Your Notifications:");
            foreach (var notification in notifications)
            {
                Console.WriteLine($"{notification.Platform} - {notification.Message} (Read: {notification.IsRead})");
            }

            facade.MarkNotificationAsRead("Instagram", "1");
            facade.MarkNotificationAsUnread("Instagram", "1");
            facade.DeleteNotification("Instagram", "1");

            facade.MarkNotificationAsRead("Instagram", "2");
            facade.MarkNotificationAsUnread("Instagram", "2");
            facade.DeleteNotification("Instagram", "2");

            facade.MarkNotificationAsRead("LinkedIn", "1");
            facade.MarkNotificationAsUnread("LinkedIn", "1");
            facade.DeleteNotification("LinkedIn", "1");

            facade.MarkNotificationAsRead("LinkedIn", "2");
            facade.MarkNotificationAsUnread("LinkedIn", "2");
            facade.DeleteNotification("LinkedIn", "2");

            facade.MarkNotificationAsRead("Twitter", "1");
            facade.MarkNotificationAsUnread("Twitter", "1");
            facade.DeleteNotification("Twitter", "1");

            facade.MarkNotificationAsRead("Twitter", "2");
            facade.MarkNotificationAsUnread("Twitter", "2");
            facade.DeleteNotification("Twitter", "2");

            facade.MarkNotificationAsRead("Facebook", "1");
            facade.MarkNotificationAsUnread("Facebook", "1");
            facade.DeleteNotification("Facebook", "1");

            facade.MarkNotificationAsRead("Facebook", "2");
            facade.MarkNotificationAsUnread("Facebook", "2");
            facade.DeleteNotification("Facebook", "2");





            Console.ReadKey();
        }
    }
}
