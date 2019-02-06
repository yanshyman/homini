using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Sinum.Homini.Common;
using Sinum.Homini.Web.Models;

namespace Sinum.Homini.Web.Controllers
{
    public class SettingsController : ApiController
    {
        public double GetExpectedTemperature(DateTime date)
        {
          return  SettingsManager.GetExpectedTemperature(date);
        }

        [HttpGet]
        [System.Web.Http.Route("api/currentsettings")]
        public TemperatureSettings GetCurrentSettings()
        {
            return SettingsManager.GetCurrentSettings();
        }

     


        // POST api/values
        public void SetExpectedTemperature([FromBody]TemperatureSettings entry)
        {

            SettingsManager.SaveSettings(entry);
        }


    }
}
