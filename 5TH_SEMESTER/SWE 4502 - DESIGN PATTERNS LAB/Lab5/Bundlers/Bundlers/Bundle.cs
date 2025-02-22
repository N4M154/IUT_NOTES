using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bundlers
{
    internal class Bundle:IProduct
    {
        public string Name { get; private set; }
        public decimal DiscountPercentage { get; private set; }
        private List<IProduct> products;

        public Bundle(string name, decimal discountPercentage)
        {
            Name = name;
            DiscountPercentage = discountPercentage;
            products = new List<IProduct>();
        }

        public void AddProduct(IProduct product)
        {
            products.Add(product);
        }

        public string GetDescription()
        {
            string result = $"Bundle: {Name} (Discount: {DiscountPercentage}%)\n";
            foreach (var product in products)
            {
                result += product.GetDescription() + "\n";
            }
            result += $"Total Price: ${CalculatePrice()}";
            return result;
        }

        public decimal CalculatePrice()
        {
            decimal totalPrice = 0;
            foreach (var product in products)
            {
                totalPrice += product.CalculatePrice();
            }
            return totalPrice * (1 - DiscountPercentage / 100);
        }
    }
}
