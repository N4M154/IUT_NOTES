using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    public class Location:IWidget
    {
        public Mediator mediator { get; set; }
        public string id { get; set; }
        public Location(Mediator mediator)
        {
            id = Guid.NewGuid().ToString();
            this.mediator = mediator;
        }
        public void Update()
        {
            Console.WriteLine("Location has been Updated");
            mediator.Notify(this.id);
        }
    }
}
