using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace CL.Models
{

    public class ReturnSessionClass
    {
        [BsonId]
        public string _id { get; set; }
        public string status { get; set; }
        public ReturnData data { get; set; }
        public string message { get; set; }
        [JsonProperty("user-message")]
        public string user_message { get; set; }
        [JsonProperty("api-request-id")]
        public string api_request_id { get; set; }
        public string controller { get; set; }
        [JsonProperty("client-request-id")]
        public string client_request_id { get; set; }
    }
    public class ReturnData
    {
        [JsonProperty("session-id")]
        public string session_id { get; set; }
        [JsonProperty("device-id")]
        public string device_id { get; set; }
        public string affiliate { get; set; }
        [JsonProperty("device-type")]
        public int device_type { get; set; }
    }
}
