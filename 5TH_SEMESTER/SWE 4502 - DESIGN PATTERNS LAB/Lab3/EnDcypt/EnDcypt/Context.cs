using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnDcypt
{
    internal class Context
    {
        private IEncryptDecrypt _strategy;

        public void SetEncryptionStrategy(IEncryptDecrypt encryptionStrategy)
        {
            _strategy = encryptionStrategy;
        }

        public void EncryptFile(string inputFilePath, string outputFilePath)
        {
            string input = File.ReadAllText(inputFilePath);
            string coded = _strategy.Encrypt(input);
            File.WriteAllText(outputFilePath, coded);
        }

        public void DecryptFile(string inputFilePath, string outputFilePath)
        {
            string input = File.ReadAllText(inputFilePath);
            string coded = _strategy.Decrypt(input);
            File.WriteAllText(outputFilePath, coded);
        }
    }
}
