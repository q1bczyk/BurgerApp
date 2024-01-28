using api._Entieties;
using api._Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api._Repositories
{
    public class IngredientRepository : IIngredientRepository
    {
        private DataContext context;

        public IngredientRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<Ingredient> AddIngredientAsync(Ingredient ingredient)
        {
            await context.Ingredients.AddAsync(ingredient);
            await SaveAllAsync();
            return ingredient;
        }

        public async Task<string> DeleteIngredientById(string ingredientId)
        {
             var ingredientToDelete = await context.Products
                                        .FirstOrDefaultAsync(p => p.Id == ingredientId);

            context.Products.Remove(ingredientToDelete);
            await SaveAllAsync();

            return ingredientToDelete.Id;
        }

        public async Task<string> GetIngredientIdByNameAsync(string name)
        {
            var ingredient = await context.Ingredients
                .FirstOrDefaultAsync(i => i.Name == name);
            
            if(ingredient == null)
                return null;
            
            else return ingredient.Id;
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