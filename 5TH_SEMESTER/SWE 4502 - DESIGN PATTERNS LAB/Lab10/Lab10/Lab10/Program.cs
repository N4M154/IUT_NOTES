using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab10
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var manager = new BankAccountManager();
            
            var create1 = new CreateRequirement("Elisabeth", 1000);
            create1.Do();
            var account1 = create1.newAccount;
            manager.AddAccount(account1);
            var create2 = new CreateRequirement("Sue", 500);
            create2.Do();
            var account2 = create2.newAccount;
            manager.AddAccount(account2);

            var create3 = new CreateRequirement("Sue", 800);
            create3.Do();
            var account3 = create3.newAccount;
            manager.AddAccount(account3);


            manager.GetAccount("The Substance");


            var deposit1 = new DepositRequirement(account1, 200); 
            deposit1.Do();

            var deposit2 = new DepositRequirement(account2, 300); 
            deposit2.Do();

            var transfer = new TransferRequirement(account1, account2, 150);
            transfer.Do();

            Console.WriteLine("\nTransaction History for Elisabeth:");
            account1.SeeTransactionHistory();

            Console.WriteLine("\nTransaction History for Sue:");
            account2.SeeTransactionHistory();

            Console.ReadKey();
        }
    }
}
