using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sinum.Homini.Web
{
    public class DefaultSettings
    {
        public double DefaultNightTemperature => Convert.ToDouble(ConfigurationManager.AppSettings["DefaultNightTemperature"]);
        public double DefaultDayTemperature => Convert.ToDouble(ConfigurationManager.AppSettings["DefaultDayTemperature"]);
        public TimeSpan DefaultDayStart => new TimeSpan(21,int.Parse(ConfigurationManager.AppSettings["DefaultDayStart"]),0, 0);
        public TimeSpan DefaultDayEnd => new TimeSpan(21,int.Parse(ConfigurationManager.AppSettings["DefaultDayEnd"]),0, 0);
    }
}