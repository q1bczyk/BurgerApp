using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class OpeningHour
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [MaxLength(36)] 
    public string Id { get; set; }
    public string Day { get; set; }
    public string Opened { get; set; }
    public string Closed { get; set; }
    public bool IsDayOff { get; set; }
    public List<Local> Locals { get; set; } = new();
    public List<OpeningHourLocal> OpeningHourLocals { get; set; } = new();

}