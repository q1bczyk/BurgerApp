using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class OpeningHourRepository : IOpeningHourRepository
    {
        private readonly DataContext context;

        public OpeningHourRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<OpeningHour> AddOpeningHourAsync(OpeningHour openingHour)
        {
            context.OpeningHours.Add(openingHour);
            await SaveAllAsync();
            return openingHour;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(OpeningHour openingHour)
        {
            context.Entry(openingHour).State = EntityState.Modified;
        }
    }
}