using System.ComponentModel.DataAnnotations;

namespace api._DTOs.DeliveryDetailsDTOs
{
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
    }
}

