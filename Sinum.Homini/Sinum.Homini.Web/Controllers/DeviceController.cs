using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Sinum.Homini.Common;

namespace Sinum.Homini.Web.Controllers
{

    public class DeviceController : ApiController
    {
        [HttpGet]
        public Task<HttpResponseMessage> RunCommand(string url,int port, string command)
        {
            return DeviceManager.RunCommandAsync(url, port, command);
        }

    }
}
