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
            await SaveAllAsync();
            return dayOff;
        }

        public async Task<bool> DeleteDayOffById(string id)
        {
            var dayOffToDelete = await GetDayOffById(id);
            
            if(dayOffToDelete != null)
                context.DayOffs.Remove(dayOffToDelete);

            else 
                return false; 

            return await context.SaveChangesAsync() > 0;
        }

        public async Task<DayOff> GetDayOffByDate(string date)
        {
            return await context.DayOffs
                .FirstOrDefaultAsync(dayOff => dayOff.Date == date);
        }

        public async Task<DayOff> GetDayOffById(string id)
        {
            return await context.DayOffs
                .FirstOrDefaultAsync(dayOff => dayOff.Id == id);
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