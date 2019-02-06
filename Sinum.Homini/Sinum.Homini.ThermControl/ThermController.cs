using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Sinum.Homini.ThermControl
{
    public class ThermController
    {
        public static async Task<double> GetCurrentTemperatureAsync()
        {
            try
            {
                var path = "http://localhost:8266/api/SonoffTherm";
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var response = await client.GetAsync(new Uri(path));
                var content = await response.Content.ReadAsStringAsync();
                return Convert.ToDouble(content);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
           
        }

        public static async Task Run()
        {
            var currentTemperature = await GetCurrentTemperatureAsync().ConfigureAwait(false);
            ThermLogger.LogTemperature(currentTemperature);
            var expectedTemperature = await GetExpectedTemperatureAsync(DateTime.Now);
            var isToCold = currentTemperature < expectedTemperature;
            await SwitchHeating(isToCold);
        }

        private static async Task SwitchHeating(bool isToCold)
        {
            var isHeatingOn = await GetHeatingStatus();
            if (isHeatingOn ==  isToCold) return;
            Switch(isToCold);
        }

        private static async Task Switch(bool isOnSwitching)
        {
            var path = "http://localhost:8266/api/SonoffSwitch/"+(isOnSwitching?1:0);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.GetAsync(new Uri(path));
           
        }

        private static async Task<bool> GetHeatingStatus()
        {
            var path = "http://localhost:8266/api/SonoffSwitch";
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.GetAsync(new Uri(path));
            var content = await response.Content.ReadAsStringAsync();

            return bool.Parse(content);
        }
        static readonly HttpClient client = new HttpClient();
        private static async Task<double> GetExpectedTemperatureAsync(DateTime now)
        {
            var path = "http://localhost:2119/api/Settings?date=" + now;
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.GetAsync(new Uri(path));
            var content = await response.Content.ReadAsStringAsync();

            return Convert.ToDouble(content);
        }


    }
}
