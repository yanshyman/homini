using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Sinum.Homini.Common
{
  public  class DeviceManager
    {
        private static HttpClient Client => new HttpClient();
        private Config Config => ConfigRepository.GetConfig();

        public static Task<HttpResponseMessage> RunCommandAsync(string url,int port, string command)
        {
         return Client.GetAsync(new Uri($"http://{url}:{port}/{command}"));
        }

        public  Task<HttpResponseMessage> StartStopBoiler(string url, double insideTemperature)
        {
            var expectedTemperature = SettingsManager.GetExpectedTemperature(DateTime.Now);
            var isSwitchOn = expectedTemperature < insideTemperature ? 1 : 0;

            if (url != "::1")
            {
                ConfigRepository.SetDeviceHost(url);
                return RunCommandAsync(Config.RemoteDeviceHost, Config.BoilerPort, $"gpio,12,{isSwitchOn}");
            }
            else
            {
                return RunCommandAsync(Config.BoilerLocalHost, 80, $"gpio,12,{isSwitchOn}");
            }
        }
    }
}
