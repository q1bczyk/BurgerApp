using System.ComponentModel.DataAnnotations;

namespace api._DTOs.AdminDTOs
{
    public class PasswordResetDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; }
    }
}