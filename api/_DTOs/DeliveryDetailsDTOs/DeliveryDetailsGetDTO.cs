namespace api._DTOs.DeliveryDetailsDTOs
{
    public class DeliveryDetailsGetDTO
    {
        public string Id { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PaymentMethod { get; set; }
    }
}