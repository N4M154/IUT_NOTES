using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Mediator mediator = new Mediator();
            Location location = new Location(mediator);
            TimeZone timezone = new TimeZone(mediator);
            PrayerTimeSettings prayerTimeSettings = new PrayerTimeSettings(mediator);
            CurrentTime currentTime = new CurrentTime(mediator);
            WaqtTimesTable waqtTimesTable = new WaqtTimesTable(mediator);
            PrayerTimesTable prayerTimesTable = new PrayerTimesTable(mediator);
            Currentwaqt currentWaqt = new Currentwaqt(mediator);
            NextPrayer nextPrayer = new NextPrayer(mediator);

            mediator.AddDependency(location, timezone, prayerTimeSettings, currentTime, waqtTimesTable, prayerTimesTable, currentWaqt, nextPrayer);

            timezone.Update();
            Console.ReadKey();
        }
    }
}
