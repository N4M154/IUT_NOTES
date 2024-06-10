using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Indispensable_SuperShop
{
    internal class Product
    {
       
        
            public string Name { get; set; }
            public string Barcode { get; set; }
            public double Price { get; set; }
            public double Discount { get; set; }
            public Department Department { get; set; }
        

    }
}
