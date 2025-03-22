using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab10
{
    public class DepositRequirement:IRequirement
    {
        public BankAccInfo bankacc;
        public double Amount;

        public DepositRequirement(BankAccInfo info,double amount)
        {
            bankacc = info;
            Amount = amount;

        }

        public void Do()
        {
            bankacc.Deposit(Amount);
        }

            

    }
}
