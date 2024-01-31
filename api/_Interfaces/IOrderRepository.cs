using api._Entieties;

namespace api._Interfaces
{
    public interface IOrderRepository
    {
        void Update(Order order);
        Task<Order> AddOrderAsync(Order order);
        Task<List<Order>> GetOrdersByStatus(string status, string localId);
        Task<bool> SaveAllAsync();
    }
}