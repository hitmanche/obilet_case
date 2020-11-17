using Newtonsoft.Json;

namespace CL.Models
{
    public class JourneysGet
    {
        public string date { get; set; }
        public string language { get; set; }
        public JourneyData data { get; set; }

        [JsonProperty("device-session")]
        public SessionClass device_session { get; set; }
    }
    public class JourneyData
    {
        [JsonProperty("origin-id")]
        public int origin_id { get; set; }

        [JsonProperty("destination-id")]
        public int destination_id { get; set; }

        [JsonProperty("departure-date")]
        public string departure_date { get; set; }
    }
}
