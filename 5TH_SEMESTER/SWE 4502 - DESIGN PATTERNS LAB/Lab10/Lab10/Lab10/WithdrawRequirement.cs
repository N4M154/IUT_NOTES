using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab10
{
    public class WithdrawRequirement:IRequirement
    {
        public BankAccInfo bankacc;
        public double Amount;

        public WithdrawRequirement(BankAccInfo info, double amount)
        {
            bankacc = info;
            Amount = amount;

        }

        public void Do()
        {
            bankacc.Withdrawal(Amount);
        }
    }
}
