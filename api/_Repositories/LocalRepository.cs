
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class LocalRepository : ILocalRepository
    {
        private readonly DataContext context;

        public LocalRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Local> AddLocalAsync(Local local)
        {
            context.Locals.Add(local);
            await SaveAllAsync();
            return local;
        }

        public async Task<Local> GetLocalBySlugAsync(string slug)
        {
            return await context.Locals
                                .Include(x => x.Contact)
                                .Include(x => x.OpeningHours.OrderBy(oh => oh.Order))
                                .Include(x => x.DayOffs)
                                .FirstOrDefaultAsync(x => x.Slug == slug);
        }

        public async Task<List<Local>> GetLocalsAsync()
        {
            return await context.Locals
                                .Include(x => x.Contact)
                                .Include(x => x.OpeningHours)
                                .Include(x => x.DayOffs)
                                .ToListAsync();
        }

        public async Task<bool> IsLocalExists(string id)
        {
            return await context.Locals.AnyAsync(x => x.Id == id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Local local)
        {
            context.Entry(local).State = EntityState.Modified;
        }
    }
}