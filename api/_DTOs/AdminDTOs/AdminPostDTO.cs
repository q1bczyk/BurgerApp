using System.ComponentModel.DataAnnotations;
using api._DTOs.ContactDto;
using api._DTOs.LocalDto;

namespace api._Dto
{
    public class AdminPostDTO
    {
        [Required, MinLength(8)]
        public string Password { get; set; }
        [Required, MinLength(8)]
        public string RepeatedPassword { get; set; }
        public LocalPostDTO LocalPostDTO { get; set; }
        public ContactPostDTO ContactPostDTO { get; set; }
    }
}