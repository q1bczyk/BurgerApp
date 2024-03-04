using System.ComponentModel.DataAnnotations;

namespace api._DTOs.AdminDTOs
{
    public class PasswordResetDTO : PasswordForgotDTO
    {
        [Required]
        public string Token { get; set; }
        [Required, MinLength(8)]
        public string Password { get; set; }
        [Required, MinLength(8)]
        public string RepetedPassword { get; set; }
    }
}