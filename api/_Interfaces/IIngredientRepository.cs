using api._Entieties;

namespace api._Interfaces
{
    public interface IIngredientRepository
    {
        void Update(Ingredient ingredient);
        Task<Ingredient> AddIngredientAsync(Ingredient ingredient);
        Task<List<Ingredient>> GetIngredientsAsync();
        Task<bool> DeleteIngredientById(string id);
        Task<string> GetIngredientIdByNameAsync(string name);
        Task<bool> SaveAllAsync();
    }
}