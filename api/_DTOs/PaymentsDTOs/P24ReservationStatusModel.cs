namespace api._DTOs.PaymentsDTOs
{
    public class P24ReservationStatusModel : P24TransactionVerifyRequest
    {
       public int Method { get; set; }
       public string Statement { get; set; }
    }
}