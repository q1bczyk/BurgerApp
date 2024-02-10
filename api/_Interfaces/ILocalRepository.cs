public interface ILocalRepository
{
    void Update(Local local);
    Task<List<Local>> GetLocalsAsync();
    Task<Local> GetLocalBySlugAsync(string slug);
    Task<Local> AddLocalAsync(Local local);
    Task<bool> IsLocalExists(string id);
    Task<bool> SaveAllAsync();
}