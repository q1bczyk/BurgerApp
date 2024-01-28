using api._Entieties;

namespace api._Interfaces
{
    public interface IIngredientProductRepository
    {
         void Update(IngredientProduct ingredientProduct);
         Task<IngredientProduct> AddIngredientProductAsync(IngredientProduct ingredientProduct);
         Task<bool> DeleteProductByIdAsync(string productId);
         Task<bool> DeleteIngredientByIdAsync(string ingredientId);
         Task<bool> SaveAllAsync();
    }
}