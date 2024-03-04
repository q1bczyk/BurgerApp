using api._DTOs.ClientsContactDTOs;
using api._DTOs.ProductDTOs;
using api._DTOs.PaymentsDTOs;
using api._DTOs.OrderProductDTOs;

namespace api._DTOs.OrderDTOs
{
    public class OrderGetDTO 
    {
        public string Id { get; set; }
        public float Price { get; set; }
        public string OrderStatus { get; set; }
        public string? WaitingTime { get; set; }
        public string? RefusalReason { get; set; }
        public PaymentsDetailsDTO? PaymentsDetails { get; set; } 
        public List<OrderProductGetDTO> Products { get; set; }
        public ClientsContactGetDTO ClientsContact { get; set; }
        public string LocalId { get; set; }
    }
}