using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IUTBeans
{
    internal class Cappuccino:ICoffee
    {
        private double _basePrice = 80.00;
        public List<ICondiment> _condiments;
        public Cappuccino(List<ICondiment> condiments)
        {
            _condiments = condiments;
        }
        public string Name()
        {
            string description = "Cappuccino";
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
