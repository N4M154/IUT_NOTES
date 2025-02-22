using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnDcypt
{
    public class CaeserCipher:IEncryptDecrypt
    {


        public int _shift;

        public CaeserCipher(int shift)
        {
            _shift = shift;
        }

        public string Encrypt(string original)
        {
            return ShiftText(original, _shift);
        }

        public string Decrypt(string coded)
        {
            return ShiftText(coded, 26 - _shift); // Reverse shift
        }

        private string ShiftText(string input, int shift)
        {
            char[] buffer = input.ToCharArray();
            for (int i = 0; i < buffer.Length; i++)
            {
                char letter = buffer[i];

                if (char.IsLetter(letter))
                {
                    char d = char.IsUpper(letter) ? 'A' : 'a';
                    letter = (char)((((letter + shift) - d) % 26) + d);
                }
                buffer[i] = letter;
            }
            return new string(buffer);
        }


    }

}
