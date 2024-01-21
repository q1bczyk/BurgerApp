using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Admin
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [MaxLength(36)] 
    public string Id { get; set; }
    public byte[] Password { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string LocalId { get; set; }
    public Local Local { get; set; } = null!;
}