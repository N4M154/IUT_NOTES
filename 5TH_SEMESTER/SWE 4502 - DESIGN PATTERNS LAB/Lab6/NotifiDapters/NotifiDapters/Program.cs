using NotifiDapters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotifiDapters
{
    public class Program
    {
        static void Main(string[] args)
        {
            NotificationService emailService = new NotificationService(new Email());
            emailService.Notify("This is an email notification.");

            NotificationService smsService = new NotificationService(new SMS());
            smsService.Notify("This is an SMS notification.");

            NotificationService postalMailService = new NotificationService(new EPostalAdapter(new EPostal(), "XX YY ZZ"));
            postalMailService.Notify("This is a postal mail notification.");
            Console.ReadKey();
        }
    }
}
