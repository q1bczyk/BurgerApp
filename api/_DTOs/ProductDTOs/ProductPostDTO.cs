using api._DTOs.IngredientDTOs;

namespace api._DTOs.ProductDTOs
{
    public class ProductPostDTO
    {
        public float Price { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public List<IngredientPostDTO> Ingredients { get; set; }
    }
}