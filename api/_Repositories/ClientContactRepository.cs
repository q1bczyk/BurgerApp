using api._Entieties;
using api._Interfaces;

namespace api._Repositories
{
    public class ClientContactRepository : IClientContactRepository
    {
        private readonly DataContext context;
        public ClientContactRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<ClientsContact> AddClientsContactAsync(ClientsContact clientsContact)
        {
            await context.ClientsContacts.AddAsync(clientsContact);
            await SaveAllAsync();
            return clientsContact;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(ClientsContact clientsContact)
        {
            throw new NotImplementedException();
        }
    }
}