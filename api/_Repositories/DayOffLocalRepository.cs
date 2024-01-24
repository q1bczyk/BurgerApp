using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class DayOffLocalRepository : IDayOffLocalRepository
    {
        private readonly DataContext context;

        public DayOffLocalRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<DayOffLocal> AddDayOffLocalAsync(DayOffLocal dayOffLocal)
        {
            context.DayOffLocals.AddAsync(dayOffLocal);
            await SaveAllAsync();
            return dayOffLocal;
        }

        public async Task<bool> DayOffExist(string date, string localId)
        {
            return await context.DayOffLocals
                .AnyAsync(dl => dl.LocalId == localId &&
                    context.DayOffs.Any(d => d.Id == dl.DayOffId && d.Date == date));
                    
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(DayOffLocal dayOffLocal)
        {
            throw new NotImplementedException();
        }
    }
}