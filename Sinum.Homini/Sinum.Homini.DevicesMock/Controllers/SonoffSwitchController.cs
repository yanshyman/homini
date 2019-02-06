using System;
using System.IO;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Sinum.Homini.DevicesMock.Models;

namespace Sinum.Homini.DevicesMock.Controllers
{
    public class SonoffSwitchController : ApiController
    {
        // GET api/values/24.5
        public int Get()
        {
            var appdata = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            var  path = $@"{appdata}\sonoffSwitch.json";
            var o1 = JObject.Parse(File.ReadAllText(path));
            return o1.ToObject<SonoffSwitch>().Status;
        }

        // POST api/values
        public void Get(int value)
        {
            var appdata = AppDomain.CurrentDomain.GetData("DataDirectory").ToString();
            var path = $@"{appdata}\sonoffSwitch.json";
            var sonoffStatus = new JObject(new JProperty("Status", value));

            using (var file = File.CreateText(path))
            using (var writer = new JsonTextWriter(file))
            {
                sonoffStatus.WriteTo(writer);
            }
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
