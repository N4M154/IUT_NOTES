using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Printing_Application
{
    public class Epson : IPrinter
    {
        public void Print(String PageType, bool Iscolor, bool Side)
        {
            Console.WriteLine($"Epson Printer: {(Iscolor ? "Colorful" : "B&W")}" + $"\t\t{PageType} Page : {(Side ? "Both-Sided" : "Single-Sided")}");
        }
    }
}
