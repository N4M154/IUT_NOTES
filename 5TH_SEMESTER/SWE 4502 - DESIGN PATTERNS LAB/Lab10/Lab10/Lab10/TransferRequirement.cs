using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab10
{
    internal class TransferRequirement:IRequirement
    {
        public BankAccInfo FromAccount;
        public BankAccInfo ToAccount;
        public double Amount;

        public TransferRequirement(BankAccInfo fromAccount, BankAccInfo toAccount, double amount)
        {
            FromAccount = fromAccount;
            ToAccount = toAccount;
            Amount = amount;
        }
        public void Do()
        {
            FromAccount.Transfer(ToAccount, Amount);
        }
    }
}
