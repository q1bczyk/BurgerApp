
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