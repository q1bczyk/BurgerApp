using api._Entieties;
using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class DeliveryDetailsRepository : IDeliveryDetailsRepository
    {
        private readonly DataContext context;
        public DeliveryDetailsRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<DeliveryDetail> AddDeliveryDetailsAsync(DeliveryDetail deliveryDetail)
        {
            await context.DeliveryDetails.AddAsync(deliveryDetail);
            await SaveAllAsync();
            return deliveryDetail;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(DeliveryDetail deliveryDetail)
        {
            context.Entry(deliveryDetail).State = EntityState.Modified;
        }
    }
}