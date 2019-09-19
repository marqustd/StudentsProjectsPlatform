using Newtonsoft.Json;

namespace Platform.Infrastructure.Models
{
    public class ApiJsonError
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("locationType")]
        public string LocationType { get; set; }
    }
}