using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace  Sinum.Homini.Web.Models
{
    public class DataPoint
    {
        public DataPoint(double[] values,string description, DateTime time)
        {
            Values = values;
            Description = description;
            Time = time;
        }
        public double[] Values { get; set; }
        public DateTime Time { get; set; }
        public  string Description { get; set; }
    }
}