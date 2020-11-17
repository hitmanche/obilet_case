using BL.Business.CartOperations;
using BL.Business.Global;
using CL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL.Business.OBiletOperations
{
    public class OBilet
    {
        Cart<ReturnSessionClass> cartSession;
        public OBilet()
        {
            cartSession = new Cart<ReturnSessionClass>();
        }
        public async Task<object> GetSession(SessionPost prmSessionPost)
        {
            string prmHash = Hash.SHA256(JsonConvert.SerializeObject(prmSessionPost));
            var ssData = await cartSession.GetCart(prmHash);
            if (ssData == null)
            {
                var postData = JsonConvert.DeserializeObject<ReturnSessionClass>(new HttpRequest().RequestPost("/api/client/getsession", prmSessionPost).ToString());
                await cartSession.AddCart(prmHash, postData);
                return JsonConvert.SerializeObject(postData);
            }
            else
            {
                return JsonConvert.SerializeObject(ssData);
            }
        }

        public object GetBusLocations(SessionClass prmSessionClass)
        {
            return new HttpRequest().RequestPost("/api/location/getbuslocations", new BusLocationsGet()
            {
                data = null,
                date = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss"),
                device_session = prmSessionClass,
                language = "tr-TR"
            });
        }

        public object GetJourneys(JourneysGet prmJourneysClass)
        {
            return new HttpRequest().RequestPost("/api/journey/getbusjourneys", prmJourneysClass);
        }
    }
}
