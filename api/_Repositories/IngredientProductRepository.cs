using api._Entieties;
using api._Interfaces;

namespace api._Repositories
{
    public class IngredientProductRepository : IIngredientProductRepository
    {
        public Task AddIngredientProductAsync(IngredientProduct ingredientProduct)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteIngredientProductByIdAsync(string productId, string ingredientId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }

        public void Update(IngredientProduct ingredientProduct)
        {
            throw new NotImplementedException();
        }
    }
}