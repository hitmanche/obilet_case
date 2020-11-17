using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace CL.Models
{
    public class SessionPost
    {
        public int type { get; set; }
        public ClassConnection connection { get; set; }
        public ClassBrowser browser { get; set; }
    }
    public class ClassConnection
    {
        [JsonProperty("ip-address")]
        public string ip_address { get; set; }
        public string port { get; set; }
    }
    public class ClassBrowser
    {
        public string name { get; set; }
        public string version { get; set; }
    }
}
