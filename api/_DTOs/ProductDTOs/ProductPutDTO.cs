using System.ComponentModel.DataAnnotations;
using api._DTOs.IngredientDTOs;

namespace api._DTOs.ProductDTOs
{
    public class ProductPutDTO
    {
        [Required]
        public float Price { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        public IFormFile File { get; set; } = null;
        [Required]
        public List<IngredientPostDTO> Ingredients { get; set; }
    }
}