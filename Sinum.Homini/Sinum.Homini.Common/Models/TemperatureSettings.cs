using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace Sinum.Homini.Common
{
    public class TemperatureSettings
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<SettingsEntry> Settings { get; set; }
        public double GetExpectedTemperature(DateTime date)
        {
            return SettingsManager.GetExpectedTemperature(date, Settings);
        }
    }
}