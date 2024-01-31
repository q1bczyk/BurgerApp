using System.ComponentModel.DataAnnotations;
using api._DTOs.ClientsContactDTOs;
using api._DTOs.ProductDTOs;

namespace api._DTOs.OrderDTOs
{
    public class OrderPostDTO
    {
        [Required]
        public float Price { get; set; }
        [Required]
        public string OrderStatus { get; set; }
        [Required]
        public List<string> ProductsId { get; set; }
        [Required]
        public ClientsContactPostDTO ClientsContact { get; set; }
        [Required]
        public string LocalId { get; set; } 
    }
}