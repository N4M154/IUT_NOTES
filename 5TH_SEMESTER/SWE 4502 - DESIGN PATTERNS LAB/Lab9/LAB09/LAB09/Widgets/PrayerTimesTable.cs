using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    public class PrayerTimesTable:IWidget
    {
        public Mediator mediator { get; set; }
        public string id { get; set; }
        public PrayerTimesTable(Mediator mediator)
        {
            id = Guid.NewGuid().ToString();
            this.mediator = mediator;
        }
        public void Update()
        {
            Console.WriteLine("Prayer Times Table has been Updated");
            mediator.Notify(this.id);
        }
    }
}
