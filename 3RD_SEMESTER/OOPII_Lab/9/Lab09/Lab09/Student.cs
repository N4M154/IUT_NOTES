using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab09
{
    public class Student:Person
    {
        public string UniversityName { get; set; }
        public Student(string name, string address, int age, string universityname) :base( name, address,  age)
        {
            this.UniversityName = universityname;
            
        }

        public void StudyMethod()
        {
            Console.WriteLine($"{Name} studies in {UniversityName}.");
        }
    }
}
