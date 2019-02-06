using System;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Sinum.Homini.Common
{
    public class ConfigRepository
    {
        public static Config GetConfig()
        {
            var appdata = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            var path = $@"{appdata}\config.json";
            var o1 = JObject.Parse(File.ReadAllText(path));
            return o1.ToObject<Config>();
        }

        public static string GetWheatherUrlForCity(string city)
        {
            return $"{ConfigRepository.Config.WheatherApiUrl}" +
                    $"&appid={ConfigRepository.Config.WeatherApiKey}&q={city}";
        }

        public static Config Config => GetConfig();

        public static void SetDeviceHost(string host)
        {
            var config = GetConfig();
            config.RemoteDeviceHost = host;
            SaveSettings(config);
        }
        public static void SaveSettings(Config config)
        {
            if (config == null)
            {
                config = new Config();
            }
            var appdata = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            var path = $@"{appdata}\config.json";
            var settingsJson = JsonConvert.SerializeObject(config, Formatting.Indented);
            File.WriteAllText(path, settingsJson);
        }
    }
}
