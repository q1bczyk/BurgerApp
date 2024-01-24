using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class DayOffRepository : IDayOffRepository
    {
        private readonly DataContext context;

        public DayOffRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<DayOff> AddDayOff(DayOff dayOff)
        {
            await context.DayOffs.AddAsync(dayOff);
            SaveAllAsync();
            return dayOff;
        }

        public async Task<List<DayOff>> CheckDayOffExist(string date)
        {
            return await context.DayOffs
                    .Where(d => d.Date == date)
                    .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(DayOff dayOff)
        {
            context.Entry(dayOff).State = EntityState.Modified;
        }
    }
}