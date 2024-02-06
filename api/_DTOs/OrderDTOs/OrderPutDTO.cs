using System.ComponentModel.DataAnnotations;

namespace api._DTOs.OrderDTOs
{
    public class OrderPutDTO
    {
        [RegularExpression("^(anulowane|realizowane|zrealizowane)$", ErrorMessage = "Invalid OrderStatus!")]
        public string OrderStatus { get; set; }
        [RegularExpression("^([01]?[0-9]|2[0-3]):[0-5][0-9]$", ErrorMessage = "Invalid WaitingTime format. Use hh:mm.")]
        public string? WaitingTime { get; set; }
        public string? RefusalReason { get; set; }
    }
}