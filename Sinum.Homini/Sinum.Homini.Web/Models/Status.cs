using System.Collections.Generic;

namespace Sinum.Homini.Web.Models
{
    public class Status
    {
        public WheatherData WheatherData { get; set; }
        public List<DataPoint> Measurments { get; set; }
    }
}