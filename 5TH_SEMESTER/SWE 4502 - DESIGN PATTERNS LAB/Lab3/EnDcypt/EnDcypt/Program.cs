using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnDcypt
{
    internal class Program
    {
        static void Main(string[] args)
        {

            Context encryptionService = new Context();

            Console.WriteLine("Select Encryption Algorithm: 1. AES  2. DES  3. Caesar Cipher");
            int choice = int.Parse(Console.ReadLine());

            switch (choice)
            {
                case 1:
                    encryptionService.SetEncryptionStrategy(new AES());
                    break;
                case 2:
                    encryptionService.SetEncryptionStrategy(new DESType());
                    break;
                case 3:
                    Console.Write("Enter Shift Value: ");
                    int shift = int.Parse(Console.ReadLine());
                    encryptionService.SetEncryptionStrategy(new CaeserCipher(shift));
                    break;
                default:
                    Console.WriteLine("Invalid Choice.");
                    return;
            }

            string inputFilePath = @"C:\Users\Dell\source\repos\EnDcypt\TextFile\input.txt";
            string encryptedFilePath = @"C:\Users\Dell\source\repos\EnDcypt\TextFile\encrypt.txt";
            string decryptedFilePath = @"C:\Users\Dell\source\repos\EnDcypt\TextFile\decrypt.txt";

            encryptionService.EncryptFile(inputFilePath, encryptedFilePath);
            Console.WriteLine("File Encrypted.");

            encryptionService.DecryptFile(encryptedFilePath, decryptedFilePath);
            Console.WriteLine("File Decrypted.");

            Console.ReadKey();
        }
    }
}
