public interface IAdminRepository
{
    void Update(Admin admin);
    Task<Admin> FindAdminByLocalId(string localId);
    Task<bool> SaveAllAsync();
}