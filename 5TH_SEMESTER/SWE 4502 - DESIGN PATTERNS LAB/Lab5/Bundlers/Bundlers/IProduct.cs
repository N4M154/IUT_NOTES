using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bundlers
{
    internal interface IProduct
    {
        string GetDescription();
        decimal CalculatePrice();
    }
}
