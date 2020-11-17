using System.Threading.Tasks;

namespace DAL.NoSql.Interfaces
{
    public interface IRedis
    {
        public void SetString(string prmKey, string prmValue);
        public Task<string> GetString(string prmKey);
    }
}
