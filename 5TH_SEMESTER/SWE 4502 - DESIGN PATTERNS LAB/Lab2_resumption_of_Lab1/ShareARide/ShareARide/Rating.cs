using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShareARide
{
    public class Rating
    {
        public User user {  get; set; }
        public double Value { get; set; }
        public string Feedback { get; set; }

        public Rating(User u,double value,string feedback)
        {
            this.user = u;
            this.Value = value;
            this.Feedback = feedback;
        }


    }
    /* -_- N4M154 -_- */
}
