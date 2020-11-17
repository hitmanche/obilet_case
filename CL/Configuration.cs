using System;
using System.Collections.Generic;
using System.Text;

namespace CL
{
    public static class Configuration
    {
        public const string prmEndpoint = " https://v2-api.obilet.com/";
        public const string prmToken = "Basic ZEdocGMybHpZV0p5WVc1a2JtVjNZbWx1";
        //REDIS SERVER ADRESI #####
        public const string prmRedisUrl = "213.159.7.199:6379";
        // MONGODB SERVER ADRESI ########
        public const string prMongodb = "mongodb://213.159.7.199:27017";
        //KARTA ATILAN URUNLERIN KARTTA KALACAGI SURE (DK) #####
        public const int prmExpiresCart = 180;
        //KARTA ATILAN VERILER HANGI SERVER UZERINDE TUTULACAK #####
        public const CartLogic prmCartServer = CartLogic.Redis;
    }
    public enum CartLogic
    {
        Redis = 0,
        Mongodb = 1
    }
}
