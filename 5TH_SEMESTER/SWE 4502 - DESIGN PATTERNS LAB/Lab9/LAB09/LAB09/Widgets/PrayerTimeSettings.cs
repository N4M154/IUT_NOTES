using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    public class PrayerTimeSettings : IWidget
    {
        public Mediator mediator { get; set; }
        public string id { get; set; }
        public PrayerTimeSettings(Mediator mediator)
        {
            id = Guid.NewGuid().ToString();
            this.mediator = mediator;
        }
        public void Update()
        {
            Console.WriteLine("Prayer Time Settings has been Updated");
            mediator.Notify(this.id);
        }
    }
}
