namespace api._Interfaces
{
    public interface IDayOffRepository
    {
        void Update(DayOff dayOff);
        Task<DayOff> AddDayOff(DayOff dayOff);
        Task<List<DayOff>> CheckDayOffExist(string date);
        Task<bool> SaveAllAsync();
    }
}