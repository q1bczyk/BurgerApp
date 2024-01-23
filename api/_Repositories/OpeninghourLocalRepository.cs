using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class OpeninghourLocalRepository : IOpeningHourLocalRepository
    {
        private readonly DataContext context;

        public OpeninghourLocalRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<OpeningHourLocal> AddOpeningHourAsync(OpeningHourLocal openingHourLocal)
        {
            context.OpeningHourLocals.Add(openingHourLocal);
            await SaveAllAsync();
            return openingHourLocal;
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