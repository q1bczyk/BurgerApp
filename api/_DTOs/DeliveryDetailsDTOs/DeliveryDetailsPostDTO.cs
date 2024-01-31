using System.ComponentModel.DataAnnotations;

namespace api._DTOs.DeliveryDetailsDTOs
{
    public enum PaymentMethod
    {
        karta,
        online,
        gotowka
    }
    public class DeliveryDetailsPostDTO
    {
        [Required]
        public string City { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string HouseNumber { get; set; }
        [Required]
        [EnumDataType(typeof(PaymentMethod), ErrorMessage = "Invalid Payment Method")]
        public string PaymentMethod { get; set; }
    }
}

