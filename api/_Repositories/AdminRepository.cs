
using Microsoft.EntityFrameworkCore;

public class AdminRepository : IAdminRepository
{
    private readonly DataContext context;

    public AdminRepository(DataContext context)
    {
        this.context = context;
    }

    public async Task<Admin> CreateAdminAsync(Admin admin)
    {
        context.Admins.Add(admin);
        await SaveAllAsync();
        return admin;
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