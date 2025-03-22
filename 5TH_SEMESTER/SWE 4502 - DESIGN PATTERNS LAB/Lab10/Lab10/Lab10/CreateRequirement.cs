using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab10
{
    public class CreateRequirement : IRequirement
    {

        public BankAccInfo newAccount;
        public string AccNum;
        public double Balance;


        public CreateRequirement(string accNum, double balance)
        {
            AccNum = accNum;
            Balance = balance;
        }

        public void Do()
        {
            newAccount = new BankAccInfo(AccNum, Balance);
            Console.WriteLine($"\nAccount created for {AccNum} with initial amount of {Balance}");
        }
    }
}
