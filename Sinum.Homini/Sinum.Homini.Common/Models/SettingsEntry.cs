using System;

namespace Sinum.Homini.Common
{
    public class SettingsEntry
    {
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartHour { get; set; }
        public TimeSpan EndHour { get; set; }
        public double Temperature { get; set; }

    }
}