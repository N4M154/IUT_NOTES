using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Indispensable_SuperShop
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Supershop superShop = new Supershop();

            Department groceries = new Department { Name = "Groceries" };
            Department electronics = new Department { Name = "Electronics" };
            Department clothing = new Department { Name = "Clothing" };

            superShop.AddDepartment(groceries);
            superShop.AddDepartment(electronics);
            superShop.AddDepartment(clothing);

            Product mart = new Product { Name = "shopping mart", Barcode = "456789", Price = 700.0 };
            superShop.AddProductToDepartment(groceries,mart);

            Product tv = new Product { Name = "Smart TV", Barcode = "123456", Price = 500.0 };
            superShop.AddProductToDepartment(electronics, tv);

            Product shirt = new Product { Name = "Cotton Shirt", Barcode = "789012", Price = 25.0 };
            superShop.AddProductToDepartment(clothing, shirt);

            superShop.ApplyDiscount(tv);
            superShop.ApplyDiscount(shirt);

            Console.WriteLine("\n\n------------Indispensible Supershop------------");

            Console.WriteLine("\nProduct: " + mart.Name + ",Price: " + (mart.Price));
            Console.WriteLine("Product: " + tv.Name + ",Price: " + (tv.Price));
            Console.WriteLine("Product: " + shirt.Name + ",Price: " + (shirt.Price));

            Console.WriteLine("\n------------------------------------------------");
            

            Console.WriteLine("\nAfter Discount: " + tv.Name + ", Price: " + (tv.Price - (tv.Price * tv.Discount)));
            Console.WriteLine("After Discount: " + shirt.Name + ", Price: " + (shirt.Price - (shirt.Price * shirt.Discount)));
            Console.ReadLine();
        }
    }
}
