using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace LAB09
{
    public class Mediator
    {
        public Dictionary<string, List<IWidget>> dependency = new Dictionary<string, List<IWidget>>();
        CurrentTime currentTime;
        WaqtTimesTable waqtTimesTable;
        PrayerTimesTable prayerTimesTable;
        Currentwaqt currentwaqt;
        NextPrayer nextPrayer;
        Location location;
        TimeZone timeZone;
        PrayerTimeSettings prayertimeSettings;
        //public Mediator() { }
        public void AddDependency(Location _location,TimeZone _timeZone,PrayerTimeSettings _prayerTimeSettings,CurrentTime _currentTime,
            WaqtTimesTable _waqtTimesTable,PrayerTimesTable _prayerTimesTable,Currentwaqt _currentWaqt,NextPrayer _nextPrayer)
        {
            location = _location;
            timeZone = _timeZone;
            prayertimeSettings = _prayerTimeSettings;
            currentTime = _currentTime;
            waqtTimesTable = _waqtTimesTable;
            prayerTimesTable = _prayerTimesTable;
            currentwaqt = _currentWaqt;
            nextPrayer = _nextPrayer;
            Register();
        }
        public void Register()
        {
            dependency.Add(location.id, new List<IWidget> { waqtTimesTable });
            dependency.Add(timeZone.id, new List<IWidget> { currentTime, waqtTimesTable });
            dependency.Add(prayertimeSettings.id, new List<IWidget> { prayerTimesTable });
            dependency.Add(currentTime.id, new List<IWidget> { currentwaqt, nextPrayer });
            dependency.Add(waqtTimesTable.id, new List<IWidget> { currentwaqt });
            dependency.Add(prayerTimesTable.id, new List<IWidget> { nextPrayer });
            dependency.Add(currentwaqt.id, new List<IWidget> { });
            dependency.Add(nextPrayer.id, new List<IWidget> { });
        }
        public void Notify(string id)
        {
            Update(id);
        }
        public void Update(string id)
        {
            foreach (var widget in dependency[id])
            {
                widget.Update();
            }
        }
    }
}
