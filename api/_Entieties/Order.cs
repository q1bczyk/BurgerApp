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
        public string? WaitingTime { get; set; }
        public string? RefusalReason { get; set; }
        public List<Product> Products { get; set; } = new();
        public ClientsContact ClientsContact { get; set; }
        public string LocalId { get; set; }
        public Local Local { get; set; }

    }
}