using api._Interfaces;
using api._Services;
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
            services.AddCors();
            services.AddScoped<ITokenservice, TokenService>();
            return services;
        }
    }
}