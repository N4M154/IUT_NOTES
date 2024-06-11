using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Lab09
{
    internal class Program
    {
        static void Main(string[] args)
        {
            MyList<Person> personList = new MyList<Person>();
            MyList<Student> studentList = new MyList<Student>();

            // Adding persons to the list
            personList.AddItem(new Person("A", "AAAAA", 25));
            personList.AddItem(new Person("B", "BBBBB", 30));
            personList.AddItem(new Person("C", "CCCCC", 22));

            // Adding students to the list
            studentList.AddItem(new Student("D", "DDDDD", 21, "DDD University"));
            studentList.AddItem(new Student("E", "EEEEE", 23, "EEE University"));


            foreach (Person person in personList.ToArray())
            {
                Console.WriteLine(person.Name);
            }

            foreach (Student student in studentList.ToArray())
            {
                student.StudyMethod();
            }

            personList.Clear();
            Console.WriteLine($"{personList.Size()}");
            
            //Console.WriteLine($"{studentList.ToArray()}");
            Console.ReadKey();
            

        }
    }
}
