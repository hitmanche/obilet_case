using DAL.NoSql.Functions;
using System.Threading.Tasks;

namespace BL.Business.CartOperations
{
    class CartMongo<TEntity> : ACart<TEntity> where TEntity : class
    {
        Mongodb<TEntity> mongodb;
        public CartMongo()
        {
            mongodb = new Mongodb<TEntity>();
        }
        public override void AddCart(string prmKey, string prmValue)
        {
            mongodb.SetString(prmKey, prmValue);
        }

        public async override Task<TEntity> GetCart(string prmKey)
        {
            return await mongodb.GetString(prmKey);
        }
    }
}
