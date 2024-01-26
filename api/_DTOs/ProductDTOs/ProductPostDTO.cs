using System.ComponentModel.DataAnnotations;
using api._DTOs.IngredientDTOs;

namespace api._DTOs.ProductDTOs
{
    public class ProductPostDTO
    {
        [Required]
        public float Price { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        public IFormFile File { get; set; }
        [Required]
        public List<IngredientPostDTO> Ingredients { get; set; }
    }
}