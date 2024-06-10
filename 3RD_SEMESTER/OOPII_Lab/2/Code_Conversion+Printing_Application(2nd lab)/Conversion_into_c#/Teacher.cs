using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conversion_into_c_
{
    internal class Teacher
    {
        public void teach(Student student)
        {
            Console.WriteLine(" Teacher is teaching .");
            student.learn();

        }
    }
}
