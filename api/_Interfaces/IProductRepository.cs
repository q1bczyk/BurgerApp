using api._DTOs.ProductDTOs;
using api._Entieties;

namespace api._Interfaces
{
    public interface IProductRepository
    {
        void Update(Product product);
        Task<Product> AddProductAsync(Product product);
        Task<List<Product>> GetProductsAsync(string type);
        Task<Product> GetProductByIdAsync(string id);
        Task<bool> FingProductByNameAsync(string name);
        Task<Product> DeleteProductById(string productId);
        Task<bool> SaveAllAsync();
    }
}