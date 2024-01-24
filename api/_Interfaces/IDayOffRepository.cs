namespace api._Interfaces
{
    public interface IDayOffRepository
    {
        void Update(DayOff dayOff);
        Task<DayOff> AddDayOff(DayOff dayOff);
        Task<DayOff> GetDayOffByDate(string date);
        Task<bool> SaveAllAsync();
    }
}