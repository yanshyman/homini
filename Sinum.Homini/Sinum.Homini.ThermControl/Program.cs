using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sinum.Homini.ThermControl
{
    class Program
    {
        static void Main(string[] args)
        {
            ThermController.Run().Wait();
            Console.WriteLine("Program finished");
        }
    }
}
