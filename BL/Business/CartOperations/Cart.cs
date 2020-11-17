using CL;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace BL.Business.CartOperations
{
    public class Cart<TEntity> where TEntity : class
    {
        ACart<TEntity> cart;
        public Cart()
        {
            switch (Configuration.prmCartServer)
            {
                case CartLogic.Redis:
                    cart = new CartRedis<TEntity>();
                    break;
                case CartLogic.Mongodb:
                    cart = new CartMongo<TEntity>();
                    break;
            }
        }

        public async Task<TEntity> GetCart(string prmHashKey)
        {
            try
            {
                TEntity resultData = await cart.GetCart(prmHashKey);
                return resultData;
            }
            catch (System.Exception ex)
            {
                return null;
            }
        }

        public async Task<TEntity> AddCart(string prmHash, TEntity tData)
        {
            TEntity cartData = await GetCart(prmHash);
            if (cartData == null)
            {
                cart.AddCart(prmHash, JsonConvert.SerializeObject(tData));
                return tData;
            }
            return cartData;
        }
    }
}
