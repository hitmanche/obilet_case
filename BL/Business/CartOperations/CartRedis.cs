using DAL.NoSql.Functions;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace BL.Business.CartOperations
{
    public class CartRedis<TEntity> : ACart<TEntity> where TEntity : class
    {
        Redis redis;
        public CartRedis()
        {
            redis = new Redis();
        }

        public override void AddCart(string prmKey, string prmValue)
        {
            redis.SetString(prmKey, prmValue);
        }

        public override async Task<TEntity> GetCart(string prmKey)
        {
            return JsonConvert.DeserializeObject<TEntity>(await redis.GetString(prmKey));
        }
    }
}
