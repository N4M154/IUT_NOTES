using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    public class NextPrayer:IWidget
    {
        public Mediator mediator { get; set; }
        public string id { get; set; }
        public NextPrayer(Mediator mediator)
        {
            id = Guid.NewGuid().ToString();
            this.mediator = mediator;
        }
        public void Update()
        {
            Console.WriteLine("Next Prayer has been Updated");
            mediator.Notify(this.id);
        }
    }
}
