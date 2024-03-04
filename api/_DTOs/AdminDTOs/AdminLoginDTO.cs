using System.ComponentModel.DataAnnotations;

namespace api._DTOs.AdminDTOs
{
    public class AdminLoginDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}