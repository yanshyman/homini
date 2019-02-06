using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sinum.Homini.Common
{
    public class Config
    {
        public string WeatherApiKey { get; set; }
        public string WheatherApiUrl { get; set; }
        public string DefaultCity { get; set; }
        public string DataChannelUrl { get; set; }
        public string TemperatureInisdeUrl { get; set; }
        public string HeatingStatusUrl { get; set; }
        public string RemoteDeviceHost { get; set; }
        public string BoilerLocalHost { get; set; }

        public int BoilerPort { get; set; }

    }
}
