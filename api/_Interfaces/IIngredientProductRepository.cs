using api._Entieties;

namespace api._Interfaces
{
    public interface IIngredientProductRepository
    {
         void Update(IngredientProduct ingredientProduct);
         Task AddIngredientProductAsync(IngredientProduct ingredientProduct);
         Task<bool> DeleteIngredientProductByIdAsync(string productId, string ingredientId);
        Task<bool> SaveAllAsync();
    }
}