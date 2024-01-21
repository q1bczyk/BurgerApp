
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class ContactRepository : IContactRepository
    {
        public readonly DataContext context;

        public ContactRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Contact> AddContactAsync(Contact contact)
        {
            context.Contacts.Add(contact);
            await SaveAllAsync();
            return contact;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Contact contact)
        {
            context.Entry(contact).State = EntityState.Modified;
        }
    }
}