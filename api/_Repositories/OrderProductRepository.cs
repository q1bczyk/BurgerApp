using api._Entieties;
using api._Interfaces;

namespace api._Repositories
{
    public class OrderProductRepository : IOrderProductRepository
    {
        private readonly DataContext context;
        public OrderProductRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<OrderProduct> AddOrderAsync(OrderProduct orderProduct)
        {
            await context.OrderProducts.AddAsync(orderProduct);
            await SaveAllAsync();
            return orderProduct;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(OrderProduct orderProduct)
        {
            throw new NotImplementedException();
        }
    }
}