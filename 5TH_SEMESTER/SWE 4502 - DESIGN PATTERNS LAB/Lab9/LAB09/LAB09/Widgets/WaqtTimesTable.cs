using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    public class WaqtTimesTable:IWidget
    {
        public Mediator mediator { get; set; }
        public List<string> WaqtTimes { get; set; }
        public string id { get; set; }
        public WaqtTimesTable(Mediator mediator)
        {
            id = Guid.NewGuid().ToString();
            this.mediator = mediator;
        }

        public void Update()
        {
            Console.WriteLine("Waqt Times has been Table Updated");
            mediator.Notify(this.id);
        }
    }
}
