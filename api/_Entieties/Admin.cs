using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

public class Admin : IdentityUser
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [MaxLength(36)] 
    [PersonalData]
    public string Id { get; set; }
    public byte[] Password { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string LocalId { get; set; }
    public Local Local { get; set; } = null!;
}