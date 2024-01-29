using api._Entieties;
using api._Interfaces;
using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> DeleteIngredientByIdAsync(string ingredientId)
        {
            var ingredientsToDelete = await context.IngredientProducts
                                    .Where(ip => ip.IngredientId == ingredientId)
                                    .ToListAsync();

            if(ingredientsToDelete == null || !ingredientsToDelete.Any())
                return false;
        
            context.IngredientProducts.RemoveRange(ingredientsToDelete);
            return await SaveAllAsync(); 
        }

        public async Task<bool> DeleteProductByIdAsync(string productId)
        {
            var productsToDelete = await context.IngredientProducts
                                    .Where(ip => ip.ProductId == productId)
                                    .ToListAsync();

            if (productsToDelete == null || !productsToDelete.Any())
                return false;
        
            
            context.IngredientProducts.RemoveRange(productsToDelete);
            
            return await SaveAllAsync(); 
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