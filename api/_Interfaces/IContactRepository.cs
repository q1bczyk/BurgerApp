public interface IContactRepository
{
    void Update(Contact contact);
    Task<Contact> FindContactByEmail(string email);
    Task<Contact> FindContactByLocalIdAsync(string localId);
    Task<bool> SaveAllAsync();
}