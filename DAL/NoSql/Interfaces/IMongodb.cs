using System.Threading.Tasks;

namespace DAL.NoSql.Interfaces
{
    public interface IMongodb<TEntity> where TEntity : class
    {
        public void SetString(string prmKey, string prmValue);
        public Task<TEntity> GetString(string prmKey);
    }
}
