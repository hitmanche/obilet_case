using CL;
using CL.Models;
using DAL.NoSql.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.NoSql.Functions
{
    public class Mongodb<TEntity>:IMongodb<TEntity> where TEntity : class
    {
        IMongoDatabase db;
        public Mongodb()
        {
            MongoClient client = new MongoClient(Configuration.prMongodb);
            db = client.GetDatabase("obilet_case");
        }
        public async Task<TEntity> GetString(string prmKey)
        {
            var returnData = db.GetCollection<BsonDocument>(prmKey).Find(new BsonDocument()).ToList();
            foreach (BsonDocument item in returnData)
            {
                return BsonSerializer.Deserialize<TEntity>(item);
            }
            return null;
        }

        public async void SetString(string prmKey, string prmValue)
        {
            var doc = JsonConvert.DeserializeObject<TEntity>(prmValue);
            await db.GetCollection<BsonDocument>(prmKey).InsertOneAsync(doc.ToBsonDocument());
        }
    }
}
