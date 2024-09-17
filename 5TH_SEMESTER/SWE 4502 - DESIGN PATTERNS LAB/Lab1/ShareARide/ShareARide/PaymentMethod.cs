using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    public interface PaymentMethod
    {
        void ProcessPayment(double amount);
    }

    public class CreditCard:PaymentMethod
    {
        public void ProcessPayment(double amount)
        {
            Console.WriteLine("Payment " + amount + " paid through credit card.");

        }

    }
    public class PayPal : PaymentMethod
    {
        public void ProcessPayment(double amount)
        {
            Console.WriteLine("Payment " + amount + " paid through PayPal.");

        }

    }
    public class DigitalWallet : PaymentMethod
    {
        public void ProcessPayment(double amount)
        {
            Console.WriteLine("Payment " + amount + " paid through digital wallet.");

        }

    }
    /* -_- N4M154 -_- */
}
