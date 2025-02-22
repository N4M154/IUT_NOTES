using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bundlers
{
    internal class SimpleProduct:IProduct
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public decimal Price { get; private set; }

        public SimpleProduct(string name, string description, decimal price)
        {
            Name = name;
            Description = description;
            Price = price;
        }

        public string GetDescription()
        {
            return $"{Name}: ${Price} - {Description}";
        }

        public decimal CalculatePrice()
        {
            return Price;
        }
    }
}
