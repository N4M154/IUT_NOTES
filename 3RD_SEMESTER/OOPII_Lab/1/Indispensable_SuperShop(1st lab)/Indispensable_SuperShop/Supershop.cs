using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Indispensable_SuperShop
{
    internal class Supershop
    {
       
        
            public List<Department> Departments { get; } = new List<Department>();

            public void AddDepartment(Department department)
            {
                Departments.Add(department);
            }

            public void AddProductToDepartment(Department department, Product product)
            {
                department.Products.Add(product);
                product.Department = department;
            }

            public void ApplyDiscount(Product product)
            {
                if (product.Department.Name == "Electronics")
                {
                    product.Discount = 0.10;
                }
                else if (product.Department.Name == "Clothing")
                {
                    product.Discount = 0.15;
                }
            }
    
    }

    
}
