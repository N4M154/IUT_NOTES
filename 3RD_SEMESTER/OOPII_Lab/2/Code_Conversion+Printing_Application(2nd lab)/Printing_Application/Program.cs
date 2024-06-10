using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Printing_Application
{
    internal class Program
    {
        static void Main(string[] args)
        {
            PrintControl printController = new PrintControl();
            IPrinter epsonPrinter = new Epson();
            IPrinter canonPrinter = new Cannon();

            printController.SetPrinter(epsonPrinter);

            printController.PrintDocument("A4", true, false);
            printController.PrintDocument("Letter", false, true);

            printController.SetPrinter(canonPrinter);

            printController.PrintDocument("A3", true, true);
            printController.PrintDocument("A4", false, false);

            Console.ReadLine();





        }
    }
}
