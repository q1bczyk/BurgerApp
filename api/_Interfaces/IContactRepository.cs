public interface IContactRepository
{
    void Update(Contact contact);
    Task<Contact> FindContactByEmail(string email);
    Task<bool> SaveAllAsync();
}