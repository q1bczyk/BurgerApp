public interface IAdminRepository
{
    void Update(Admin admin);
    Task<Admin> CreateAdminAsync(Admin admin);
    Task<bool> SaveAllAsync();
}