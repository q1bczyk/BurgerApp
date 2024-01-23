namespace api._Interfaces
{
    public interface IOpeningHourLocalRepository
    {
        void Update(OpeningHourLocal openingHourLocal);
        Task<OpeningHourLocal> AddOpeningHourAsync(OpeningHourLocal openingHourLocal);
        Task<bool> SaveAllAsync();
    }
}