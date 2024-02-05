using api._DTOs.DeliveryDetailsDTOs;

namespace api._DTOs.ClientsContactDTOs
{
    public class ClientsContactGetDTO 
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; } 
        public DeliveryDetailsGetDTO? DeliveryDetails { get; set; }
    }
}