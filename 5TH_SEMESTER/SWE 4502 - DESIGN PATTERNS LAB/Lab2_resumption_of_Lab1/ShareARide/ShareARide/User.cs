using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    public class User
    {
        public int ID { get; set; }
        public string Name {  get; set; }  
        public string Location {  get; set; }
        public double Rating { get; set; }


        /*public User(int iD, string name, string location, double rating)
        {
            ID = iD;
            Name = name;
            Location = location;
            Rating = rating;
        }*/

        public User() { }
        public string UpdateLocation(string newLocation)
        {
            return Location = newLocation;
        }


        
    }
    /* -_- N4M154 -_- */
}
