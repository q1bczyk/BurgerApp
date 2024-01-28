using api._DTOs.IngredientDTOs;

namespace api._DTOs.ProductDTOs
{
    public class ProductGetDTO
    {
        public string Id { get; set; }
        public float Price { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string ImgUrl{ get; set; }
        public List<IngredientGetDTO> Ingredients { get; set; }
    }
}