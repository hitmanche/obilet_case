using BL.Business.OBiletOperations;
using CL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace obilet_case.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OBiletController : ControllerBase
    {
        [Route("getsession")]
        [HttpPost]
        public async Task<ActionResult<string>> GetSession([FromBody] SessionPost prmSessionData)
        {
            return Ok(await new OBilet().GetSession(prmSessionData));
        }

        [Route("getbuslocations")]
        [HttpPost]
        public ActionResult<string> GetBusLocations([FromBody] SessionClass prmSessionClass)
        {
            return Ok(new OBilet().GetBusLocations(prmSessionClass));
        }

        [Route("getjourneys")]
        [HttpPost]
        public ActionResult<string> GetJourneys([FromBody] JourneysGet prmJourneysClass)
        {
            return Ok(new OBilet().GetJourneys(prmJourneysClass));
        }
    }
}