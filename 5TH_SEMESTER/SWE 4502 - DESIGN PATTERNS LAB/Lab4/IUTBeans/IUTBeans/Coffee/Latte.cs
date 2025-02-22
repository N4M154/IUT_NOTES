using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IUTBeans
{
    internal class Latte:ICoffee
    {
        private double _basePrice = 120.00;
        public List<ICondiment> _condiments;
        public Latte(List<ICondiment> condiments)
        {
            _condiments = condiments;
        }


        public string Name()
        {
            string description = "Latte";
            foreach (var condiment in _condiments)
            {
                description += ", with " + condiment.Name();
            }
            return description;
        }

        public double Price()
        {
            double totalCost = _basePrice;
            foreach (var condiment in _condiments)
            {
                totalCost += condiment.Price();
            }
            return totalCost;
        }

        
    }
}
