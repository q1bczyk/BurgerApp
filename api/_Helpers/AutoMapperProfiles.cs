using api._DTOs.ContactDTOs;
using api._DTOs.LocalDTOs;
using api._DTOs.OpeningHourDTOs;
using AutoMapper;

namespace api._Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Contact, ContactGetDTO>();
            CreateMap<Local, LocalGetDTO>();
            CreateMap<OpeningHour, OpeningHourGetDTO>();
        }
    }
}