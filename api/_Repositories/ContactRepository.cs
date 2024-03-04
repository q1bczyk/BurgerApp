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

        public Task<Contact> FindContactByEmail(string email)
        {
            return context.Contacts
                .FirstOrDefaultAsync(x => x.Email == email.ToLower());
        }

        public async Task<Contact> FindContactByLocalIdAsync(string localId)
        {
            return await context.Contacts
                .FirstOrDefaultAsync(c => c.LocalId == localId);
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