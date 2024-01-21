using System.ComponentModel.DataAnnotations;
using api._DTOs.ContactDTOs;
using api._DTOs.LocalDTOs;

namespace api._DTOs.AdminDTOs
{
    public class AdminPostDTO
    {
        [Required]
        public string Password { get; set; }
        [Required]
        public string RepetedPassword{ get; set; }
        [Required]
        public LocalPostDTO LocalPostDTO { get; set; }
        [Required]
        public ContactPostDTO ContactPostDTO { get; set; }
    }
}