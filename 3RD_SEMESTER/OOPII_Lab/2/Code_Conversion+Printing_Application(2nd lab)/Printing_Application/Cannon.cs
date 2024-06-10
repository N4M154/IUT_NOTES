using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Printing_Application
{
    public class Cannon : IPrinter
    {
        public void Print(String PageType, bool Iscolor, bool Side)
        {
            Console.WriteLine($"Canon Printer: {(Iscolor ? "B&W" : "Colorful")}" + $"\t\t{PageType} Page : {(Side ? "Both-Sided" : "Single-Sided")}");
        }
    }
}
