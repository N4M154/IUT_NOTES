using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IUTBeans
{
    internal class Program
    {
        static void Main(string[] args)
        {

            var CoffeeChoice = new Dictionary<string, Func<List<ICondiment>, ICoffee>>
            {
                { "1", (condiments) => new Espresso(condiments) },
                  { "2", (condiments) => new Latte(condiments) },
                    { "3", (condiments) => new Cappuccino(condiments) }
            };

            
            var CondimentChoice = new Dictionary<string, Func<ICondiment>>
            {
                { "1", () => new Milk() },
                  { "2", () => new WhiteSugar() },
                    { "3", () => new WhippedCream() }
            };

            
            ICoffee coffee = null;
            while (coffee == null)
            {
                Console.WriteLine("Enter coffee choice 1 for espresso, 2 for latte and 3 for cappuccino:");
                Console.WriteLine("1. Espresso\n2. Latte\n3. Cappuccino");
                string choice = Console.ReadLine();

                if (CoffeeChoice.ContainsKey(choice))
                {
                    
                    List<ICondiment> condiments = new List<ICondiment>();

                    
                    Console.WriteLine("Enter condiment choices (e.g., '1 1 2' for milk, milk, white sugar) or press 4 for no condiments:");
                    Console.WriteLine("1. Milk\n2. White Sugar\n3. Whipped Cream\n4. No Condiments");
                    string condimentInput = Console.ReadLine();

                    if (condimentInput == "4")
                    {
                        coffee = CoffeeChoice[choice](condiments); 
                    }
                    else
                    {
                        
                        string[] condimentChoices = condimentInput.Split(' ');//space
                        foreach (string condimentChoice in condimentChoices)
                        {
                            if (CondimentChoice.ContainsKey(condimentChoice))
                            {
                                condiments.Add(CondimentChoice[condimentChoice]());
                            }
                            else
                            {
                                Console.WriteLine($"Invalid condiment choice: {condimentChoice}");
                            }
                        }

                        
                        coffee = CoffeeChoice[choice](condiments);
                    }
                }
                else
                {
                    Console.WriteLine("Invalid coffee choice.");
                }
            }

            
            Console.WriteLine("Your order: " + coffee.Name());
            Console.WriteLine("Total cost: $" + coffee.Price());
            Console.ReadKey();
        }
    }
}
