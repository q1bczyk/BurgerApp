using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api._Entieties
{
    public class PaymentsDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [MaxLength(36)] 
        public string Id { get; set; }
        public string OrderId { get; set; }
        public Order Order { get; set; }
        public string SessionId { get; set; }
        public bool IsPaymentDone { get; set; }
    }
}