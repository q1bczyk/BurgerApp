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

        public async Task<Order> GetOrderByLocalId(string localId, string orderId)
        {
            return await context.Orders
                        .Include(o => o.Products) 
                            .ThenInclude(p => p.Ingredients)
                        .Include(o => o.ClientsContact)
                            .ThenInclude(c => c.DeliveryDetail)
                        .FirstOrDefaultAsync(o => o.LocalId == localId && o.Id == orderId);
        }

        public async Task<Order> GetOrderByOrderId(string orderId)
        {
            return await context.Orders
                        .Include(o => o.Products) 
                            .ThenInclude(p => p.Ingredients)
                        .Include(o => o.ClientsContact)
                            .ThenInclude(c => c.DeliveryDetail)
                        .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task<List<Order>> GetOrdersByStatus(string status, string localId)
        {
            return await context.Orders
                                .Where(o => o.LocalId == localId && o.OrderStatus == status && o.PaymentsDetails.IsPaymentDone == true || o.PaymentsDetails.IsPaymentDone == null)
                                .Include(o => o.Products) 
                                    .ThenInclude(p => p.Ingredients)
                                .Include(o => o.ClientsContact)
                                    .ThenInclude(c => c.DeliveryDetail)
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