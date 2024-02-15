using api._DTOs.ClientsContactDTOs;
using api._DTOs.ContactDTOs;
using api._DTOs.DayOffDTOs;
using api._DTOs.DeliveryDetailsDTOs;
using api._DTOs.IngredientDTOs;
using api._DTOs.LocalDTOs;
using api._DTOs.OpeningHourDTOs;
using api._DTOs.OrderDTOs;
using api._DTOs.OrderProductDTOs;
using api._DTOs.PaymentsDTOs;
using api._DTOs.ProductDTOs;
using api._Entieties;
using AutoMapper;
using Org.BouncyCastle.Crypto.Agreement.Srp;

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
            CreateMap<Order, OrderGetDTO>()
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.OrderProducts));
            CreateMap<ClientsContact, ClientsContactGetDTO>()
                .ForMember(dest => dest.DeliveryDetails, opt => opt.MapFrom(src => src.DeliveryDetail));
            CreateMap<DeliveryDetail, DeliveryDetailsGetDTO>();
            CreateMap<PaymentsDetails, PaymentsDetailsDTO>();
            CreateMap<OrderProduct, OrderProductGetDTO>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));
        }
    }
}