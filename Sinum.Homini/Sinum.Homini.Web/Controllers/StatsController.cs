using System;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Sinum.Homini.Common;

namespace Sinum.Homini.Web.Controllers
{
    public class StatsController : ApiController
    {
        private HttpClient Client => new HttpClient();
        private Config Config => ConfigRepository.GetConfig();

        private DeviceManager DeviceManager => new DeviceManager();

        [HttpGet]
        public async void FeedCahnnelWithDataAsync(double insideTemperature)
        {
            var wheatherData = await new WhetaherController().Get();
            await DeviceManager.StartStopBoiler(HttpContext.Current.Request.UserHostAddress, insideTemperature);
            SaveMeasurements(new[] { insideTemperature, wheatherData.main.temp });
        }

        public void SaveMeasurements(double[] measurements)
        {
            var feedUrl = Config.DataChannelUrl;

            for (var i = 0; i <= measurements.Length; i++)
            {
                feedUrl += $"&field{i + 1}={measurements[i]}";
            }
            Client.GetAsync(new Uri(feedUrl));
        }
    }
}
