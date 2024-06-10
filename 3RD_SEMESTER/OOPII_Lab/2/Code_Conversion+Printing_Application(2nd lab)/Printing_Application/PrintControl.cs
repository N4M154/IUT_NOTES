using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Printing_Application
{
    public class PrintControl
    {
        private IPrinter printer;
        public void SetPrinter(IPrinter printer)
        {
            this.printer = printer;
        }
        public void PrintDocument(String PageType, bool Iscolor, bool Side)
        {
            if(printer!=null)
            {
                printer.Print(PageType, Iscolor, Side);
            }
            else
            {
                Console.WriteLine("Please select a Printer.");
            }
        }
    }
}
