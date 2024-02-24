using api._DTOs.IngredientDTOs;
using api._Interfaces;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api._Controllers
{
    [Authorize]
    public class IngredientController : BaseApiController
    {
        private readonly IIngredientRepository ingredientRepository;
        private readonly IIngredientProductRepository ingredientProductRepository;
        private readonly IMapper mapper;

        public IngredientController(IIngredientRepository ingredientRepository, IIngredientProductRepository ingredientProductRepository, IMapper mapper)
        {
            this.ingredientRepository = ingredientRepository;
            this.ingredientProductRepository = ingredientProductRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<IngredientGetDTO>>> GetIngredients()
        {
            var ingredients = await ingredientRepository.GetIngredientsAsync();

            return Ok(mapper.Map<List<IngredientGetDTO>>(ingredients));
        }

        [HttpGet("{ingredientId}")]
        public async Task<ActionResult<IngredientGetDTO>> GetIngredient(string ingredientId)
        {
            var ingredient = await ingredientRepository.GetIngredientByIdAsync(ingredientId);

            if(ingredient == null)
                return NotFound("Ingredient with this id doesn't exist!");

            return Ok(mapper.Map<IngredientGetDTO>(ingredient));
        }

        [HttpDelete("{ingredientId}")]
        public async Task<ActionResult<string>> DeleteIngredient(string ingredientId)
        {
            var ingredientToDeleteId = await ingredientRepository.DeleteIngredientByIdAsync(ingredientId);

            if(ingredientToDeleteId == null)
                return NotFound("Ingredient with this id doesn't exist!");
            
            await ingredientProductRepository.DeleteIngredientByIdAsync(ingredientToDeleteId);

            return Ok("Deleted succesful!");

        }

        [HttpPut("{ingredientId}")]
        public async Task<ActionResult<IngredientGetDTO>> EditIngredient(string ingredientId, IngredientPostDTO ingredientPostDTO)
        {
             var ingredient = await ingredientRepository.GetIngredientByIdAsync(ingredientId);

            if(ingredient == null)
                return NotFound("Ingredient with this id doesn't exist!");

             if(ingredientPostDTO.Quantity > 1)
                    ingredientPostDTO.Name = ingredientPostDTO.Name + 'x' + ingredientPostDTO.Quantity;

            ingredient.Name = ingredientPostDTO.Name;
            ingredient.Price = ingredientPostDTO.Price;
            ingredient.Quantity = ingredientPostDTO.Quantity;

            ingredientRepository.Update(ingredient);
            await ingredientRepository.SaveAllAsync();

            return Ok(mapper.Map<IngredientGetDTO>(ingredient));
        }
    }
}