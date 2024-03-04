using Microsoft.EntityFrameworkCore;

public class AdminRepository : IAdminRepository
{
    private readonly DataContext context;

    public AdminRepository(DataContext context)
    {
        this.context = context;
    }

    public async Task<Admin> FindAdminByLocalId(string localId)
    {
        return await context.Admins
            .FirstOrDefaultAsync(x => x.LocalId == localId);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(Admin admin)
    {
        context.Entry(admin).State = EntityState.Modified;
    }
}