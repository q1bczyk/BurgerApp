using System.ComponentModel.DataAnnotations;

namespace api._DTOs.PaymentsDTOs
{
    public class P24TransactionRequest
    {
        public P24TransactionRequest(int amount, string currency, string description, string email, string country, string language, string urlReturn)
        {
            SessionId = DateTime.Now.Ticks.ToString();
            Amount = amount;
            Currency = currency;
            Description = description;
            Email = email;
            Country = country;
            Language = language;
            UrlReturn = urlReturn;
        }

        public int MerchantId { get; set; }
        public int PosId { get; set; }
        public string SessionId { get; set; } 
        public int Amount { get; set; }
        public string Currency { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string Language { get; set; }
        public string UrlReturn { get; set; }
        public string UrlStatus { get; set; }
        public string Sign { get; set; }
    }
}