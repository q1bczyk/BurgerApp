using api._Entieties;
using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext context;
        public OrderRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<Order> AddOrderAsync(Order order)
        {
            await context.Orders.AddAsync(order);
            await SaveAllAsync();
            return order;
        }

        public async Task<List<Order>> GetOrdersByStatus(string status, string localId)
        {
            return await context.Orders
                                .Where(o => o.LocalId == localId && o.OrderStatus == status)
                                .ToListAsync();
                            
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Order order)
        {
            context.Entry(order).State = EntityState.Modified;
        }
    }
}