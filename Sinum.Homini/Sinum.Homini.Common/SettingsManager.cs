using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Sinum.Homini.Common
{
    public class SettingsManager
    {
        public static List<SettingsEntry> GetDefaultSettings()
        {
            var result = new List<SettingsEntry>();

            foreach (DayOfWeek day in Enum.GetValues(typeof(DayOfWeek)))
            {
                result.Add(new SettingsEntry { DayOfWeek = day, EndHour = new TimeSpan(21, 0, 0), StartHour = new TimeSpan(7, 0, 0), Temperature = 21});
                result.Add(new SettingsEntry{DayOfWeek = day,EndHour = new TimeSpan(7, 0, 0),StartHour = new TimeSpan(21, 0, 0), Temperature = 19  });
            }
            return result;
        }

        public static double GetDefaultTemperatureForDate(DateTime date)
        {
            return GetExpectedTemperature(date, GetDefaultSettings());

        }

        public static double GetExpectedTemperature(DateTime date, List<SettingsEntry> settings)
        {
            var daySettings = settings.Where(x => x.DayOfWeek == date.DayOfWeek).ToList();
            var hourSettings = daySettings.FirstOrDefault(e => e.StartHour <= date.TimeOfDay && e.EndHour >= date.TimeOfDay);
            if (daySettings.Any() && hourSettings != null)
            {
                return hourSettings.Temperature;
            }
            return GetDefaultTemperatureForDate(date);
        }
        public static double GetExpectedTemperature(DateTime date)
        {
            return GetCurrentSettings().GetExpectedTemperature(date);
        }
        public static TemperatureSettings GetCurrentSettings()
        {
            var appdata = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            var path = $@"{appdata}\TemperatureSettings.json";
            var o1 = JObject.Parse(File.ReadAllText(path));
            return o1.ToObject<TemperatureSettings>();
        }
        public static void SetExpectedTemperature(SettingsEntry entry)
        {
            var settings = new TemperatureSettings {Settings = GetDefaultSettings()};
            SaveSettings(settings);
        }



        public static void SaveSettings(TemperatureSettings settings)
        {
            if (settings == null)
            {
                settings = new TemperatureSettings
                {
                    Id = Guid.NewGuid(),
                    Settings = GetDefaultSettings()
                };
            }
            var appdata = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            var path = $@"{appdata}\TemperatureSettings.json";
            var settingsJson = JsonConvert.SerializeObject(settings, Formatting.Indented);
            File.WriteAllText(path, settingsJson);
        }


        public static List<int> GetOpenPorts(string host)
        {
           var result= new List<int>();

            for (var i = 0; i < 9999; i++)
            {
             if   (CheckPort(host,i)) result.Add(i);
            }
            return result;
        }

        private static bool CheckPort(string host, int port)
        {
            using (var tcpClient = new TcpClient())
            {
                try
                {
                    tcpClient.Connect(host, port);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
    }
}