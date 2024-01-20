using System.ComponentModel.DataAnnotations;

namespace api._DTOs.LocalDto
{
    public class LocalPostDTO
    {
        [Required, MinLength(3)]
        public string Name { get; set; }
    }
}