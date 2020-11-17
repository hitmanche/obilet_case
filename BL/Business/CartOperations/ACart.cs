using System.Threading.Tasks;

namespace BL.Business.CartOperations
{
    public abstract class ACart<TEntity> where TEntity : class
    {
        public abstract Task<TEntity> GetCart(string prmKey);
        public abstract void AddCart(string prmKey, string prmValue);
    }
}
