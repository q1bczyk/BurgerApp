using System.ComponentModel.DataAnnotations;
using api._DTOs.DeliveryDetailsDTOs;
using api._Entieties;

namespace api._DTOs.ClientsContactDTOs
{
    public class ClientsContactPostDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required, MaxLength(9), MinLength(9)]
        public string PhoneNumber { get; set; } 
        public DeliveryDetailsPostDTO DeliveryDetails { get; set; }
    }
}