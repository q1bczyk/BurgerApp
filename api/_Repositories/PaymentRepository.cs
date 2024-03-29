using api._Entieties;
using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly DataContext context;
        public PaymentRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<PaymentsDetails> AddPaymentAsync(PaymentsDetails paymentsDetails)
        {
            await context.PaymentsDetails.AddAsync(paymentsDetails);
            return paymentsDetails;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(PaymentsDetails paymentsDetails)
        {
            context.Entry(paymentsDetails).State = EntityState.Modified;
        }
    }
}