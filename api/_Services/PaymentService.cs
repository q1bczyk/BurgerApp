using System.Security.Cryptography;
using System.Text;
using api._DTOs.OrderDTOs;
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
        private readonly string ApiDomeinName;
        private readonly string ClientDomeinName;
        private RestClient Client;
        public PaymentService(IOptions<PaymentsSettings> config)
        {
            BaseUrl = config.Value.Url;
            UserId = config.Value.UserId;
            Secret = config.Value.Secret;
            CRC = config.Value.CRC;
            ApiDomeinName = config.Value.ApiDomeinName;
            ClientDomeinName = config.Value.ClientDomeinName;

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

        public async Task<P24TransactionResponse> RegisterAsync(OrderPostDTO orderPostDTO, string orderId)
        {

            int amount = Convert.ToInt32(orderPostDTO.Price * 100);
            P24TransactionRequest data = new P24TransactionRequest(amount, "PLN", "Zamówienie", orderPostDTO.ClientsContact.Email, "PL", "pl", $"{ClientDomeinName}/{orderPostDTO.LocalId}/potwierdzenie/{orderId}");

            data.MerchantId = UserId;
            data.PosId = UserId;
            data.UrlStatus = $"{ApiDomeinName}api/order/confirm-payment";
            var signString = $"{{\"sessionId\":\"{data.SessionId}\",\"merchantId\":{data.MerchantId},\"amount\":{data.Amount},\"currency\":\"{data.Currency}\",\"crc\":\"{CRC}\"}}";
            data.Sign = GenerateSign(signString);
            var request = new RestRequest("transaction/register");
            request.AddJsonBody(data);

            var response = await Client.ExecuteAsync<P24TransactionResponse>(request, Method.Post);

            response.Data.SessionId = data.SessionId;
            return response.Data;
        }

         public async Task<P24TransactionVerifyResponse> TransactionVerifyAsync(P24TransactionVerifyRequest data)
        {
           var signString = $"{{\"sessionId\":\"{data.SessionId}\",\"orderId\":{data.OrderId},\"amount\":{data.Amount},\"currency\":\"{data.Currency}\",\"crc\":\"{CRC}\"}}";
            data.Sign = GenerateSign(signString);

            var request = new RestRequest("transaction/verify");
            request.AddJsonBody(data);

            var response = await Client.ExecuteAsync<P24TransactionVerifyResponse>(request, Method.Put);
            
            return response.Data;
        }

    }
}