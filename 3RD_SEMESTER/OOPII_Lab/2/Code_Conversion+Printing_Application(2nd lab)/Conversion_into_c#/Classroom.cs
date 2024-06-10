using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Conversion_into_c_
{
    internal class Classroom
    {
        private Teacher teacher;
        private Student student;

        public Classroom()
        {
            teacher = new Teacher();
            student = new Student();
        }

        public void startClass()
        {
            teacher.teach(student);
        }
    }
}
