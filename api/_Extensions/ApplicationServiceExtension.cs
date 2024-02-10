using api._Helpers;
using api._Interfaces;
using api._Repositories;
using api._Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api._Extensions
{
    public static class ApplicationServiceExtension 
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                 opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });
            
            services.Configure<BlobStorageSettings>(config.GetSection("BlobStorageSettings"));

            services.Configure<PaymentsSettings>(config.GetSection("PaymentsSettings"));

            services.Configure<DataProtectionTokenProviderOptions>(opt => opt.TokenLifespan = TimeSpan.FromHours(1));
            
            services.AddIdentity<Admin, IdentityRole>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

            services.AddCors();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<ITokenservice, TokenService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IContactRepository, ContactRepository>();
            services.AddScoped<ILocalRepository, LocalRepository>();
            services.AddScoped<IOpeningHourRepository, OpeningHourRepository>();
            services.AddScoped<IDayOffLocalRepository, DayOffLocalRepository>();
            services.AddScoped<IDayOffRepository, DayOffRepository>();  
            services.AddScoped<IOpeningHourLocalRepository, OpeningHourLocalRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IIngredientRepository, IngredientRepository>();
            services.AddScoped<IIngredientProductRepository, IngredientProductRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderProductRepository, OrderProductRepository>();
            services.AddScoped<IClientContactRepository, ClientContactRepository>();
            services.AddScoped<IDeliveryDetailsRepository, DeliveryDetailsRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            
            return services;
        }
    }
}