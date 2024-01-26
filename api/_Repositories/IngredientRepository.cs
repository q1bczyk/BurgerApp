using api._Entieties;
using api._Interfaces;

namespace api._Repositories
{
    public class IngredientRepository : IIngredientRepository
    {
        private DataContext context;

        public IngredientRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<Ingredient> AddIngredientasync(Ingredient ingredient)
        {
            await context.Ingredients.AddAsync(ingredient);
            await SaveAllAsync();
            return ingredient;
        }

        public async Task<bool> DeleteIngredientById(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Ingredient>> GetIngredientsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Ingredient ingredient)
        {
            throw new NotImplementedException();
        }
    }
}