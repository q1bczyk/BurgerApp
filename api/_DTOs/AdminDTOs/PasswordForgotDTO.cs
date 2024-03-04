using System.ComponentModel.DataAnnotations;

namespace api._DTOs.AdminDTOs
{
    public class PasswordForgotDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; }
    }
}