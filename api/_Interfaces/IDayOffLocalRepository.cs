namespace api._Interfaces
{
    public interface IDayOffLocalRepository
    {
        void Update(DayOffLocal dayOffLocal);
        Task<DayOffLocal> AddDayOffLocalAsync(DayOffLocal dayOffLocal);
        Task<bool> DayOffExist(string date, string localId);
        Task<List<DayOff>> GetDayOffs(string localId);
        Task<List<DayOff>> GetDayOffsToDelete(string date);
        Task<bool> DeleteDayOffLocalAsync(string id, string localId);
        Task<bool> SaveAllAsync();
    }
}