using api._DTOs.AdminDTOs;
using api._DTOs.ContactDTOs;
using api._DTOs.LocalDTOs;
using AutoMapper;

namespace api._Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Contact, ContactGetDTO>();
            CreateMap<Local, LocalGetDTO>();
        }
    }
}