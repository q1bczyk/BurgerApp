public interface IContactRepository
{
    void Update(Contact contact);
    Task<Contact> AddContactAsync(Contact contact);
    Task<bool> SaveAllAsync();
}