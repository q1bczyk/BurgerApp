using api._Entieties;

namespace api._Interfaces
{
    public interface IOrderProductRepository
    {
        void Update(OrderProduct orderProduct);
        Task<OrderProduct> AddOrderAsync(OrderProduct orderProduct);
        Task<bool> SaveAllAsync(); 
    }
}