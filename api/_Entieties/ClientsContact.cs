using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api._Entieties
{
    public class ClientsContact
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [MaxLength(36)] 
        public string Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DeliveryDetail? DeliveryDetailId { get; set; }
    }
}