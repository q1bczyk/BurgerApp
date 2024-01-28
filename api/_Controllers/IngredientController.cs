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
    }
}