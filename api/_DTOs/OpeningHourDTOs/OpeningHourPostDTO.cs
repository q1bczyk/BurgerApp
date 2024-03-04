using System.ComponentModel.DataAnnotations;

namespace api._DTOs.OpeningHourDTOs
{
    public class OpeningHourPostDTO
    {
        [Required]
        public string Day { get; set; }
        [Required, RegularExpression(@"^([01]?[0-9]|2[0-3]):[0-5][0-9]$", ErrorMessage = "Wprowadź czas w formacie HH:mm")]
        public string Opened { get; set; }
        [Required, RegularExpression(@"^([01]?[0-9]|2[0-3]):[0-5][0-9]$", ErrorMessage = "Wprowadź czas w formacie HH:mm")]
        public string Closed { get; set; }
        [Required]
        public bool IsDayOff { get; set; }

    }
}