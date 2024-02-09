using api._DTOs.OrderDTOs;
using api._DTOs.PaymentsDTOs;

namespace api._Interfaces
{
    public interface IPaymentService
    {
        public Task<P24AccessTestRequest> TestAccess();
        public Task<P24TransactionResponse> RegisterAsync(OrderPostDTO data);
    }
}