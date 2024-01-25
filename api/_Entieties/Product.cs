using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api._Entieties
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [MaxLength(36)] 
        public string Id { get; set; }
        public float Price { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int OrderCount { get; set; }
        public string ImgUrl { get; set; }
        public List<Order> Orders { get; set; } = new();
        public List<OrderProduct> OrderProducts { get; set; } = new();
        public List<Ingredient> Ingredients { get; set;} = new();
        public List<IngredientProduct> IngredientsProduct { get; set;} = new();

    }
}