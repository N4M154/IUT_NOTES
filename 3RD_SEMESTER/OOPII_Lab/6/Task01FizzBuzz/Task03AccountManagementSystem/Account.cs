using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task03AccountManagementSystem
{
    public class Account
    {
        public string AccountNumber { get; set; }
        public double Balance { get; set; }
        public string AccountHolderName { get; set; }
        public string Signature { get; set; }

        public Account(string accountNumber, double balance, string accountHolderName, string signature)
        {
            this.AccountNumber = accountNumber;
            this.Balance = balance;
            this.AccountHolderName = accountHolderName;
            this.Signature = signature;
        }

        public virtual void Withdrawals(double Amount)
        {
            throw new UnsupportedAccountInformationException("Operation not supported.");
        }

        public virtual void Deposits(double Amount)
        {
            throw new UnsupportedAccountInformationException("Unsupported.");
        }

        public double BalanceCheck()
        {
            return Balance;
        }


    }

    public class SavingsAccount : Account
    {
        public SavingsAccount(string accountNumber, double balance, string accountHolderName, string signature) : base(accountNumber, balance, accountHolderName, signature)
        {
            this.AccountNumber = accountNumber;
            this.Balance = balance;
            this.AccountHolderName = accountHolderName;
            this.Signature = signature;
        }

        public override void Withdrawals(double Amount)
        {

            if (Amount <= 0)
            {
                throw new ArgumentException("Withdraw amount must be greater than zero.");
            }
            if (Amount > 15000)
            {
                throw new UnsupportedAccountInformationException("Maximum amount exceeded for this account.");

            }
            if (Balance - Amount < 1000)
            {
                throw new UnsupportedAccountInformationException("Minimum balance must be 1000.");
            }
            Balance -= Amount;
        }

        public override void Deposits(double Amount)
        {
            if (Amount < 0)
            {
                throw new ArgumentException("Deposit amount must be greater than zero.");
            }
            Balance += Amount;
        }

        public double CalculateInterest()
        {
            return Balance * 0.10;
        }


    }

    public class CurrentAccount : Account
    {
        public CurrentAccount(string accountNumber, double balance, string accountHolderName, string signature) : base(accountNumber, balance, accountHolderName, signature)
        {
            this.AccountNumber = accountNumber;
            this.Balance = balance;
            this.AccountHolderName = accountHolderName;
            this.Signature = signature;
        }

        public override void Withdrawals(double Amount)
        {

            if (Amount <= 0)
            {
                throw new ArgumentException("Withdraw amount must be greater than zero.");
            }
            if (Amount > 20000)
            {
                throw new UnsupportedAccountInformationException("Maximum amount exceeded for this account.");

            }
            if (Balance - Amount < 500)
            {
                throw new UnsupportedAccountInformationException("Minimum balance must be 1000.");
            }
            Balance -= Amount;
        }

        public override void Deposits(double Amount)
        {
            if (Amount < 0)
            {
                throw new ArgumentException("Deposit amount must be greater than zero.");
            }
            Balance += Amount;
        }

        public double CalculateInterest()
        {
            return Balance * 0.08;
        }


    }
    public class IslamicAccount : Account
    {
        public IslamicAccount(string accountNumber, double balance, string accountHolderName, string signature) : base(accountNumber, balance, accountHolderName, signature)
        {
            this.AccountNumber = accountNumber;
            this.Balance = balance;
            this.AccountHolderName = accountHolderName;
            this.Signature = signature;
        }

        public override void Withdrawals(double Amount)
        {

            if (Amount <= 0)
            {
                throw new ArgumentException("Withdraw amount must be greater than zero.");
            }
            if (Amount > 10000)
            {
                throw new UnsupportedAccountInformationException("Maximum amount exceeded for this account.");

            }
            if (Balance - Amount < 200)
            {
                throw new UnsupportedAccountInformationException("Minimum balance must be 1000.");
            }
            Balance -= Amount;
        }

        public override void Deposits(double Amount)
        {
            if (Amount < 0)
            {
                throw new ArgumentException("Deposit amount must be greater than zero.");
            }
            Balance += Amount;
        }

    }
}
