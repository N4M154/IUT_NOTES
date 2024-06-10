using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Indispensable_SuperShop
{
    internal class Department
    {
        public string Name { get; set; }
        public List<Product> Products { get; } = new List<Product>();
    }
}
