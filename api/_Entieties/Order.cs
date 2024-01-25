using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api._Entieties
{
    public class Order 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [MaxLength(36)] 
        public string Id { get; set; }
        public float Price { get; set; }
        public string OrderStatus { get; set; }
        public List<Product> Products { get; set; } = new();
        public ClientsContact? ClientsContactId { get; set; }
        public Local? LocalId { get; set; }

    }
}