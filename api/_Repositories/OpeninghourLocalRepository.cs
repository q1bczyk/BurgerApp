using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class OpeningHourLocalRepository : IOpeningHourLocalRepository
    {
        private readonly DataContext context;

        public OpeningHourLocalRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<OpeningHourLocal> AddOpeningHourAsync(OpeningHourLocal openingHourLocal)
        {
            context.OpeningHourLocals.Add(openingHourLocal);
            await SaveAllAsync();
            return openingHourLocal;
        }

        public async Task<OpeningHour> GetOpeningHourLocalByIdAsync(string openingHourId, string localId)
        {
            return await context.OpeningHourLocals
                .Where(o => o.LocalId == localId && o.OpeningHourId == openingHourId)
                .Include(o => o.OpeningHour)
                .Select(o => o.OpeningHour)  
                .FirstOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(OpeningHourLocal openingHourLocal)
        {
            context.Entry(openingHourLocal).State = EntityState.Modified;
        }
    }
}