using api._Entieties;
using api._Interfaces;

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

        public async Task<bool> DeleteProductById(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<Product> GetProductByIdAsync()
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