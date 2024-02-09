namespace api._DTOs.PaymentsDTOs
{
    public class P24TransactionResponse
    {
        public TokenData Data { get; set; }
        public string SessionId { get; set; }
    }

    public class TokenData
    {
        public string Token { get; set;}
        public int ResponseStatus { get; set; }
    }
}

