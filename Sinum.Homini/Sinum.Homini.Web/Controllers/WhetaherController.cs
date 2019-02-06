using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using Sinum.Homini.Common;
using Sinum.Homini.Web.Models;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Sinum.Homini.Web.Controllers
{
  
    public class WhetaherController : ApiController
    {
        [HttpGet]
        [Route("api/wheather")]
        public async Task<WheatherData> Get()
        {
            return await Get(ConfigRepository.Config.DefaultCity);
        }

        [HttpGet]
        [Route("api/wheather/{city}")]
        public async Task<WheatherData> Get(string city)
        {
            var wheatherApiUrl = ConfigRepository.GetWheatherUrlForCity(city);
            return await JsonDownloader.DownloadSerializedJsonDataAsync<WheatherData>(wheatherApiUrl);
        }
    }
}
