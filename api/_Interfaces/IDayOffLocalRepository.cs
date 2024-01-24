namespace api._Interfaces
{
    public interface IDayOffLocalRepository
    {
        void Update(DayOffLocal dayOffLocal);
        Task<DayOffLocal> AddDayOffLocalAsync(DayOffLocal dayOffLocal);
    }
}