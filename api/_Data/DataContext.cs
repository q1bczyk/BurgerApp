using api._Entieties;
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
    public DbSet<Order> Orders { get; set; }
    public DbSet<ClientsContact> ClientsContacts { get; set; }
    public DbSet<DeliveryDetail> DeliveryDetails { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    public DbSet<IngredientProduct> IngredientProducts { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Product> Products { get; set; }

     protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Local>()
            .HasOne(l => l.Admin)
            .WithOne(a => a.Local)
            .HasForeignKey<Admin>(a => a.LocalId);
            
        modelBuilder.Entity<Local>()
            .HasOne(l => l.Contact)
            .WithOne(c => c.Local)
            .HasForeignKey<Contact>(c => c.LocalId);    
        
        modelBuilder.Entity<Local>()
            .HasMany(l => l.OpeningHours)
            .WithMany(o => o.Locals)
            .UsingEntity<OpeningHourLocal>();

        modelBuilder.Entity<Local>()
            .HasMany(l => l.Orders)
            .WithOne(o => o.Local)
            .HasForeignKey(o => o.LocalId)
            .IsRequired();
        
        modelBuilder.Entity<Local>()
            .HasMany(l => l.DayOffs)
            .WithMany(d => d.Locals)
            .UsingEntity<DayOffLocal>();

         modelBuilder.Entity<DayOff>()
            .HasMany(d => d.Locals)
            .WithMany(l => l.DayOffs)
            .UsingEntity<DayOffLocal>();
        
        modelBuilder.Entity<OpeningHour>()
            .HasMany(o => o.Locals)
            .WithMany(l => l.OpeningHours)
            .UsingEntity<OpeningHourLocal>();

        modelBuilder.Entity<Order>()
            .HasOne(o => o.ClientsContact)
            .WithOne(c => c.Order)
            .HasForeignKey<ClientsContact>(o => o.OrderId)
            .IsRequired();    

        modelBuilder.Entity<Order>()
            .HasMany(o => o.Products)
            .WithMany(o => o.Orders)
            .UsingEntity<OrderProduct>();

        modelBuilder.Entity<ClientsContact>()
            .HasOne(o => o.DeliveryDetail)
            .WithOne(d => d.ClientsContact)
            .HasForeignKey<DeliveryDetail>(d => d.ClientsContactId);

        modelBuilder.Entity<Product>()
            .HasMany(p => p.Ingredients)
            .WithMany(i => i.Products)
            .UsingEntity<IngredientProduct>();
    }
}