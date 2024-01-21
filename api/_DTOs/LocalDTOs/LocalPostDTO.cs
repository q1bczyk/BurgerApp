using System.ComponentModel.DataAnnotations;

namespace api._DTOs.LocalDTOs
{
    public class LocalPostDTO
    {
        [Required]
        public string Name { get; set; }
    }
}