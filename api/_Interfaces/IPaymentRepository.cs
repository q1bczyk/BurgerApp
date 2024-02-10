using api._Entieties;

namespace api._Interfaces
{
    public interface IPaymentRepository
    {
        void Update(PaymentsDetails paymentsDetails);
        Task<PaymentsDetails> AddPaymentAsync(PaymentsDetails paymentsDetails);
        Task<bool> SaveChangesAsync();
    }
}