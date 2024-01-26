using api._Entieties;
using api._Interfaces;

namespace api._Repositories
{
    public class IngredientProductRepository : IIngredientProductRepository
    {
        private DataContext context;

        public IngredientProductRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<IngredientProduct> AddIngredientProductAsync(IngredientProduct ingredientProduct)
        {
            await context.IngredientProducts.AddAsync(ingredientProduct);
            await SaveAllAsync();
            return ingredientProduct;
        }

        public async Task<bool> DeleteIngredientProductByIdAsync(string productId, string ingredientId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(IngredientProduct ingredientProduct)
        {
            throw new NotImplementedException();
        }
    }
}