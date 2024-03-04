using System.Security.Cryptography;
using System.Text;
using api._Models;

namespace api._Extensions
{
    public static class AdminMethodsExtension
    {
        
        public static HashedPasswordModel PasswordHash(string password)
        {
            using var hmac = new HMACSHA512();
            HashedPasswordModel hashedPassword = new HashedPasswordModel(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)), hmac.Key);
            return hashedPassword;
        }

        public static bool DecryptPassword(string password, byte[] passwordSalt, byte[] adminPassword)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            for(int i = 0; i < computeHash.Length; i++)
                if(computeHash[i] != adminPassword[i])
                    return false;

            return true;
        }

    }
}