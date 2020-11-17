using Newtonsoft.Json;

namespace CL.Models
{
    public class SessionClass
    {
        [JsonProperty("device-id")]
        public string device_id { get; set; }

        [JsonProperty("session-id")]
        public string session_id { get; set; }
    }
}
