using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    public class TimeZone:IWidget
    {
        public Mediator mediator { get; set; }
        public string id { get; set; }
        public TimeZone(Mediator mediator)
        {
            id = Guid.NewGuid().ToString();
            this.mediator = mediator;
        }
        public void Update()
        {
            Console.WriteLine("Timezone has been Updated");
            mediator.Notify(this.id);

        }
    }
}
