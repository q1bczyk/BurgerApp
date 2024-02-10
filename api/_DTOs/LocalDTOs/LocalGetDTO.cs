using api._DTOs.AdminDTOs;
using api._DTOs.ContactDTOs;
using api._DTOs.DayOffDTOs;
using api._DTOs.OpeningHourDTOs;

namespace api._DTOs.LocalDTOs;

    public class LocalGetDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public ContactGetDTO Contact { get; set; }
        public List<OpeningHourGetDTO> OpeningHours { get; set; } 
        public List<DayOffGetDTO> DayOffs { get; set; } 
    }
