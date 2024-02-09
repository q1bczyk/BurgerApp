using api._Entieties;

namespace api._Interfaces
{
    public interface IOrderRepository
    {
        void Update(Order order);
        Task<Order> AddOrderAsync(Order order);
        Task<List<Order>> GetOrdersByStatus(string status, string localId);
        Task<Order> GetOrderByLocalId(string localId, string orderId);
        Task<Order> GetOrderByOrderId(string orderId);
        Task<Order> GetPaymentDetails(string sessionId);
        Task<bool> SaveAllAsync();
    }
}