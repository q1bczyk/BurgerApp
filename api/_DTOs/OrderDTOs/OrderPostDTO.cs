using System.ComponentModel.DataAnnotations;
using api._DTOs.ClientsContactDTOs;
using api._DTOs.OrderProductDTOs;
using api._DTOs.PaymentsDTOs;
using api._DTOs.ProductDTOs;

namespace api._DTOs.OrderDTOs
{
    public class OrderPostDTO
    {
        [Required]
        public float Price { get; set; }
        [Required]
        public bool IsPaymentOnline { get; set; }
        [Required]
        public List<OrderProductPostDTO> Products{ get; set; }
        [Required]
        public ClientsContactPostDTO ClientsContact { get; set; }
        [Required]
        public string LocalId { get; set; } 
    }
}