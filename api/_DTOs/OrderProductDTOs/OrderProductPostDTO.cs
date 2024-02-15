using System.ComponentModel.DataAnnotations;

namespace api._DTOs.OrderProductDTOs
{
    public class OrderProductPostDTO
    {
        [Required]
        public string ProductId { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}