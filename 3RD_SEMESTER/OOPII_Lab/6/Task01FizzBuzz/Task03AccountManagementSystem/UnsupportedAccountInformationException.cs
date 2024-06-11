using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task03AccountManagementSystem
{
    public class UnsupportedAccountInformationException:Exception
    {
        public UnsupportedAccountInformationException(string message) : base(message)
        {

        }
    }
}
