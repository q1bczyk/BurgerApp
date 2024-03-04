using System.ComponentModel.DataAnnotations;

namespace api._DTOs.DayOffDTOs
{
    public class DayOffPostDTO
    {
        [RegularExpression(@"^\d{2}/\d{2}/\d{4}$", ErrorMessage = "Data musi być w formacie dd/MM/yyyy.")]
        public string Date { get; set; }
    }
}