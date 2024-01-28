using api._Entieties;

namespace api._Interfaces
{
    public interface IIngredientRepository
    {
        void Update(Ingredient ingredient);
        Task<Ingredient> AddIngredientAsync(Ingredient ingredient);
        Task<string> DeleteIngredientByIdAsync(string ingredientId);
        Task<string> GetIngredientIdByNameAsync(string name);
        Task<Ingredient> GetIngredientByIdAsync(string ingredientId);
        Task<bool> SaveAllAsync();
    }
}