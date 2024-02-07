using System.Security.Cryptography;
using System.Text;
using api._DTOs.PaymentsDTOs;
using api._Helpers;
using api._Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RestSharp;
using RestSharp.Authenticators;



namespace api._Services
{
    public class PaymentService : IPaymentService
    {
        private readonly string BaseUrl;
        private readonly int UserId;
        private readonly string Secret;
        private readonly string CRC;
        private RestClient Client;
        public PaymentService(IOptions<PaymentsSettings> config)
        {
            BaseUrl = config.Value.Url;
            UserId = config.Value.UserId;
            Secret = config.Value.Secret;
            CRC = config.Value.CRC;

            InitializeRestClient();
        }

        private void InitializeRestClient()
        {
            var options = new RestClientOptions(BaseUrl) 
            {
                Authenticator = new HttpBasicAuthenticator(UserId.ToString(), Secret)
            };

            Client = new RestClient(options);
        }

       
        public async Task<P24AccessTestRequest> TestAccess()
        {
            var request = new RestRequest("testAccess");
            var response = await Client.ExecuteAsync<P24AccessTestRequest>(request, Method.Get);
            return response.Data;
        }

         public async Task<P24TransactionResponse> RegisterAsync(P24TransactionRequest data)
        {
            throw new NotImplementedException();
        }

        private string GenerateSign(string signString)
        {
            using (SHA384 sha384Hash = SHA384.Create())
            {
                //From String to byte array
                byte[] sourceBytes = Encoding.UTF8.GetBytes(signString);
                byte[] hashBytes = sha384Hash.ComputeHash(sourceBytes);
                string hash = BitConverter.ToString(hashBytes).Replace("-", "");

                return hash.ToLower();
            }
        }

    }
}