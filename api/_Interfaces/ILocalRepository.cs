public interface ILocalRepository
{
    void Update(Local local);
    Task<Local> AddLocalAsync(Local local);
    Task<bool> IsLocalExists(string id);
    Task<bool> SaveAllAsync();
}