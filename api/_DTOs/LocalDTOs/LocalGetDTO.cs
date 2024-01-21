using api._DTOs.AdminDTOs;
using api._DTOs.ContactDTOs;

namespace api._DTOs.LocalDTOs;

    public class LocalGetDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ContactGetDTO ContactGetDTO { get; set; }
        public List<OpeningHour> OpeningHours { get; set; } 
        public List<OpeningHourLocal> OpeningHourLocals { get; set; } 
        public List<DayOff> DayOffs { get; set; } 
        public List<DayOffLocal> DayOffLocals { get; set; }
    }
