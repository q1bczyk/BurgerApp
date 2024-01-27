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

        public async Task<Product> GetProductByIdAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetProductByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            throw new NotImplementedException();
        }
    }
}