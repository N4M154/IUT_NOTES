using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    public class CurrentTime : IWidget
    {
        public Mediator mediator { get; set; }
        public DateTime currentTime = DateTime.Now;
        public string id { get; set; }
        public CurrentTime(Mediator _mediator)
        {
            id = Guid.NewGuid().ToString();
            mediator = _mediator;
        }
        public void Update()
        {
            Console.WriteLine("Current Time has been Updated");
            Console.WriteLine("Current Time is: " + currentTime);
            mediator.Notify(this.id);
        }
    }
}
