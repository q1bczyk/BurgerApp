using api._Entieties;

namespace api._Interfaces
{
    public interface IClientContactRepository
    {
        void Update(ClientsContact clientsContact);
        Task<ClientsContact> AddClientsContactAsync(ClientsContact clientsContact);
        Task<bool> SaveAllAsync();
    }
}