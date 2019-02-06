using System.Web;
using System.Web.Mvc;

namespace Sinum.Homini.DevicesMock
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
