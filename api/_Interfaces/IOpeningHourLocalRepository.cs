namespace api._Interfaces
{
    public interface IOpeningHourLocalRepository
    {
        void Update(OpeningHourLocal openingHourLocal);
        Task<OpeningHourLocal> AddOpeningHourAsync(OpeningHourLocal openingHourLocal);
        Task<OpeningHour> GetOpeningHourLocalByIdAsync(string openingHourId, string localId);
        Task<bool> CheckIsDayOffByLocalId(string localId, string day);
        Task<OpeningHour> GetOpeningHourByLocalIdAsync(string localId, string day);
        Task<bool> SaveAllAsync();
    }
}