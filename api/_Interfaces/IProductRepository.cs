using api._Entieties;

namespace api._Interfaces
{
    public interface IProductRepository
    {
        void Update(Product product);
        Task<Product> AddProductAsync(Product product);
        Task<List<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync();
        Task<bool> FingProductByNameAsync(string name);
        Task<bool> DeleteProductById(string id);
        Task<bool> SaveAllAsync();
    }
}