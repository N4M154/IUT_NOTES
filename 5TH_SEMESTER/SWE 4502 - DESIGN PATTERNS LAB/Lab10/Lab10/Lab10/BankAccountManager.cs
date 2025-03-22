using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab10
{
    internal class BankAccountManager
    {
        public Dictionary<string, BankAccInfo> accounts = new Dictionary<string, BankAccInfo>();

        public void AddAccount(BankAccInfo account)
        {
            if (!accounts.ContainsKey(account.AccNum))
            {
                accounts[account.AccNum] = account;
                Console.WriteLine($"\nNew account for {account.AccNum} added.");
            }
            else
            {
                Console.WriteLine($"\nAccount for {account.AccNum} already exists!");
            }
        }

        public BankAccInfo GetAccount(string accNum)
        {
            if (accounts.ContainsKey(accNum))
            {
                return accounts[accNum];
            }
            else
            {
                Console.WriteLine($"\nAccount for {accNum} not found.");
                return null;
            }
        }
    }
}
