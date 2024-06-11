using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementAppLab07
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //1
            Employee employee = new Employee();
            employee.GenerateReport();

            //3
            EmployeeController controller = new EmployeeController();
            Console.WriteLine("\n");
            controller.DeleteEmployee("John Doe");

            
            controller.FindEmployeeByName("Jane Smith");
            controller.FindEmployeeByName("ABC");
            controller.UpdateEmployeeData("Jane Smith", 7000, 1500, "Senior Manager", new DateTime(2023, 9, 22));


           


            Console.ReadKey();
        }
    }
}
