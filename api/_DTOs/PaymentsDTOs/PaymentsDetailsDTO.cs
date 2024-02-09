namespace api._DTOs.PaymentsDTOs
{
    public class PaymentsDetailsDTO
    {
        public string OrderId { get; set; }
        public string SessionId { get; set; }
        public bool IsPaymentDone { get; set; }
    }
}