using api._DTOs.ClientsContactDTOs;
using api._DTOs.ProductDTOs;

namespace api._DTOs.OrderDTOs
{
    public class OrderGetDTO 
    {
        public string Id { get; set; }
        public float Price { get; set; }
        public string OrderStatus { get; set; }
        public List<ProductGetDTO> Products { get; set; }
        public ClientsContactGetDTO ClientsContact { get; set; }
        public string LocalId { get; set; }
    }
}