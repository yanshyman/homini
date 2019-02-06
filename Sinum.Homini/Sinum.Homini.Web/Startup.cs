using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Sinum.Homini.Web.Startup))]
namespace Sinum.Homini.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
