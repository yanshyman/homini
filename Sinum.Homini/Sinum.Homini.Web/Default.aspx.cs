using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Web;

namespace Sinum.Homini.Web
{
    public partial class Default : System.Web.UI.Page
    {
        [SuppressMessage(
            "Microsoft.Performance",
            "CA1822:MarkMembersAsStatic",
            Justification = "It is used in .aspx markup")]
        public string MinString
        {
            get
            {
#if DEBUG
                return string.Empty;
#else
return ".min";
#endif
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            Debug.WriteLine("yes");
        }
    }
}