using CL;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace BL.Business.Global
{
    public class HttpRequest
    {
        HttpClient client;
        public HttpRequest(string token = null)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(Configuration.prmEndpoint);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("Authorization", token == null ? Configuration.prmToken : token);
        }

        public object RequestGet(string parameter = "")
        {
            try
            {
                object returnData = null;
                HttpResponseMessage response = client.GetAsync(parameter).Result;
                if (response.IsSuccessStatusCode)
                {
                    returnData = response.Content.ReadAsStringAsync().Result;
                }

                return returnData;
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }

        public object RequestPost(string parameter, object data = null)
        {
            try
            {
                HttpResponseMessage response = client.PostAsync(parameter, new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json")).Result;
                var dataa = response.Content.ReadAsStringAsync().Result;
                return dataa;
            }
            catch (Exception ex)
            {
                return ex.InnerException.Message;
            }
        }
    }
}
