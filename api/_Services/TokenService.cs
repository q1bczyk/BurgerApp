using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api._Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace api._Services
{
    public class TokenService : ITokenservice
    {
        private readonly SymmetricSecurityKey key;
        public TokenService(IConfiguration config)
        {
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreateToken(string localId)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Name, localId),
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenhandler = new JwtSecurityTokenHandler();

            var token = tokenhandler.CreateToken(tokenDescriptor);
            
            return tokenhandler.WriteToken(token);
        }

    }

}