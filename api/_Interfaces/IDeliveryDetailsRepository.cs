using api._Entieties;

namespace api._Interfaces
{
    public interface IDeliveryDetailsRepository
    {
        void Update(DeliveryDetail deliveryDetail);
        Task<DeliveryDetail> AddDeliveryDetailsAsync(DeliveryDetail deliveryDetail);
        Task<bool> SaveAllAsync();
    }
}