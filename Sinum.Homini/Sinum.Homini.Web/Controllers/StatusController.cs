using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using Sinum.Homini.Common;
using Sinum.Homini.Web.Models;
using System.Threading.Tasks;

namespace Sinum.Homini.Web.Controllers
{
  
    public class StatusController : ApiController

    {

        private static HttpClient Client => new HttpClient();
        private static Config Config => ConfigRepository.GetConfig();

        [HttpGet]
        [System.Web.Http.Route("api/openports")]
        public List<int> GetOpenPorts(string host)
        {
            return SettingsManager.GetOpenPorts(host);
        }
        public static DataPoint InsideTemperature(int rownum = 1)
        {
            var wheatherData = Client.GetAsync(new Uri($"{Config.TemperatureInisdeUrl}?results={rownum}"));
            return new DataPoint(new []{Convert.ToDouble(wheatherData.Result.Content.ToString())},"InsideTemperature",
                DateTime.Parse(wheatherData.Result.Content.ToString()));
        }

        [HttpGet]
        [System.Web.Http.Route("api/config")]
        public Config GetConfig()
        {
            return Config;
        }

        public static DataPoint HeatingStatus(int rownum = 1)
        {
            var wheatherData = Client.GetAsync(new Uri($"{Config.TemperatureInisdeUrl}?results={rownum}"));
            return new DataPoint(new[] { Convert.ToDouble(wheatherData.Result.Content.ToString()) }, 
                "HeatingStatus", DateTime.Parse(wheatherData.Result.Content.ToString()));
        }

    }
}
