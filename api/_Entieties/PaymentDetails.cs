namespace api._Entieties
{
    public class PaymentDetails
    {
        public string OrderId { get; set; }
        public Order Order { get; set; }
        public string SessionId { get; set; }
        public string Token { get; set; }
        public bool IsPaymentDone { get; set; }
    }
}