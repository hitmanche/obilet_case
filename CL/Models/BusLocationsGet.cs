using Newtonsoft.Json;
using System;

namespace CL.Models
{
    public class BusLocationsGet
    {
        public object data { get; set; }

        [JsonProperty("device-session")]
        public SessionClass device_session { get; set; }
        public string date { get; set; }
        public string language { get; set; }
    }
}
