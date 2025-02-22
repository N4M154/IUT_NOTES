using NotifiDapters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotifiDapters
{
    public class EPostalAdapter : INotification
    {
        public EPostal _ePostal;
        public string _name;
        public string _address;
        public string _postalCode;

        public EPostalAdapter(EPostal ePostal, string address)
        {
            _ePostal = ePostal;
            _address = address;
        }

        public void Send(string message)
        {
            _ePostal.SendPostalMail(_address, message);
        }
    }
}
