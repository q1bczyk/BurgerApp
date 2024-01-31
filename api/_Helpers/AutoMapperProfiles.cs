using api._DTOs.ClientsContactDTOs;
using api._DTOs.ContactDTOs;
using api._DTOs.DayOffDTOs;
using api._DTOs.DeliveryDetailsDTOs;
using api._DTOs.IngredientDTOs;
using api._DTOs.LocalDTOs;
using api._DTOs.OpeningHourDTOs;
using api._DTOs.OrderDTOs;
using api._DTOs.ProductDTOs;
using api._Entieties;
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
            CreateMap<DayOff, DayOffGetDTO>();
            CreateMap<Product, ProductGetDTO>();
            CreateMap<Ingredient, IngredientGetDTO>();
            CreateMap<Order, OrderGetDTO>();
            CreateMap<ClientsContact, ClientsContactGetDTO>();
            CreateMap<DeliveryDetail, DeliveryDetailsGetDTO>();
        }
    }
}