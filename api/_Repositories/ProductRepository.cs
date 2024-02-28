using api._Entieties;
using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class ProductRepository : IProductRepository
    {
        private DataContext context;

        public ProductRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            await context.Products.AddAsync(product);
            await SaveAllAsync();
            return product;
        }

        public async Task<Product> DeleteProductById(string productId)
        {
            var productToDelete = await context.Products
                                        .FirstOrDefaultAsync(p => p.Id == productId);

            context.Products.Remove(productToDelete);
            await SaveAllAsync();

            return productToDelete;
        }

        public Task<bool> FingProductByNameAsync(string name)
        {
            return context.Products.AnyAsync(p => p.Name == name);
        }

        public async Task<List<Product>> GetBestsellersAsync()
        {
            return await context.Products  
                .Where(p => p.Type.ToLower() == "burger")
                .OrderByDescending(p => p.OrderCount)
                .Include(p => p.IngredientsProduct)
                .ThenInclude(ip => ip.Ingredient)
                .Take(5)
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(string id)
        {
            return await context.Products
                        .Include(p => p.IngredientsProduct)
                        .ThenInclude(ip => ip.Ingredient)
                        .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Product>> GetProductsAsync(string type)
        {
            return await context.Products  
                .Where(p => p.Type.ToLower() == type.ToLower())
                .Include(p => p.IngredientsProduct)
                .ThenInclude(ip => ip.Ingredient)
                .ToListAsync();
        }

        public async Task<List<Product>> GetRankingAsync(string type)
        {
             return await context.Products  
                .Where(p => p.Type.ToLower() == "burger")
                .OrderByDescending(p => p.OrderCount)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            context.Entry(product).State = EntityState.Modified;
        }
    }
}