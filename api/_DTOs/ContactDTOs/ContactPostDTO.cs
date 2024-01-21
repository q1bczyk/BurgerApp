using System.ComponentModel.DataAnnotations;

namespace api._DTOs.ContactDTOs
{
    public class ContactPostDTO
    {
        [Required, MinLength(2)]
        public string City { get; set; }
        [Required, MinLength(6)]
        public string PostalCode { get; set; }
        [Required, MinLength(2)]
        public string Street { get; set; }
        [Required, MinLength(2)]
        public string StreetNumber { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required, MinLength(9), MaxLength(9)]
        public string PhoneNumber { get; set; }
    }
}