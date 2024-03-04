namespace api._Interfaces
{
    public interface IOpeningHourRepository
    {
        void Update(OpeningHour openingHour);
        Task<OpeningHour> AddOpeningHourAsync(OpeningHour openingHour);
        Task<OpeningHour> GetOpeningHourById(string id);
        Task<bool> SaveAllAsync();
    }
}