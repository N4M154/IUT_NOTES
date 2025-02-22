using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace EnDcypt
{
    internal class DESType:IEncryptDecrypt
    {
        private readonly byte[] _key;
        private readonly byte[] _iv;

        public DESType()
        {
            using (DES des = DES.Create())
            {
                _key = des.Key;
                _iv = des.IV;
            }
        }

        public string Encrypt(string original)
        {
            using (DES des = DES.Create())
            {
                des.Key = _key;
                des.IV = _iv;

                ICryptoTransform encryptor = des.CreateEncryptor(des.Key, des.IV);

                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter sw = new StreamWriter(cs))
                        {
                            sw.Write(original);
                        }
                    }
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
        }

        public string Decrypt(string coded)
        {
            using (DES des = DES.Create())
            {
                des.Key = _key;
                des.IV = _iv;

                ICryptoTransform decryptor = des.CreateDecryptor(des.Key, des.IV);

                using (MemoryStream ms = new MemoryStream(Convert.FromBase64String(coded)))
                {
                    using (CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader sr = new StreamReader(cs))
                        {
                            return sr.ReadToEnd();
                        }
                    }
                }
            }
        }
    }
}
