using System;
using System.Web.Http;

namespace Sinum.Homini.DevicesMock.Controllers
{
    public class SonoffThermController : ApiController
    {
 

        // GET api/values/24.5
        public double Get()
        {
            return new Random().Next(15,30);
        }
    }
}
