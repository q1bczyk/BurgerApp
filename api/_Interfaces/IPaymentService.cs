using api._DTOs.OrderDTOs;
using api._DTOs.PaymentsDTOs;

namespace api._Interfaces
{
    public interface IPaymentService
    {
        public Task<P24AccessTestRequest> TestAccess();
        public Task<P24TransactionResponse> RegisterAsync(OrderPostDTO data, string orderId);
        public Task<P24TransactionVerifyResponse>TransactionVerifyAsync(P24TransactionVerifyRequest data);
    }
}