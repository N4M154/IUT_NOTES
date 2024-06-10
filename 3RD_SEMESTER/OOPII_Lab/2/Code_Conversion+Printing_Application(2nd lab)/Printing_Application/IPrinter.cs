using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Printing_Application
{
    public interface IPrinter
    {
         void Print(String PageType, bool Iscolor, bool Side);
    }
}
