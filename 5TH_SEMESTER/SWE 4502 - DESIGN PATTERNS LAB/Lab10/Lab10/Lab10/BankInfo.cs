using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab10
{
    public class BankAccInfo
    {
        public string AccNum;
        public double Balance;
        public List<string> Transactions;

        public BankAccInfo(string accNum, double balance)
        {
            AccNum = accNum;
            Balance = balance;
            Transactions = new List<string>();
        }

        public void Deposit(double amount)
        {
            Balance += amount;
            Console.WriteLine($"\nDeposit amount: {amount} to {this.AccNum}'s account. New balance: {this.Balance}.");
            Transactions.Add($"\nDeposit amount: {amount} to {this.AccNum}'s account. New balance: {this.Balance}.");
        }

        public void Withdrawal(double amount)
        {
            if(Balance>amount)
            {
                Balance -= amount; 
                Console.WriteLine($"\nWithdrawn amount: {amount} from {this.AccNum}'s account. New balance: {this.Balance}.");
                Transactions.Add($"\nWithdrawn amount: {amount} from {this.AccNum}'s account. New balance: {this.Balance}.");
            }
            else
            {
                Console.WriteLine("\nInsufficient Funds!You ain't got no money!");
                Transactions.Add("\nInsufficient Funds!You ain't got no money!");
            }
        }

        public double getBalance()
        {
            return Balance;
        }

        public void SeeTransactionHistory()
        {
            
            foreach (var transaction in Transactions)
            {
                Console.WriteLine(transaction);
            }
        }
        public void Transfer(BankAccInfo toAcc, double amount)
        {
            if (Balance >= amount)
            {
                this.Withdrawal(amount);
                if (this.Balance >= 0)
                {
                    toAcc.Deposit(amount);

                    this.Transactions.Add($"\nTransferred {amount} from {this.AccNum} to {toAcc.AccNum}. New balance: {this.Balance}.");
                    toAcc.Transactions.Add($"\nTransferred {amount} to {this.AccNum} from {this.AccNum}. New balance: {toAcc.Balance}.");

                    Console.WriteLine($"\nTransferred {amount} from {this.AccNum}'s account to {toAcc.AccNum}'s account.");
                }
                else
                {
                    this.Deposit(amount);  
                    Console.WriteLine($"\nTransfer failed: Insufficient balance in {this.AccNum}'s account.");
                }
            }
            else
            {
                Console.WriteLine($"\nTransfer failed: Insufficient balance in {this.AccNum}'s account.");
            }
        }
    }
}
