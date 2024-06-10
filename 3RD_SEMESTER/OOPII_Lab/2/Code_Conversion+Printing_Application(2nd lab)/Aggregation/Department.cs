using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aggregation
{
    internal class Department
    {
        private List<Employee> employees;

        public Department()
        {
             employees = new List<Employee>();
        }
        public void addEmployee(Employee employee)
        { 
             employees.Add(employee);
        }
    }
}
