using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TQA02
{
    public class Logic
    {
       

        public int logicCode(int n, int r)
        {
            if (n == 0)
            {
                throw new ArgumentException("n cannot be zero.");
            }

            if (n < 0 || r < 0 || n > 15 || r > 15)
            {
                throw new ArgumentOutOfRangeException("Inputs must be between 0 and 15 (inclusive).");
            }

            if (n < r)
            {
                throw new ArgumentException("n must be greater than or equal to r.");
            }

            return Combination(n, r);
        }

        public int Combination(int m, int k)
        {
            if (k > m - k)
            {
                k = m - k;
            }

            int result = 1;
            for (int i = 1; i <= k; i++)
            {
                result = result * (m - k + i) / i;
            }
            return result;
        }

        public int logicCode(double n, double r)
        {
            if (n == (int)n && r == (int)r)
            {
                return logicCode((int)n, (int)r);
            }
            else
            {
                throw new ArgumentException("n and r must be integers.");
            }
        }
    }
}


       // -_- N4M154 -_-