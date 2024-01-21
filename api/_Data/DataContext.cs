using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<Admin> Admins { get; set; }
    public DbSet<Local> Locals { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<DayOff> DayOffs { get; set; }
    public DbSet<DayOffLocal> DayOffLocals { get; set; }
    public DbSet<OpeningHour> OpeningHours { get; set; }
    public DbSet<OpeningHourLocal> OpeningHourLocals { get; set; }

     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Local>()
            .HasOne(l => l.Admin)
            .WithOne(a => a.Local)
            .HasForeignKey<Admin>(a => a.Id);

        modelBuilder.Entity<Admin>()
            .HasOne(a => a.Local)
            .WithOne(l => l.Admin)
            .HasForeignKey<Local>(l => l.Id);
            
        modelBuilder.Entity<Local>()
            .HasOne(l => l.Contact)
            .WithOne(c => c.Local)
            .HasForeignKey<Contact>(c => c.Id);    
        
        modelBuilder.Entity<Contact>()
            .HasOne(a => a.Local)
            .WithOne(l => l.Contact)
            .HasForeignKey<Local>(l => l.Id);
        
        modelBuilder.Entity<Local>()
            .HasMany(l => l.OpeningHours)
            .WithMany(o => o.Locals)
            .UsingEntity<OpeningHourLocal>();
        
        modelBuilder.Entity<OpeningHour>()
            .HasMany(o => o.Locals)
            .WithMany(l => l.OpeningHours)
            .UsingEntity<OpeningHourLocal>();

        modelBuilder.Entity<Local>()
            .HasMany(l => l.DayOffs)
            .WithMany(d => d.Locals)
            .UsingEntity<DayOffLocal>();

        modelBuilder.Entity<DayOff>()
            .HasMany(d => d.Locals)
            .WithMany(l => l.DayOffs)
            .UsingEntity<OpeningHourLocal>();    

    }
}