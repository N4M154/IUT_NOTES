using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task03AccountManagementSystem
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var savingAccount = new SavingsAccount("SA12345", 5000, "John Doe", "JD123");
            var currentAccount = new CurrentAccount("CA67890", 10000, "Alice Smith", "AS456");
            var islamicAccount = new IslamicAccount("IA54321", 3000, "Mohammed Ali", "MA789");


            try
            {
                savingAccount.Withdrawals(2000);
                savingAccount.Deposits(1500);
                Console.WriteLine($"Saving Account Balance: {savingAccount.BalanceCheck()}");
            }
            catch (UnsupportedAccountInformationException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }


            try
            {
                currentAccount.Withdrawals(5000);
                currentAccount.Deposits(3000);
                Console.WriteLine($"Current Account Balance: {currentAccount.BalanceCheck()}");

            }
            catch (UnsupportedAccountInformationException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }


            try
            {
                islamicAccount.Withdrawals(1000);
                islamicAccount.Deposits(500);
                Console.WriteLine($"Islamic Account Balance: {islamicAccount.BalanceCheck()}");
            }
            catch (UnsupportedAccountInformationException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }

            Console.ReadKey();
        }
    }
}
