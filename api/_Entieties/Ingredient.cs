using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api._Entieties
{
    public class Ingredient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [MaxLength(36)] 
        public string Id { get; set; }
        public float Price { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public List<Product> Products { get; set; } = new();
        public List<IngredientProduct> IngredientProducts { get; set; } = new();
    }
}