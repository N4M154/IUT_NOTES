using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementAppLab07
{
    public class EmployeeController
    {
        
        private List<Employee> employees = new List<Employee>();

        public EmployeeController()
        {
            HireEmployee("John Doe", 5000, 1000, "Engineer", new DateTime(2023, 9, 21));
            HireEmployee("Jane Smith", 6000, 1200, "Manager", new DateTime(2021, 8, 22));
            HireEmployee("Bob", 30000,  "Worker");

        }

        public void HireEmployee(string name, double basicSalary, double bonus, string designation, DateTime dateOfJoining)
        {
            Employee employee = new Employee(name, basicSalary, bonus, designation, dateOfJoining);
            employees.Add(employee);
        }
        public void HireEmployee(string name, double basicSalary,  string designation)
        {
            Employee employee = new Employee(name, basicSalary,  designation );
            employees.Add(employee);
        }
        public List<Employee> GetAllEmployees()
        {
            return employees;
        }

        public void DeleteEmployee( string name)
        {
           
            Employee deleteemployee = employees.Find(e => e.Name == name);
            if (deleteemployee != null)
            {
                employees.Remove(deleteemployee);
                Console.WriteLine($"Employee '{name}' has been removed from the system.");
                Console.WriteLine($"Current employee count:{employees.Count}.");
            }
            else
            {
                Console.WriteLine($"There is no Employee by the name of '{name}'.");
            }
        }
        public Employee FindEmployeeByName(string name)
        {
            Employee foundemployee = employees.Find(e => e.Name == name);
            if (foundemployee != null)
            {
                Console.WriteLine($"Employee '{name}' has been found.");
            }
            else
            {
                Console.WriteLine($"There is no Employee by the name of '{name}'.");
            }
            return foundemployee;
            
        }
        public void UpdateEmployeeData(string name, double basicSalary, double bonus, string designation, DateTime dateOfJoining)
        {
            Employee updatedemployee = employees.Find(e => e.Name == name);
            if (updatedemployee != null)
            {
                updatedemployee.BasicSalary = basicSalary;
                updatedemployee.Bonus = bonus;
                updatedemployee.Designation = designation;
                updatedemployee.DateOfJoining = dateOfJoining;
                Console.WriteLine($"Employee '{name}' has new updated information.");
            }
            else
            {
                Console.WriteLine($"There is no Employee by the name of Employee '{name}'.");
            }
        }
    }
}
